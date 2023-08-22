import {
	IsBoolean,
	IsDateString,
	IsDefined,
	IsString,
	ValidateIf,
} from "class-validator";
import {
	PartialType,
	OmitType,
	ApiProperty,
	ApiHideProperty,
} from "@nestjs/swagger";
import { ITask } from "libs/shared/interfaces";
import {
	ApiDocDateProperty,
	ApiDocUniqueIdProperty,
	ApiDocOwnerProperty,
	ApiDocReferanceIdProperty,
} from "../../decorators/dto.decorators";

export class TaskDTO implements ITask {
	@ApiDocUniqueIdProperty()
	readonly _id: string;

	@ApiDocReferanceIdProperty({ type: "organization" })
	readonly organization: string;

	@ApiProperty({
		type: "string",
		description: "The title of the `Task`",
		example: "Follow-up with Neil via Twitter in 17 days",
	})
	@IsDefined()
	@IsString()
	title: string;

	@ApiProperty({
		type: "string",
		description: "The description of the `Task`",
		example:
			"Neil is mid-temporal pincer movement and will not be able to meet until he reinverts",
	})
	@IsDefined()
	@IsString()
	description?: string;

	@ApiProperty({
		type: "boolean",
		description: "Is this task complete yes/no",
		example: false,
	})
	@IsDefined()
	@IsBoolean()
	completed: boolean;

	@ApiProperty({
		type: "string",
		format: "date",
		example: new Date(Date.now() + 17 * 60 * 60 * 24 * 1000).toISOString(),
		nullable: true,
		readOnly: false,
	})
	@ValidateIf((_, value) => value !== null && value !== "null")
	@IsDateString()
	due: Date | null | string;

	@ApiDocOwnerProperty()
	owner: string | null;

	@ApiDocDateProperty({ readOnly: true, nullable: false })
	readonly createdAt: Date | string;

	@ApiDocDateProperty({ readOnly: true, nullable: false })
	readonly updatedAt: Date | string;
}

export class CreateTaskDTO extends OmitType(TaskDTO, [
	"_id",
	"createdAt",
	"updatedAt",
]) {
	@ApiHideProperty()
	@IsDefined()
	@IsString()
	readonly _id: string;
}

export class UpdateTaskDTO extends PartialType(
	OmitType(CreateTaskDTO, ["_id", "organization"])
) {}
