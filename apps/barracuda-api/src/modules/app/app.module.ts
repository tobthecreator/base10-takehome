import { Injectable, Module, NestMiddleware } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { TasksModule } from "../tasks/tasks.module";
import { SocketModule } from "../sockets/socket.module";

// don't use the database param unless specifically targeting various databases in the same file
export const GetMongoURI = (database?: string) => {
	if (
		database === "test" ||
		process.env.NEXT_PUBLIC_AUTOMATIC_MONGODB_DATABASE === "test"
	) {
		console.log("MONGOURI", process.env.MONGO_URI);
		// this is the in memory mongo URI,set dynamically elsewhere in the app
		return process.env.MONGO_URI!;
	}
	const buildURI = (database: string) => {
		console.log(
			"BUILDURI",
			`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${database}?retryWrites=true&w=majority`
		);
		return `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${database}?retryWrites=true&w=majority`;
	};

	if (database) {
		console.log("database");
		return buildURI(database);
	}

	return buildURI(process.env.NEXT_PUBLIC_AUTOMATIC_MONGODB_DATABASE!);
};

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
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
		AppService,
	],
	imports: [
		ThrottlerModule.forRoot({ ttl: 60, limit: 100 }),
		ConfigModule.forRoot(),
		MongooseModule.forRoot(GetMongoURI()),
		ScheduleModule.forRoot(),
		EventEmitterModule.forRoot({ wildcard: true }),
		TasksModule,
		SocketModule,
	],
})
export class AppModule {}
