import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";
import { BuildRoomName, BuildSocketEventName } from "libs/shared/helpers";
import { IEvent, IEventMeta } from "libs/shared/interfaces";

@Injectable()
export class SocketService {
	public socket: Server;

	constructor() {}

	Send(event: IEvent) {
		this.socket
			.to(this.BuildRoomName(event.meta))
			.emit(this.BuildSocketEventName(event.meta), event.payload, event.meta);
	}

	BuildRoomName(eventMeta: IEventMeta) {
		const { organization, user, scope } = eventMeta;

		const id = scope === "organization" ? organization! : user!;
		return BuildRoomName(scope, id);
	}

	BuildSocketEventName(eventMeta: IEventMeta) {
		const { type, organization, user, scope } = eventMeta;

		const id = scope === "organization" ? organization! : user!;
		return BuildSocketEventName(scope, id, type);
	}
}
