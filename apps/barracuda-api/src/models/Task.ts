import * as mongoose from "mongoose";
import { nanoid } from "nanoid";
import { DTask } from "libs/shared/interfaces";

const Schema = mongoose.Schema;

const taskSchema = new Schema<DTask>(
	{
		_id: { type: String, default: () => nanoid() },
		organization: { type: String, ref: "Company", required: true },
		owner: { type: String, ref: "User", required: true, default: null },
		completed: { type: Boolean, required: true, default: false },
		title: { type: String, required: true },
		due: { type: Date, required: true, default: null },
		description: { type: String, required: false },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

export const TaskSchema = taskSchema;
export const Task = mongoose.model("Task", TaskSchema);
