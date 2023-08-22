import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { Model, FilterQuery, AnyKeys, UpdateQuery } from "mongoose";
import { API_KEY_MODEL } from "libs/shared/constants";
import { IApiKey, IEventActor, TUpdateApiKey } from "libs/shared/interfaces";
import {
	FindManyReturn,
	FindManyOptions,
	FindOneOptions,
	FindOneReturn,
	CreateOneReturn,
	UpdateOneReturn,
} from "libs/shared/interfaces";
import { FindMany, FindOne } from "libs/shared/helpers";
import { ApiKeyEmitters } from "api-src/modules/apiKeys/apiKeys.emitters";
import { TPlatforms } from "libs/shared/interfaces";
const crypto = require("crypto");

@Injectable()
export class ApiKeyService {
	constructor(
		@Inject(API_KEY_MODEL)
		private apiKeyModel: Model<IApiKey>,
		private apiKeyEmitters: ApiKeyEmitters
	) {}

	async FetchProjectKeys(organization: string): FindManyReturn<IApiKey> {
		return this.findMany({ organization }, { project: { apiKey: 0 } });
	}

	async Create(apiKey: IApiKey): CreateOneReturn<IApiKey> {
		const random = crypto.randomBytes(20);
		const api_key = random.toString("hex");

		return this.create({
			...apiKey,
			apiKey: api_key,
		});
	}

	async Update(
		apiKeyId: string,
		update: TUpdateApiKey,
		actor?: IEventActor
	): Promise<IApiKey> {
		const { name, lastUsed } = update;

		return this.updateOne(
			{ _id: apiKeyId },
			{
				name,
				lastUsed,
			},
			actor
		);
	}

	async Delete(apiKeyId: string, actor?: IEventActor): FindOneReturn<IApiKey> {
		return this.delete({ _id: apiKeyId }, actor);
	}

	async FindById(_id: string): FindOneReturn<IApiKey> {
		return this.findOne({ _id });
	}

	async RegenerateApiKey(_id: string): UpdateOneReturn<IApiKey> {
		const random = crypto.randomBytes(20);
		const newKey = random.toString("hex");

		return this.updateOne({ _id }, { apiKey: newKey });
	}

	async GetFullKey(
		apiKey: string,
		platform: TPlatforms
	): FindOneReturn<IApiKey> {
		return this.findOne({ apiKey, platform });
	}

	async GetKey(
		organization: string,
		platform: TPlatforms
	): FindOneReturn<IApiKey> {
		return this.findOne({ organization, platform });
	}

	async DeleteProjectKey(
		organization: string,
		platform: TPlatforms
	): Promise<IApiKey> {
		return this.delete({ organization, platform, type: "organization" });
	}

	private async create(
		doc: AnyKeys<IApiKey>,
		actor?: IEventActor
	): CreateOneReturn<IApiKey> {
		const newApiKey = await this.apiKeyModel.create(doc);

		this.apiKeyEmitters.EmitApiKeyCreated(newApiKey, actor);

		return newApiKey;
	}

	private async findOne(
		query: FilterQuery<IApiKey>,
		options?: FindOneOptions
	): FindOneReturn<IApiKey> {
		return FindOne<IApiKey>(this.apiKeyModel, query, options);
	}

	private async findMany(
		query: FilterQuery<IApiKey>,
		options?: FindManyOptions
	): FindManyReturn<IApiKey> {
		return FindMany<IApiKey>(this.apiKeyModel, query, options);
	}

	private async updateOne(
		query: FilterQuery<IApiKey>,
		update: UpdateQuery<IApiKey>,
		actor?: IEventActor
	): Promise<IApiKey> {
		const updatedApiKey = await this.apiKeyModel
			.findOneAndUpdate(
				query,
				{
					...update,
					_id: undefined,
				},
				{ new: true }
			)
			.lean();

		if (!updatedApiKey) {
			throw new NotFoundException("ApiKey not found");
		}

		this.apiKeyEmitters.EmitApiKeyUpdated(updatedApiKey, actor);

		return updatedApiKey;
	}

	private async delete(
		query: FilterQuery<IApiKey>,
		actor?: IEventActor
	): Promise<IApiKey> {
		const deletedApiKey = await this.apiKeyModel.findOneAndDelete(query).lean();

		if (!deletedApiKey) throw new NotFoundException("ApiKey not found");

		this.apiKeyEmitters.EmitApiKeyDeleted(deletedApiKey, actor);

		return deletedApiKey;
	}
}
