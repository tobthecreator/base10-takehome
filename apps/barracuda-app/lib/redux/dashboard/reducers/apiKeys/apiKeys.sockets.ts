import { Socket } from "socket.io-client";
import { BuildSocketEventName } from "libs/shared/helpers";
import { EApiKeyEvents, IApiKey } from "libs/shared/interfaces";
import { createApiKey, updateApiKey, deleteApiKey } from "./apiKeys.reducer";

const InitApiKeySockets = (
	s: Socket,
	dispatch: any,
	organizationId: string
): Socket => {
	const apiKeyCreatedEvent = BuildSocketEventName(
		"organization",
		organizationId,
		EApiKeyEvents.ApiKeyCreated
	);

	const apiKeyUpdatedEvent = BuildSocketEventName(
		"organization",
		organizationId,
		EApiKeyEvents.ApiKeyUpdated
	);

	const apiKeyDeletedEvent = BuildSocketEventName(
		"organization",
		organizationId,
		EApiKeyEvents.ApiKeyDeleted
	);

	s.on(apiKeyCreatedEvent, (createdApiKey: IApiKey) => {
		console.log("redux createdApiKey", createdApiKey);
		dispatch(createApiKey(createdApiKey));
	});

	s.on(apiKeyUpdatedEvent, (updatedApiKey: IApiKey) => {
		console.log("redux updatedApiKey", updatedApiKey);
		dispatch(updateApiKey(updatedApiKey));
	});

	s.on(apiKeyDeletedEvent, (deletedApiKey: IApiKey) => {
		console.log("redux deletedApiKey", deletedApiKey);
		dispatch(deleteApiKey(deletedApiKey._id));
	});

	return s;
};

export default InitApiKeySockets;
