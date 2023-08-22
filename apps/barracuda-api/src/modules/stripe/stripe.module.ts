import { Module } from "@nestjs/common";
import { StripeController } from "api-src/modules/stripe/stripe.controller";

@Module({
	imports: [],
	controllers: [StripeController],
	providers: [],
	exports: [],
})
export class StripeModule {}
