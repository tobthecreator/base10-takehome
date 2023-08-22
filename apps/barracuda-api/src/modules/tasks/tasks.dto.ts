import { PartialType, OmitType } from "@nestjs/swagger";
import { ITask } from "libs/shared/interfaces";

export class TaskDTO implements ITask {
	readonly _id: string;
	readonly organization: string;
	title: string;
	description?: string;
	completed: boolean;
	due: Date | null | string;
	owner: string | null;
	readonly createdAt: Date | string;
	readonly updatedAt: Date | string;
}

export class CreateTaskDTO extends OmitType(TaskDTO, [
	"_id",
	"createdAt",
	"updatedAt",
]) {
	readonly _id: string;
}

export class UpdateTaskDTO extends PartialType(
	OmitType(CreateTaskDTO, ["_id", "organization"])
) {}
