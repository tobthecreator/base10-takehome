import { FilterQuery, Model } from "mongoose";
import { FindManyOptions, FindOneOptions } from "libs/shared/interfaces";

export const FindMany = <T>(
	model: Model<T>,
	query: FilterQuery<T>,
	options?: FindManyOptions
) => {
	const defaultOptions = { lean: true, populate: [] };
	const combinedOptions = { ...defaultOptions, ...options };
	const { limit, skip, populate, lean, sort, select, hint } = combinedOptions;

	let base = model
		.find(query)
		.hint(hint ?? {})
		.populate(populate);

	if (select) {
		base = base.select(select);
	}

	if (lean) {
		base = base.lean({ virtuals: true });
	}

	if (sort) {
		base.sort(sort);
	}

	if (limit) {
		base = base.limit(limit);
	}

	if (skip) {
		base = base.skip(skip);
	}

	return base;
};

export const FindOne = <T>(
	model: Model<T>,
	query: FilterQuery<T>,
	options?: FindOneOptions
) => {
	const defaultOptions = { lean: true, populate: [] };
	const combinedOptions = { ...defaultOptions, ...options };

	const { populate, lean, select, sort } = combinedOptions;
	let base = model.findOne(query).populate(populate);

	if (sort) {
		base.sort(sort);
	}

	if (lean) {
		base = base.lean({ virtuals: true });
	}

	if (select) {
		base = base.select(select);
	}

	return base;
};

export const IsStringArray = (array: any[]) => {
	return array.every((i) => typeof i === "string");
};
