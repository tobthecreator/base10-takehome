import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITask, TCreateTask, TUpdateTask } from "libs/shared/interfaces";
import { nanoid } from "nanoid";
import {
	createTask,
	deleteTask,
	updateTask,
} from "client-app/lib/redux/dashboard/reducers/tasks/tasks.reducer";
import {
	CreateTask,
	DeleteTask,
	GetProjectTasks,
	UpdateTask,
} from "./tasks.server";
import { RootState } from "../../visitor.store";

export const FetchTasks = createAsyncThunk(
	"tasks/fetchTasks",
	async (): Promise<ITask[]> => {
		return GetProjectTasks();
	}
);

export type TOptimisticCreateTaskProps = Pick<
	TCreateTask,
	"title" | "owner" | "due" | "description" | "completed" | "organization"
>;
export const OptimisticCreateTask =
	(task: TOptimisticCreateTaskProps) => async (dispatch) => {
		const _id = nanoid();

		const { title, owner, due, description, organization } = task;

		const newTask: ITask = {
			_id,
			title,
			owner,
			organization,
			due,
			description,
			completed: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		dispatch(createTask(newTask));

		try {
			const createdTask = await CreateTask(newTask);

			dispatch(createTask(createdTask));
		} catch (err) {
			console.log(`Task Create Failed, Deleted Task from State. Error: ${err}`);
			dispatch(deleteTask(_id));
		}
	};

export const OptimisticUpdateTask =
	(taskId: string, update: TUpdateTask) => async (dispatch, getState) => {
		const state: RootState = getState();

		const fallbackTask = state.tasks.entities[taskId];
		if (!fallbackTask) return;

		dispatch(
			updateTask({
				...fallbackTask,
				...update,
				_id: taskId,
				updatedAt: new Date().toISOString(),
			})
		);
		try {
			const updatedTask = await UpdateTask(taskId, update);

			dispatch(updateTask(updatedTask));
		} catch (err) {
			console.log(
				`Task update failed, restored Task from previous redux state. Error: ${err}`
			);
			dispatch(updateTask(fallbackTask));
		}
	};

// TODO STARTER - can we abstract these to generics?
export const OptimisticDeleteTask =
	(taskId: string) => async (dispatch, getState) => {
		const state: RootState = getState();
		const fallbackTask = state.tasks.entities[taskId];

		if (!fallbackTask) return;

		dispatch(deleteTask(taskId));
		try {
			const deletedTask = await DeleteTask(taskId);
			dispatch(deleteTask(deletedTask._id));
		} catch (err) {
			// TODO STARTER abstract these error messages
			console.log(
				`Task delete failed, restored Task from previous redux state. Error: ${err}`
			);
			dispatch(createTask(fallbackTask));
		}
	};
