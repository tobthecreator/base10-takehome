import { STRIPE } from "libs/shared/constants";
import {
	All,
	Controller,
	Injectable,
	Param,
	Query,
	Req,
	Res,
} from "@nestjs/common";
import { Response } from "express";
import { subscriptionHandler } from "use-stripe-subscription";
import { organizations } from "@clerk/clerk-sdk-node";

@Injectable()
@Controller({ path: STRIPE })
export class StripeController {
	constructor() {}

	@All("/subscription/:organizationId")
	async StripeSubscription(
		@Req() req: Request,
		@Res() res: Response,
		@Query() query,
		@Param("organizationId") organizationId: string
	) {
		const organization = await organizations.getOrganization({
			organizationId,
		});

		const customerId = organization!.publicMetadata!.stripe_customer_id;

		return res.json(
			await subscriptionHandler({
				customerId,
				query,
				body: req.body,
			})
		);
	}
}
