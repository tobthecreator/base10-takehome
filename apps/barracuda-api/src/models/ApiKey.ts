import * as mongoose from "mongoose";
import { nanoid } from "nanoid";
import { DApiKey } from "libs/shared/interfaces";
const Schema = mongoose.Schema;

const apiKeySchema = new Schema<DApiKey>(
	{
		_id: { type: String, default: () => nanoid() },
		name: String,
		platform: String,
		apiKey: String,
		type: String,
		organization: String,
		lastUsed: { type: Date, required: false },
		createdAt: Date,
		updatedAt: Date,
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

export const ApiKeySchema = apiKeySchema;
export const ApiKey = mongoose.model("ApiKey", ApiKeySchema);
