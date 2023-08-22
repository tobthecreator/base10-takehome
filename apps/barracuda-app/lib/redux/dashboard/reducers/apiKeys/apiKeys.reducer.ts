import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "client-app/lib/redux/dashboard/dashboard.store";
import { FetchApiKeys } from "client-app/lib/redux/dashboard/reducers/apiKeys/apiKeys.actions";
import {
	IApiKey,
	TReducerCreateAction,
	TReducerDeleteAction,
	TReducerUpdateAction,
} from "libs/shared/interfaces";

const apiKeysAdapter = createEntityAdapter<IApiKey>({
	selectId: (k) => k._id,
});

// State should be all keys + added ephemeral frontend state for existence and loading state
const initialState = apiKeysAdapter.getInitialState({
	status: "idle",
	error: "No error",
});

export const ApiKeysSlice = createSlice({
	name: "apiKeys",
	initialState,
	reducers: {
		createApiKey(state, action: TReducerCreateAction<IApiKey>) {
			console.log("createApiKey");
			apiKeysAdapter.upsertOne(state, action.payload);
		},
		updateApiKey(state, action: TReducerUpdateAction<IApiKey>) {
			console.log("updateApiKey");
			const { _id: apiKeyId, apiKey, name, lastUsed } = action.payload;

			const existingKey = state.entities[apiKeyId];
			if (!existingKey) return;

			existingKey.apiKey = apiKey;
			existingKey.name = name;
			// For socket updates
			existingKey.lastUsed = lastUsed;
		},
		deleteApiKey(state, action: TReducerDeleteAction<IApiKey>) {
			console.log("deleteApiKey");
			const apiKeyId = action.payload;

			const existingApiKey = state.entities[apiKeyId];

			if (!existingApiKey) return;

			apiKeysAdapter.removeOne(state, apiKeyId);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(FetchApiKeys.pending, (state) => {
				state.status = "loading";
			})
			.addCase(FetchApiKeys.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(FetchApiKeys.fulfilled, (state, action) => {
				state.status = "idle";
				apiKeysAdapter.setAll(state, action);
			});
	},
});

export const {
	selectEntities: SelectAllApiKeyEntities,
	selectAll: SelectAllApiKeys,
	selectIds: SelectApiKeyIds,
	selectById: SelectApiKeyById,
} = apiKeysAdapter.getSelectors((state: RootState) => {
	return state.apiKeys;
});

export const { createApiKey, updateApiKey, deleteApiKey } =
	ApiKeysSlice.actions;

export const ApiKeysReducer = ApiKeysSlice.reducer;
