import { SetMetadata } from "@nestjs/common";

export interface IErrorMetadata {
	returnError: string;
	logError: string;
}

/**
 *
 * @param returnError - The error message to returned to the client
 * @param logError - The location/context of the error, logged to the server
 * @returns
 */
export const Error = (returnError: string, logError?: string) =>
	SetMetadata("customError", { returnError, logError });
