import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import {
	EApiKeyEvents,
	IApiKey,
	IEvent,
	IEventActor,
	IEventMeta,
} from "libs/shared/interfaces";

@Injectable()
export class ApiKeyEmitters {
	constructor(private eventEmitter: EventEmitter2) {}

	EmitApiKeyCreated(key: IApiKey, actor?: IEventActor) {
		const eventType = EApiKeyEvents.ApiKeyCreated;

		const event = this.createApiKeyEvent(eventType, key, actor);

		this.eventEmitter.emit(eventType, event);
	}

	EmitApiKeyUpdated(key: IApiKey, actor?: IEventActor) {
		const eventType = EApiKeyEvents.ApiKeyUpdated;

		const event = this.createApiKeyEvent(eventType, key, actor);
		this.eventEmitter.emit(eventType, event);
	}

	EmitApiKeyDeleted(key: IApiKey, actor?: IEventActor) {
		const eventType = EApiKeyEvents.ApiKeyDeleted;

		const event = this.createApiKeyEvent(eventType, key, actor);
		this.eventEmitter.emit(eventType, event);
	}

	createApiKeyEvent(
		eventType: EApiKeyEvents,
		apiKey: IApiKey,
		actor?: IEventActor
	) {
		const organizationId = apiKey.organization;

		const meta: IEventMeta = {
			type: eventType,
			scope: "organization",
			organization: organizationId,
			actor,
		};

		const event: IEvent = {
			meta,
			payload: apiKey,
		};

		return event;
	}
}
