import { EEvents, TEvent, IEventMeta } from "libs/shared/interfaces";

export const BuildSocketEventName = (
	scope: "organization" | "user",
	id: string,
	eventType: TEvent
) => {
	const prefix = scope === "organization" ? `cid.${id}` : `uid.${id}`;
	return `${prefix}-${eventType}`;
};

export const BuildSocketEventNames = (
	organizationId: string,
	userId: string
) => {
	return Object.keys(EEvents).map((k) => {
		// user event names
		// TODO STARTER - user events once user service is stood back up
		// if ([EUserEvents.UserUpdated].includes(k as EUserEvents)) {
		// 	return BuildSocketEventName("user", userId, k as TEvent);
		// }

		return BuildSocketEventName("organization", organizationId, k as TEvent);
	});
};

export const BuildRoomName = (scope: "organization" | "user", id: string) => {
	return scope === "organization" ? `pid.${id}` : `uid.${id}`;
};

export const FilterCurrentClient = (
	eventMeta: IEventMeta,
	clientId: string,
	dispatch: () => void
) => {
	if (eventMeta.actor?.clientId === clientId) return;
	return dispatch();
};
