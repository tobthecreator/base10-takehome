import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { IPassportUser, TCreateTask } from "libs/shared/interfaces";

@Injectable()
export class GetTaskGuard implements CanActivate {
	constructor(private tasksService: TasksService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { user, params } = request;

		if (!user) {
			throw new UnauthorizedException();
		}

		if (!params.taskId) {
			throw new BadRequestException();
		}

		const task = await this.tasksService.FindById(params.taskId);

		if (!task) {
			throw new NotFoundException("Task not found");
		}

		return request.organizationid === task.organization;
	}
}

export class CreateTaskGuard implements CanActivate {
	constructor() {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { body } = request;

		const user: IPassportUser = request.user;

		if (!user) {
			throw new UnauthorizedException();
		}

		const task = body as TCreateTask;

		if (!task.organization) {
			throw new BadRequestException();
		}

		const organizationId = task.organization;

		return organizationId === request.organizationId;
	}
}

@Injectable()
export class UpdateTaskGuard implements CanActivate {
	constructor(private tasksService: TasksService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { params } = request;

		const user: IPassportUser = request.user;

		if (!user) {
			throw new UnauthorizedException();
		}

		if (!params.taskId) {
			throw new BadRequestException();
		}

		const task = await this.tasksService.FindById(params.taskId);

		if (!task) {
			throw new NotFoundException("Task not found");
		}

		const organizationId = task.organization;

		return organizationId === request.organizationId;
	}
}
