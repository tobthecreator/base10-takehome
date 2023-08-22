import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import {
	ETaskEvents,
	ITask,
	IEvent,
	IEventActor,
	IEventMeta,
} from "libs/shared/interfaces";

@Injectable()
export class TaskEmitters {
	constructor(private eventEmitter: EventEmitter2) {}

	EmitTaskCompleted(task: ITask, actor?: IEventActor) {
		const eventType = ETaskEvents.TaskCompleted;

		const event = this.createTaskEvent(eventType, task, actor);

		this.eventEmitter.emit(eventType, event);
	}

	EmitTaskCreated(task: ITask, actor?: IEventActor) {
		const eventType = ETaskEvents.TaskCreated;

		const event = this.createTaskEvent(eventType, task, actor);

		this.eventEmitter.emit(eventType, event);
	}

	EmitTaskUpdated(task: ITask, actor?: IEventActor) {
		const eventType = ETaskEvents.TaskUpdated;

		const event = this.createTaskEvent(eventType, task, actor);

		this.eventEmitter.emit(eventType, event);
	}

	EmitTaskDeleted(task: ITask, actor?: IEventActor) {
		const eventType = ETaskEvents.TaskDeleted;

		const event = this.createTaskEvent(eventType, task, actor);

		this.eventEmitter.emit(eventType, event);
	}

	private createTaskEvent(
		eventType: ETaskEvents,
		task: ITask,
		actor?: IEventActor
	) {
		const meta: IEventMeta = {
			type: eventType,
			scope: "organization",
			organization: task.organization,
			actor,
		};

		const event: IEvent = {
			meta,
			payload: task,
		};

		return event;
	}
}
