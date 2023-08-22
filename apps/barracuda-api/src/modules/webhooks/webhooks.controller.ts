import { WEBHOOKS } from "libs/shared/constants";
import {
	Controller,
	Headers,
	Injectable,
	Post,
	RawBodyRequest,
	Req,
	Res,
} from "@nestjs/common";
import { Response } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2022-11-15",
});
import clerk from "@clerk/clerk-sdk-node";

@Injectable()
@Controller({ path: WEBHOOKS })
export class WebhooksController {
	constructor() {}

	@Post("/stripe")
	async StripeWebhook(
		@Req() req: RawBodyRequest<Request>,
		@Res() res: Response,
		@Headers("stripe-signature") stripe_sig
	) {
		console.log("Hit webhook");
		let event;

		const raw = req.rawBody || ""; // returns a `Buffer`

		try {
			event = stripe.webhooks.constructEvent(
				raw,
				stripe_sig,
				process.env.STRIPE_ENDPOINT_SECRET!
			);
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`);
		}

		// Handle the event
		switch (event.type) {
			case "checkout.session.completed":
				const orgId = event.data.object.client_reference_id;

				if (orgId) {
					await clerk.organizations.updateOrganization(orgId, {
						publicMetadata: { stripe_customer_id: event.data.object.customer },
					});
				}
				break;
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		return res.json({ received: true });
	}
}
