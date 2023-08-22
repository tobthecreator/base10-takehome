import {
	CreateApiKey,
	UpdateApiKey,
	DeleteApiKey,
	GetProjectApiKeys,
} from "./apiKeys.server";
import {
	createApiKey,
	deleteApiKey,
	updateApiKey,
} from "client-app/lib/redux/dashboard/reducers/apiKeys/apiKeys.reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IApiKey, TPlatforms, TUpdateApiKey } from "libs/shared/interfaces";
import { nanoid } from "nanoid";
import { RootState } from "client-app/lib/redux/dashboard/dashboard.store";

export const FetchApiKeys = createAsyncThunk(
	"apiKeys/fetchApiKeys",
	async (): Promise<IApiKey[]> => {
		return GetProjectApiKeys();
	}
);

export const OptimisticCreateApiKey =
	(name: string, platform: TPlatforms, organization: string) =>
	async (dispatch) => {
		const apiKeyId = nanoid();
		const newKey: IApiKey = {
			_id: apiKeyId,
			name,
			platform,
			apiKey: "",
			type: "organization",
			organization,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		dispatch(createApiKey(newKey));

		try {
			const apiKey = await CreateApiKey(newKey);
			dispatch(updateApiKey(apiKey));
		} catch (err) {
			console.log(`API Key creation failed. Error: ${err}`);
			dispatch(deleteApiKey(apiKeyId));
		}
	};

export const OptimisticUpdateApiKey =
	(apiKeyId: string, update: TUpdateApiKey) => async (dispatch, getState) => {
		const state: RootState = getState();

		const fallbackApiKey = state.apiKeys.entities[apiKeyId];

		if (!fallbackApiKey) return;

		dispatch(
			updateApiKey({
				...fallbackApiKey,
				...update,
				_id: apiKeyId,
				updatedAt: new Date().toISOString(),
			})
		);
		try {
			const updatedApiKey = await UpdateApiKey(apiKeyId, {
				...update,
			});

			dispatch(updateApiKey(updatedApiKey));
		} catch (err) {
			dispatch(updateApiKey({ ...fallbackApiKey, _id: apiKeyId }));
		}
	};

export const OptimisticDeleteApiKey =
	(apiKeyId: string) => async (dispatch, getState) => {
		const state: RootState = getState();

		const fallbackApiKey = state.apiKeys.entities[apiKeyId];

		if (!fallbackApiKey) return;

		dispatch(deleteApiKey(apiKeyId));
		try {
			const deletedApiKey = await DeleteApiKey(apiKeyId);

			dispatch(deleteApiKey(deletedApiKey._id));
		} catch (err) {
			console.log(
				`ApiKey Delete Failed, Restored ApiKey from old State. Error: ${err}`
			);
			dispatch(createApiKey(fallbackApiKey));
		}
	};
