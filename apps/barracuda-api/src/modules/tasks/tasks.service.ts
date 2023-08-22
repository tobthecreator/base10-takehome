import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AnyKeys, FilterQuery, Model, UpdateQuery } from "mongoose";
import { TASK_MODEL } from "libs/shared/constants";
import { FindMany, FindOne } from "libs/shared/helpers";
import { ITask, TCreateTask, TUpdateTask } from "libs/shared/interfaces";
import {
	CreateOneReturn,
	FindManyOptions,
	FindManyReturn,
	FindOneOptions,
	FindOneReturn,
} from "libs/shared/interfaces";
import { IEventActor } from "libs/shared/interfaces";
import { TaskEmitters } from "./tasks.emitters";
import { isUndefined } from "lodash";

@Injectable()
export class TasksService {
	constructor(
		@Inject(TASK_MODEL)
		private taskModel: Model<ITask>,
		private taskEmitters: TaskEmitters
	) {}

	async FindByOrganizationId(organizationId: string): Promise<ITask[]> {
		return this.findMany({ organization: organizationId });
	}

	async FindById(taskId: string): FindOneReturn<ITask> {
		return this.findOne({ _id: taskId });
	}

	async Create(taskToCreate: TCreateTask, actor?: IEventActor): Promise<ITask> {
		const { _id, title, owner, due, description, completed, organization } =
			taskToCreate;

		return this.create(
			{
				_id,
				title,
				owner,
				due,
				description,
				completed,
				organization,
			},
			actor
		);
	}

	async Update(
		taskId: string,
		update: TUpdateTask,
		actor?: IEventActor
	): Promise<ITask> {
		const { title, owner, due, description, completed } = update;

		return this.updateOne(
			{ _id: taskId },
			{ title, owner, due, description, completed },
			actor
		);
	}

	async Delete(taskId: string, actor?: IEventActor): Promise<ITask> {
		return this.delete({ _id: taskId }, actor);
	}

	async GetLatestCompletedTaskById(
		organization: string,
		taskIds: string[]
	): Promise<ITask | null> {
		return this.findOne(
			{
				organization,
				_id: { $in: taskIds },
				completed: true,
			},
			{ sort: { updatedAt: -1 } }
		);
	}

	private async create(
		doc: AnyKeys<ITask>,
		actor?: IEventActor
	): CreateOneReturn<ITask> {
		const newTask = await this.taskModel.create(doc);

		this.taskEmitters.EmitTaskCreated(newTask!, actor);

		return newTask;
	}

	private async findOne(
		query: FilterQuery<ITask>,
		options?: FindOneOptions
	): FindOneReturn<ITask> {
		return FindOne<ITask>(this.taskModel, query, options);
	}

	private async findMany(
		query: FilterQuery<ITask>,
		options?: FindManyOptions
	): FindManyReturn<ITask> {
		return FindMany<ITask>(this.taskModel, query, options);
	}

	private async updateOne(
		query: FilterQuery<ITask>,
		update: UpdateQuery<ITask>,
		actor?: IEventActor
	): Promise<ITask> {
		const updatedTask = await this.taskModel
			.findOneAndUpdate(
				query,
				{
					...update,
					_id: undefined,
				},
				{ new: true }
			)
			.lean();

		if (!updatedTask) {
			throw new NotFoundException("Task not found");
		}

		this.taskEmitters.EmitTaskUpdated(updatedTask, actor);

		if (!isUndefined(update.completed) && update.completed === true) {
			this.taskEmitters.EmitTaskCompleted(updatedTask, actor);
		}

		return updatedTask;
	}

	private async delete(
		query: FilterQuery<ITask>,
		actor?: IEventActor
	): Promise<ITask> {
		const deletedTask = await this.taskModel.findOneAndDelete(query).lean();

		if (!deletedTask) {
			throw new NotFoundException("Task not found");
		}

		this.taskEmitters.EmitTaskDeleted(deletedTask, actor);

		return deletedTask;
	}
}
