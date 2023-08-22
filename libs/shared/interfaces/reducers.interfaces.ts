export type TReducerCreateAction<T> = {
	payload: T;
	type: string;
};

export type TReducerUpdateAction<T> = {
	payload: T;
	type: string;
};

export type TReducerDeleteAction<T> = {
	payload: string;
	type: string;
};
