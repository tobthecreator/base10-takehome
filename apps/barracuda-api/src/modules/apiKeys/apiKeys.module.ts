import { Module } from "@nestjs/common";
import { ApiKeyService } from "api-src/modules/apiKeys/apiKeys.service";
import { MongooseModule } from "api-src/modules/mongoose/mongoose.module";
import { ApiKeyProviders } from "./apiKeys.providers";
import { ApiKeyController } from "./apiKeys.controller";
import { ApiKeyEmitters } from "api-src/modules/apiKeys/apiKeys.emitters";
import { ApiKeyListeners } from "api-src/modules/apiKeys/apiKeys.listeners";
import { SocketModule } from "api-src/modules/sockets/socket.module";

@Module({
	imports: [MongooseModule, SocketModule],
	controllers: [ApiKeyController],
	providers: [
		ApiKeyService,
		ApiKeyEmitters,
		ApiKeyListeners,
		...ApiKeyProviders,
	],
	exports: [ApiKeyService],
})
export class ApiKeysModule {}
