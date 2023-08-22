import { TASKS } from "libs/shared/constants";
import {
	Body,
	Controller,
	Get,
	Injectable,
	Param,
	Post,
	Put,
	UseGuards,
	Delete,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ApiTags } from "@nestjs/swagger";
import {
	FindOneReturn,
	IEventActor,
	ITask,
} from "../../../../../libs/shared/interfaces";
import { HybridAuthGuard } from "../auth/auth.guards";
import { Actor, OrganizationId } from "../auth/auth.decorators";
import { CreateTaskGuard, GetTaskGuard, UpdateTaskGuard } from "./tasks.guards";
import {
	ApiDocCreateResponses,
	ApiDocDeleteResponses,
	ApiDocGetManyResponses,
	ApiDocGetOneResponses,
	ApiDocUpdateResponses,
} from "../../decorators/route.decorators";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "./tasks.dto";

@ApiTags("Tasks")
@Injectable()
@Controller({ path: TASKS })
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@ApiDocGetManyResponses({
		operation: {
			summary: "Get Tasks",
			description: "Get Tasks",
			operationId: "getTasks",
		},
		returnType: [TaskDTO],
	})
	@UseGuards(HybridAuthGuard("hybrid"))
	@Get("/")
	async GetOrganizationTasks(@OrganizationId() orgId: string) {
		return this.tasksService.FindByOrganizationId(orgId);
	}

	@ApiDocGetOneResponses({
		operation: {
			summary: "Get Task",
			description: "Get a Task",
			operationId: "getTask",
		},
		param: {
			name: "taskId",
			required: true,
		},
		returnType: TaskDTO,
	})
	@UseGuards(HybridAuthGuard("hybrid"), GetTaskGuard)
	@Get("/:taskId")
	async GetTask(@Param("taskId") taskId: string): FindOneReturn<ITask> {
		return this.tasksService.FindById(taskId);
	}

	@ApiDocCreateResponses({
		operation: {
			summary: "Create Task",
			description: "Adds a new Task",
			operationId: "createTask",
		},
		bodyType: CreateTaskDTO,
		returnType: TaskDTO,
	})
	@UseGuards(HybridAuthGuard("hybrid"), CreateTaskGuard)
	@Post("")
	async CreateTask(
		@Actor() actor: IEventActor,
		@Body() body: CreateTaskDTO
	): Promise<TaskDTO> {
		return this.tasksService.Create(body, actor);
	}

	@ApiDocUpdateResponses({
		operation: {
			summary: "Update Task",
			description: "Updates an existing Task",
			operationId: "updateTask",
		},
		param: {
			name: "taskId",
			required: true,
		},
		bodyType: UpdateTaskDTO,
		returnType: TaskDTO,
	})
	@UseGuards(HybridAuthGuard("hybrid"), UpdateTaskGuard)
	@Put("/:taskId")
	async UpdateTask(
		@Actor() actor: IEventActor,
		@Param("taskId") taskId: string,
		@Body() body: UpdateTaskDTO
	): FindOneReturn<TaskDTO> {
		return this.tasksService.Update(taskId, body, actor);
	}

	@ApiDocDeleteResponses({
		operation: {
			summary: "Delete Task",
			description: "Deletes an existing Task",
			operationId: "deleteTask",
		},
		param: {
			name: "taskId",
			required: true,
		},
		returnType: TaskDTO,
	})
	@UseGuards(HybridAuthGuard("hybrid"), UpdateTaskGuard)
	@Delete("/:taskId")
	async DeleteTask(
		@Actor() actor: IEventActor,
		@Param("taskId") taskId: string
	): Promise<TaskDTO> {
		return this.tasksService.Delete(taskId, actor);
	}
}
