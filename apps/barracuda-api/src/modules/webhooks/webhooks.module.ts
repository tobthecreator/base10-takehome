import { Module } from "@nestjs/common";
import { WebhooksController } from "api-src/modules/webhooks/webhooks.controller";

@Module({
	imports: [],
	controllers: [WebhooksController],
	providers: [],
	exports: [],
})
export class WebhooksModule {}
