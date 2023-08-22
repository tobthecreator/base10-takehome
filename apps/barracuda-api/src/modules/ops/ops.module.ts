import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OpsBearerStrategy } from "../auth/ops.strategy";
import { OpsController } from "./ops.controller";
import { OpsProviders } from "./ops.providers";
import { OpsService } from "./ops.service";

@Module({
	imports: [MongooseModule],
	controllers: [OpsController],
	providers: [OpsService, OpsBearerStrategy, ...OpsProviders],
	exports: [],
})
export class OpsModule {}
