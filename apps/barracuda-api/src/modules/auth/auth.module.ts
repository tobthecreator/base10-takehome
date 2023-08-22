import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { ApiKeysModule } from "api-src/modules/apiKeys/apiKeys.module";
import { JwtStrategy } from "api-src/modules/auth/jwt.strategy";
import { BearerApiKeyStrategy } from "api-src/modules/auth/bearer-api-key.strategy";
import { OpsBearerStrategy } from "./ops.strategy";

@Module({
	imports: [MongooseModule, ApiKeysModule],
	controllers: [AuthController],
	providers: [JwtStrategy, BearerApiKeyStrategy, OpsBearerStrategy],
	exports: [],
})
export class AuthModule {}
