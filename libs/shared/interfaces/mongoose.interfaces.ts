export type FindOneReturn<T> = Promise<T | null>;
export type FindManyReturn<T> = Promise<T[]>;
export type UpdateManyReturn<T> = Promise<T[]>;
export type CreateOneReturn<T> = Promise<T>;
export type UpdateOneReturn<T> = Promise<T | null>;
export type ExistsReturn = Promise<boolean>;
export type FindManyOptions = {
	limit?: number;
	skip?: number;
	populate?: any[];
	lean?: boolean;
	sort?: any;
	project?: any;
	select?: any;
	hint?: any;
};
export type FindOneOptions = {
	populate?: any[];
	lean?: boolean;
	project?: any;
	select?: any;
	sort?: any;
};
