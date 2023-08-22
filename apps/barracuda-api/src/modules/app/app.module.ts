import {
	BadRequestException,
	Injectable,
	Module,
	NestMiddleware,
} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { LoggerConfig } from "api-src/winstonLogger";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { AuthModule } from "api-src/modules/auth/auth.module";
import { BearerApiKeyStrategy } from "api-src/modules/auth/bearer-api-key.strategy";
import { ApiKeysModule } from "api-src/modules/apiKeys/apiKeys.module";
import { WebhooksModule } from "api-src/modules/webhooks/webhooks.module";
import { StripeModule } from "api-src/modules/stripe/stripe.module";
import { ErrorsInterceptor } from "./errors.interceptor";
import { LogModule } from "../log/log.module";
import { OpsModule } from "../ops/ops.module";

const logger: LoggerConfig = new LoggerConfig();

// don't use the database param unless specifically targeting various databases in the same file
export const GetMongoURI = (database?: string) => {
	if (
		database === "test" ||
		process.env.NEXT_PUBLIC_AUTOMATIC_MONGODB_DATABASE === "test"
	) {
		// this is the in memory mongo URI,set dynamically elsewhere in the app
		return process.env.MONGO_URI!;
	}
	const buildURI = (database: string) => {
		return `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${database}?retryWrites=true&w=majority`;
	};

	if (database) {
		return buildURI(database);
	}

	const isScript = () => {
		return process.env.SCRIPT && process.env.SCRIPT === "true";
	};

	return isScript()
		? buildURI(process.env.MANUAL_MONGODB_DATABASE!)
		: buildURI(process.env.NEXT_PUBLIC_AUTOMATIC_MONGODB_DATABASE!);
};

// TODO API - move these to their own files
@Injectable()
export class VersionHeaderMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		if (!req.headers["cuda-version"]) {
			throw new BadRequestException("Cuda-Version request header required");
		}

		next();
	}
}

@Injectable()
export class IdMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		if (!req.body._id) {
			req.body._id = nanoid();
		}

		next();
	}
}

@Module({
	controllers: [AppController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ErrorsInterceptor,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
		AppService,
		BearerApiKeyStrategy,
	],
	imports: [
		ThrottlerModule.forRoot({ ttl: 60, limit: 100 }),
		ConfigModule.forRoot(),
		MongooseModule.forRoot(GetMongoURI()),
		ScheduleModule.forRoot(),
		EventEmitterModule.forRoot({ wildcard: true }),
		WinstonModule.forRoot(logger.console()),
		AuthModule,
		ApiKeysModule,
		WebhooksModule,
		StripeModule,
		LogModule,
		OpsModule,
	],
})
export class AppModule {}
