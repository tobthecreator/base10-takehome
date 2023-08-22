import { IEvent } from "libs/shared/interfaces";
import { Document } from "mongodb";

export type TPlatforms = "zapier" | "barracuda";

type TKeyType = "organization" | "user";

export interface IApiKey {
	readonly _id: string;
	name: string;
	platform: TPlatforms;
	apiKey: string;
	type: TKeyType;
	organization: string;
	lastUsed?: Date;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export type TUpdateApiKey = Partial<Pick<IApiKey, "name" | "lastUsed">>;

export type DApiKey = IApiKey & Document;

export interface IApiKeyCreatedEvent extends IEvent {
	payload: IApiKey;
}

export interface IApiKeyUpdatedEvent extends IEvent {
	payload: IApiKey;
}

export interface IApiKeyDeletedEvent extends IEvent {
	payload: IApiKey;
}

export enum EApiKeyEvents {
	ApiKeyCreated = "apiKey.created",
	ApiKeyUpdated = "apiKey.updated",
	ApiKeyDeleted = "apiKey.deleted",
}
