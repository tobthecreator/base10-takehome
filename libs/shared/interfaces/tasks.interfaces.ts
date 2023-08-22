import { ICudaObject } from "./cudaObject.interfaces";
import { IEvent } from "./events.interfaces";

export interface ITask extends ICudaObject {
	owner: string | null;
	title: string;
	description?: string;
	completed: boolean;
	due: Date | string | null;
}

export type TCreateTask = Pick<
	ITask,
	| "_id"
	| "organization"
	| "title"
	| "owner"
	| "due"
	| "description"
	| "completed"
>;

// Update interfaces should inherit from create
export type TUpdateTask = Partial<
	Pick<TCreateTask, "title" | "owner" | "due" | "description" | "completed">
>;

export type DTask = ITask & Document;

export interface ITaskCompletedEvent extends IEvent {
	payload: ITask;
}

export interface ITaskCreatedEvent extends IEvent {
	payload: ITask;
}

export interface ITaskUpdatedEvent extends IEvent {
	payload: ITask;
}

export interface ITaskDeletedEvent extends IEvent {
	payload: ITask;
}

export enum ETaskEvents {
	TaskCompleted = "tasks.completed",
	TaskCreated = "tasks.created",
	TaskUpdated = "tasks.updated",
	TaskDeleted = "tasks.deleted",
}
