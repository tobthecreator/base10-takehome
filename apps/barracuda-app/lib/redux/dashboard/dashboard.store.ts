import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from "@reduxjs/toolkit";
import localForage from "localforage";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TasksReducer } from "client-app/lib/redux/dashboard/reducers/tasks";
import { ApiKeysReducer } from "client-app/lib/redux/dashboard/reducers/apiKeys/apiKeys.reducer";

const tasksConfig = {
	key: "tasks",
	storage: localForage,
	serialize: false,
};

const rootReducer = combineReducers({
	tasks: persistReducer(tasksConfig, TasksReducer),
	apiKeys: ApiKeysReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
