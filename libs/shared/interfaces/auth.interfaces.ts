import { IApiKey } from "libs/shared/interfaces/apiKeys.interfaces";
import { Document } from "mongoose";
import type {
	UserResource,
	OrganizationMembershipResource,
} from "@clerk/types";

interface IUser extends UserResource {
	membership: OrganizationMembershipResource;
}

/**
 * Passport users are more like entities.
 *
 * They can either be an actual user or an API Key. This is the interface we use to handle that
 */
export interface IPassportUser {
	_id: string;
	type: "User" | "ApiKey";
	data: IUser | IApiKey;
}

export interface IAuth {
	userId: string;
	refreshToken: string;
	expiresAt: Date;
}

export type DAuth = IAuth & Document;
