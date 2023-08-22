import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IEventActor, IPassportUser } from "libs/shared/interfaces";

export const OrganizationId = createParamDecorator<string>(
	(data, ctx: ExecutionContext): string => {
		const request = ctx.switchToHttp().getRequest();
		return request.organizationId;
	}
);

export const Actor = createParamDecorator<IPassportUser>(
	(data, ctx: ExecutionContext): IEventActor => {
		const request = ctx.switchToHttp().getRequest();
		return {
			actor: request.user.id,
			actorType: request.user.type,
			clientId: request.headers.socketclientid,
		};
	}
);
