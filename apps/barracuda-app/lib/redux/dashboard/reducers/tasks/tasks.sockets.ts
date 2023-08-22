import { Socket } from "socket.io-client";
import { BuildSocketEventName } from "../../../../../../../libs/shared/helpers";
import { ETaskEvents, ITask } from "libs/shared/interfaces";
import { createTask, updateTask, deleteTask } from "./tasks.reducer";

const InitTaskSockets = (
	s: Socket,
	dispatch: any,
	organizationId: string
): Socket => {
	const taskCreatedEvent = BuildSocketEventName(
		"organization",
		organizationId,
		ETaskEvents.TaskCreated
	);

	const taskUpdatedEvent = BuildSocketEventName(
		"organization",
		organizationId,
		ETaskEvents.TaskUpdated
	);

	const taskDeletedEvent = BuildSocketEventName(
		"organization",
		organizationId,
		ETaskEvents.TaskDeleted
	);

	s.on(taskCreatedEvent, (createdTask: ITask) => {
		// console.log("redux createdTask");
		dispatch(createTask(createdTask));
	});

	s.on(taskUpdatedEvent, (updatedTask: ITask) => {
		// console.log("redux updatedTask");
		dispatch(updateTask(updatedTask));
	});

	s.on(taskDeletedEvent, (deletedTask: ITask) => {
		// console.log("redux deletedTask");
		dispatch(deleteTask(deletedTask._id));
	});

	return s;
};

export default InitTaskSockets;
