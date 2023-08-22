import { EApiKeyEvents } from "libs/shared/interfaces/apiKeys.interfaces";
import { ETaskEvents } from "./tasks.interfaces";

export const EEvents = { ...ETaskEvents, ...EApiKeyEvents };
export type TEvent = ETaskEvents | EApiKeyEvents;

export interface IEventMeta {
	type: TEvent;
	scope: "organization" | "user";
	organization?: string;
	user?: string;
	doc?: string | any;
	docModel?: string;
	actor?: IEventActor;
}

export interface IEvent {
	meta: IEventMeta;
	payload: any;
}

export type TEventActor = "user" | "apiKey";

export interface IEventActor {
	actor: string; // userId
	actorType: TEventActor;
	clientId?: string;
}
