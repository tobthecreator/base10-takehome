import { Task } from "api-src/models/Task";
import { DATABASE_CONNECTION, TASK_MODEL } from "libs/shared/constants";

export const TasksProviders = [
	{
		provide: TASK_MODEL,
		useFactory: () => Task,
		inject: [DATABASE_CONNECTION],
	},
];
