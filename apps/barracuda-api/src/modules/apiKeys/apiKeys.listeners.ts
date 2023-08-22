import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import {
	EApiKeyEvents,
	IApiKeyCreatedEvent,
	IApiKeyDeletedEvent,
	IApiKeyUpdatedEvent,
} from "libs/shared/interfaces";
import { SocketService } from "../sockets/socket.service";

@Injectable()
export class ApiKeyListeners {
	constructor(private socketService: SocketService) {}

	@OnEvent(EApiKeyEvents.ApiKeyCreated)
	async ApiKeyCreated(event: IApiKeyCreatedEvent) {
		this.socketService.Send(event);
	}

	@OnEvent(EApiKeyEvents.ApiKeyUpdated)
	async ApiKeyUpdated(event: IApiKeyUpdatedEvent) {
		this.socketService.Send(event);
	}

	@OnEvent(EApiKeyEvents.ApiKeyDeleted)
	async ApiKeyDeleted(event: IApiKeyDeletedEvent) {
		this.socketService.Send(event);
	}
}
