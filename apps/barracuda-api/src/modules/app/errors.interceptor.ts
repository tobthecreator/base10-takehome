import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	BadGatewayException,
	CallHandler,
	HttpException,
	ForbiddenException,
	InternalServerErrorException,
	BadRequestException,
	NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as Sentry from "@sentry/node";
import { IErrorMetadata } from "./error.decorator";
import { LogService } from "../log/log.service";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
	constructor(private reflector: Reflector, private logService: LogService) {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((err) =>
				throwError(() => {
					const error = this.reflector.get<IErrorMetadata>(
						"customError",
						context.getHandler()
					);
					// If we intentionally 404 on something, we don't want to log that
					if (err.status === 404) {
						return new NotFoundException();
					}
					const req = context.switchToHttp().getRequest();
					const fullUrl = `${req.protocol}://${req.get("Host")}${
						req.originalUrl
					}`;
					const providedRefreshToken: string | undefined =
						req.cookies["refresh_token"];

					Sentry.captureException(err);
					this.logService.AddError(
						`UNHANDLED API ERROR on ${req.method} at ${fullUrl}`
					);
					if (error) {
						this.logService.AddError(
							`Error on action: ${error.logError || error.returnError}`
						);
						this.logService.AddError(
							`Message surfaced to user: ${error.returnError}`
						);
					}
					this.logService.AddError(`Raw error: ${err.stack}`);

					// Return bad request exception with detailed message
					if (err.response && err.response.statusCode === 400) {
						return new BadRequestException(err.response.message);
					}

					return new InternalServerErrorException(error?.returnError || "");
				})
			)
		);
	}
}
