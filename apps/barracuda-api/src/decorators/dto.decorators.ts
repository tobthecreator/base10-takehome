import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsString, ValidateIf } from "class-validator";
import { nanoid } from "nanoid";
import { CapitalizeFirstLetters } from "../../../../libs/shared/helpers";

export const ApiDocUniqueIdProperty = (readOnly?: boolean) => {
	return applyDecorators(
		ApiProperty({
			type: "string",
			description: "Unique identifier for the record",
			example: nanoid(),
			readOnly,
		}),
		IsDefined(),
		IsString()
	);
};

export const ApiDocReferanceIdProperty = ({ type }: { type: string }) => {
	return applyDecorators(
		ApiProperty({
			type: "string",
			description: `Unique identifier of a \`${CapitalizeFirstLetters(
				type
			)}\` record`,
			example: nanoid(),
		}),
		IsDefined(),
		IsString()
	);
};

export const ApiDocOwnerProperty = (description?: string) => {
	return applyDecorators(
		ApiProperty({
			type: "string",
			nullable: true,
			default: null,
			example: nanoid(),
			description:
				description ??
				"Unique identifier of a `User` record, or null for unassigned",
		}),
		ValidateIf((_, value) => value !== null && value !== "null"),
		IsString()
	);
};

export const ApiDocDateProperty = ({
	readOnly = true,
	nullable = false,
}: {
	readOnly?: boolean;
	nullable?: boolean;
}) => {
	return applyDecorators(
		ApiProperty({
			type: "string",
			format: "date",
			example: new Date().toISOString(),
			nullable,
			readOnly,
		}),
		IsDateString()
	);
};
