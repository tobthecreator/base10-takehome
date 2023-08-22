import { API_KEY } from "libs/shared/constants";
import { IApiKey, TUpdateApiKey } from "libs/shared/interfaces";
import {
	AuthAgent,
	GenericServerCall,
	GetServerURL,
} from "client-app/lib/server";

export const GetProjectApiKeys = async (): Promise<IApiKey[]> => {
	return GenericServerCall<any>(
		AuthAgent.get(`${GetServerURL()}/${API_KEY}/all`)
	);
};

export const CreateApiKey = async (newApiKey: IApiKey): Promise<IApiKey> => {
	return GenericServerCall<any>(
		AuthAgent.post(`${GetServerURL()}/${API_KEY}`).send(newApiKey)
	);
};

export const UpdateApiKey = async (
	apiKeyId: string,
	update: TUpdateApiKey
): Promise<IApiKey> => {
	return GenericServerCall<IApiKey>(
		AuthAgent.put(`${GetServerURL()}/${API_KEY}/${apiKeyId}`).send(update)
	);
};

export const DeleteApiKey = async (apiKeyId: string): Promise<IApiKey> => {
	return GenericServerCall<IApiKey>(
		AuthAgent.delete(`${GetServerURL()}/${API_KEY}/${apiKeyId}`)
	);
};

export const GetApiKey = async (_id: string): Promise<any> => {
	return GenericServerCall<any>(
		AuthAgent.get(`${GetServerURL()}/${API_KEY}/${_id}`)
	);
};

export const RegenerateApiKey = async (_id: string): Promise<any> => {
	return GenericServerCall<IApiKey>(
		AuthAgent.post(`${GetServerURL()}/${API_KEY}/${_id}/regenerate`)
	);
};

export const GetProjectApiKeyStatus = async (
	organizationId: string
): Promise<any> => {
	return GenericServerCall<any>(
		AuthAgent.get(`${GetServerURL()}/${API_KEY}/${organizationId}/status`)
	);
};

export const GetZapierApiKey = async (organizationId: string): Promise<any> => {
	return GenericServerCall<any>(
		AuthAgent.get(`${GetServerURL()}/${API_KEY}/${organizationId}/zapier`)
	);
};

export const ReplaceZapierKey = async (
	organizationId: string
): Promise<any> => {
	return GenericServerCall<any>(
		AuthAgent.post(
			`${GetServerURL()}/${API_KEY}/${organizationId}/replace-zapier`
		)
	);
};
