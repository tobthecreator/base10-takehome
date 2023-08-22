import {
	AuthAgent,
	GetServerURL,
	GenericServerCall,
} from "client-app/lib/server";
import { AUTH } from "libs/shared/constants";

export const GetTest = async (): Promise<any> => {
	return GenericServerCall<any>(AuthAgent.get(`${GetServerURL()}/${AUTH}`));
};

export const PostTest = async (): Promise<any> => {
	return GenericServerCall<any>(
		AuthAgent.post(`${GetServerURL()}/${AUTH}`).send({ test: false })
	);
};
