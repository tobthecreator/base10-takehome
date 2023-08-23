import * as request from 'superagent';

export async function GenericServerCall<T>(
  serverRequest: request.SuperAgentRequest
): Promise<T> {
  const res = await serverRequest;

  return res.body;
}

export const GetServerURL = () => {
  return 'http://localhost:8080';
};
