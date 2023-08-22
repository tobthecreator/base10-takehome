import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchTasks } from "client-app/lib/redux/dashboard/reducers/tasks/tasks.actions";
import {
	ITask,
	TReducerCreateAction,
	TReducerDeleteAction,
	TReducerUpdateAction,
} from "libs/shared/interfaces";
import { RootState } from "../../visitor.store";

const tasksAdapter = createEntityAdapter<ITask>({
	selectId: (t) => t._id,
});

const initialState = tasksAdapter.getInitialState({
	status: "idle",
	error: "No error",
});

export const TasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		createTask(state, action: TReducerCreateAction<ITask>) {
			tasksAdapter.upsertOne(state, action.payload);
		},

		updateTask(state, action: TReducerUpdateAction<ITask>) {
			const {
				_id: taskId,
				title,
				owner,
				due,
				description,
				completed,
			} = action.payload;

			const existingTask = state.entities[taskId];
			if (!existingTask) return;

			existingTask.title = title;
			existingTask.owner = owner;
			existingTask.due = due;
			existingTask.description = description;
			existingTask.completed = completed;
		},

		deleteTask(state, action: TReducerDeleteAction<ITask>) {
			const taskId = action.payload;
			const existingTask = state.entities[taskId];

			if (!existingTask) return;

			tasksAdapter.removeOne(state, taskId);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(FetchTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(FetchTasks.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(FetchTasks.fulfilled, (state, action) => {
				state.status = "idle";
				tasksAdapter.setAll(state, action.payload);
			});
	},
});

export const {
	selectEntities: SelectAllTaskEntities,
	selectAll: SelectAllTasks,
	selectIds: SelectTaskIds,
	selectById: SelectTaskById,
} = tasksAdapter.getSelectors((state: RootState) => {
	return state.tasks;
});

export const { createTask, updateTask, deleteTask } = TasksSlice.actions;

export const TasksReducer = TasksSlice.reducer;
