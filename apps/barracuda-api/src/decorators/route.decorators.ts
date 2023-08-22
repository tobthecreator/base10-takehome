import { applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";

/*
    Composed Decorators
*/

type TCudaSwaggerOperation = {
	summary: string;
	description: string;
	operationId: string;
};

type TCudaParam = { name: string; required: boolean };

export const ApiDocGetManyResponses = ({
	operation,
	returnType,
}: {
	operation: TCudaSwaggerOperation;
	returnType: any;
}) => {
	return applyDecorators(
		ApiOperation(operation),
		ApiDocOkResponse("GET", returnType),
		ApiDocNotFoundResponse(),
		ApiDocUnauthorizedResponse(),
		ApiDocForbiddenResponse(),
		ApiDocInternalServerErrorResponse()
	);
};

export const ApiDocGetOneResponses = ({
	operation,
	param,
	returnType,
}: {
	operation: TCudaSwaggerOperation;
	param: TCudaParam;
	returnType: any;
}) => {
	return applyDecorators(
		ApiOperation(operation),
		ApiParam({ name: param.name, required: param.required }),
		ApiDocOkResponse("GET", returnType),
		ApiDocNotFoundResponse(),
		ApiDocUnauthorizedResponse(),
		ApiDocForbiddenResponse(),
		ApiDocInternalServerErrorResponse()
	);
};

export const ApiDocCreateResponses = ({
	operation,
	bodyType,
	returnType,
}: {
	operation: TCudaSwaggerOperation;
	bodyType: any;
	returnType: any;
}) => {
	return applyDecorators(
		ApiBody({ type: bodyType }),
		ApiOperation(operation),
		ApiDocCreatedResponse(returnType),
		ApiDocBadRequestResponse(),
		ApiDocUnauthorizedResponse(),
		ApiDocForbiddenResponse(),
		ApiDocInternalServerErrorResponse()
	);
};

export const ApiDocUpdateResponses = ({
	operation,
	param,
	bodyType,
	returnType,
}: {
	operation: TCudaSwaggerOperation;
	param: TCudaParam;
	bodyType: any;
	returnType: any;
}) => {
	return applyDecorators(
		ApiBody({ type: bodyType }),
		ApiOperation(operation),
		ApiParam({ name: param.name, required: param.required }),
		ApiDocOkResponse("PUT", returnType),
		ApiDocBadRequestResponse(),
		ApiDocNotFoundResponse(),
		ApiDocUnauthorizedResponse(),
		ApiDocForbiddenResponse(),
		ApiDocInternalServerErrorResponse()
	);
};

export const ApiDocDeleteResponses = ({
	operation,
	param,
	returnType,
}: {
	operation: TCudaSwaggerOperation;
	param: TCudaParam;
	returnType: any;
}) => {
	return applyDecorators(
		ApiOperation(operation),
		ApiDocOkResponse("DELETE", returnType),
		ApiParam({ name: param.name, required: param.required }),
		ApiDocBadRequestResponse(),
		ApiDocNotFoundResponse(),
		ApiDocUnauthorizedResponse(),
		ApiDocForbiddenResponse(),
		ApiDocInternalServerErrorResponse()
	);
};

/*
    CRUD
*/
export const ApiDocOkResponse = (
	method: "GET" | "PUT" | "DELETE",
	type: any
) => {
	let description: string;
	switch (method) {
		case "GET":
			description = `The record has been successfully fetched`;
			break;
		case "PUT":
			description = `The record has been successfully updated`;
			break;
		case "DELETE":
			description = `The record has been successfully deleted`;
			break;
		default:
			description = `Action successful`;
			break;
	}

	return ApiOkResponse({
		description,
		type,
	});
};

export const ApiDocCreatedResponse = (type: any) => {
	return ApiCreatedResponse({
		description: "The record has been successfully created",
		type,
	});
};

/*
    Errors
*/
export const ApiDocBadRequestResponse = () => {
	return ApiBadRequestResponse({
		description: "The server cannot process this request due to invalid syntax",
	});
};

export const ApiDocNotFoundResponse = () => {
	return ApiNotFoundResponse({
		description: "Record not found",
	});
};

export const ApiDocUnauthorizedResponse = () => {
	return ApiUnauthorizedResponse({
		description: "You are not authenticated",
	});
};

export const ApiDocForbiddenResponse = () => {
	return ApiForbiddenResponse({
		description:
			"You are properly authenticated, but do not have the permissions required to execute this action",
	});
};

export const ApiDocInternalServerErrorResponse = () => {
	return ApiInternalServerErrorResponse({
		description: "Whoops! Something went wrong!",
	});
};
