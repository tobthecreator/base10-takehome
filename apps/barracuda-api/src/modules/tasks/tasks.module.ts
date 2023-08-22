import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TaskEmitters } from "./tasks.emitters";
import { TaskListeners } from "./tasks.listeners";
import { TasksProviders } from "./tasks.providers";

@Module({
	imports: [MongooseModule],
	controllers: [TasksController],
	providers: [TasksService, TaskEmitters, TaskListeners, ...TasksProviders],
	exports: [TasksService, TaskEmitters],
})
export class TasksModule {}
