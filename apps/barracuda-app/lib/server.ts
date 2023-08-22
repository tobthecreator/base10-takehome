import * as request from "superagent";
import { isUndefined } from "lodash";

export const AuthAgent = request.agent().withCredentials();
export const GetServerURL = () => {
	return process.env.NEXT_PUBLIC_API_URL;
};

export const LogError = async (message: string) => {
	if (process.env.NODE_ENV === "production") {
		try {
			await AuthAgent.post(`${GetServerURL()}/log/error`).send({
				message,
			});
		} catch (e) {
			console.log("Error while writing log");
		}
	}
};

export const Log = async (message: string) => {
	if (process.env.NODE_ENV === "production") {
		try {
			await AuthAgent.post(`${GetServerURL()}/log`).send({
				message,
			});
		} catch (e) {
			console.log("Error while writing log");
		}
	}
};

export type ServerError = {
	statusCode: number;
	message: string;
	response: any;
};

export function IsServerError(value: any): value is ServerError {
	const e = value as ServerError;

	return isUndefined(e.statusCode) || isUndefined(e.message);
}

type GenericServerCallOptions = {
	disableToast?: boolean;
	disableLogging?: boolean;
};

/*
	Will not catch errors
*/
export async function GenericServerCall<T>(
	serverRequest: request.SuperAgentRequest,
	options?: GenericServerCallOptions
): Promise<T> {
	const res = await serverRequest.set({
		socketClientId: sessionStorage
			? sessionStorage.getItem("socketClientId")
			: "",
		"Cuda-Version": "2023-03-10", // TODO STARTER: make an enum for
	});

	return res.body;
}
