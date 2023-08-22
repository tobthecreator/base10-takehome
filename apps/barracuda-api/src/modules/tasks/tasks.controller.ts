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
import { FindOneReturn, ITask } from "../../../../../libs/shared/interfaces";
import { CreateTaskGuard, GetTaskGuard, UpdateTaskGuard } from "./tasks.guards";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "./tasks.dto";

@Injectable()
@Controller({ path: TASKS })
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@UseGuards()
	@Get("/")
	async GetOrganizationTasks() {
		return this.tasksService.GetAllTasks();
	}

	@UseGuards(GetTaskGuard)
	@Get("/:taskId")
	async GetTask(@Param("taskId") taskId: string): FindOneReturn<ITask> {
		return this.tasksService.FindById(taskId);
	}

	@UseGuards(CreateTaskGuard)
	@Post("")
	async CreateTask(@Body() body: CreateTaskDTO): Promise<TaskDTO> {
		return this.tasksService.Create(body);
	}

	@UseGuards(UpdateTaskGuard)
	@Put("/:taskId")
	async UpdateTask(
		@Param("taskId") taskId: string,
		@Body() body: UpdateTaskDTO
	): FindOneReturn<TaskDTO> {
		return this.tasksService.Update(taskId, body);
	}

	@UseGuards(UpdateTaskGuard)
	@Delete("/:taskId")
	async DeleteTask(@Param("taskId") taskId: string): Promise<TaskDTO> {
		return this.tasksService.Delete(taskId);
	}
}
