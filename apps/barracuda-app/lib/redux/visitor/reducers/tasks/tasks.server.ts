import { TASKS } from "libs/shared/constants";
import { ITask, TCreateTask, TUpdateTask } from "libs/shared/interfaces";
import { AuthAgent, GetServerURL, GenericServerCall } from "../../../../server";

export const GetProjectTasks = async (): Promise<ITask[]> => {
	return GenericServerCall<ITask[]>(
		AuthAgent.get(`${GetServerURL()}/${TASKS}/`)
	);
};

export const CreateTask = async (taskToCreate: TCreateTask): Promise<ITask> => {
	return GenericServerCall<ITask>(
		AuthAgent.post(`${GetServerURL()}/${TASKS}`).send(taskToCreate)
	);
};

export const UpdateTask = async (
	taskId: string,
	update: TUpdateTask
): Promise<ITask> => {
	return GenericServerCall<ITask>(
		AuthAgent.put(`${GetServerURL()}/${TASKS}/${taskId}`).send(update)
	);
};

export const DeleteTask = async (taskId: string): Promise<ITask> => {
	return GenericServerCall<ITask>(
		AuthAgent.delete(`${GetServerURL()}/${TASKS}/${taskId}`)
	);
};
