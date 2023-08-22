import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import {
	ETaskEvents,
	ITaskCreatedEvent,
	ITaskUpdatedEvent,
	ITaskDeletedEvent,
} from "libs/shared/interfaces";
import { SocketService } from "../sockets/socket.service";

@Injectable()
export class TaskListeners {
	constructor(private socketService: SocketService) {}

	@OnEvent(ETaskEvents.TaskCreated)
	async TaskCreated(event: ITaskCreatedEvent) {
		this.socketService.Send(event);
	}

	@OnEvent(ETaskEvents.TaskUpdated)
	async TaskUpdated(event: ITaskUpdatedEvent) {
		this.socketService.Send(event);
	}

	@OnEvent(ETaskEvents.TaskDeleted)
	async TaskDeleted(event: ITaskDeletedEvent) {
		this.socketService.Send(event);
	}
}
