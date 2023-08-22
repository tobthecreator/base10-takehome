import { Socket } from "socket.io-client";
import { BuildSocketEventNames } from "libs/shared/helpers";
import InitTaskSockets from "./reducers/tasks/tasks.sockets";

export const InitSocketAndEventSubscriptions = (
	socket: Socket,
	dispatch: any,
	organizationId: string
): Socket => {
	// socket.onAny((e) => console.log("redux onany", e));

	const initializers = [InitTaskSockets];

	initializers.forEach((initializer) => {
		socket = initializer(socket, dispatch, organizationId);
	});

	return socket;
};

export const TurnOffSocketandEventSubscriptions = (
	socket: Socket,
	organizationId: string,
	userId: string
) => {
	const eventNames = BuildSocketEventNames(organizationId, userId);

	eventNames.forEach((en) => socket.off(en));

	socket.disconnect();

	return socket;
};
