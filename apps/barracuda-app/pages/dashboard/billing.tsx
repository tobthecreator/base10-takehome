// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useOrganization } from "@clerk/nextjs";

const BillingPage = () => {
	const { organization } = useOrganization();

	return (
		<>
			<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
			<stripe-pricing-table
				pricing-table-id="prctbl_1MtvvTHbrtZqLyR0GCpS7wss"
				publishable-key="pk_test_51LV0cjHbrtZqLyR0CxoKD3WKMn6FhycZNqGZzSWIGGOp3dFRMnOJkVzVoR9H6JMpVPsCwFhSFAXOc2CJBw3uRBBz00dxtP0RXc"
				client-reference-id={organization?.id}
			></stripe-pricing-table>
		</>
	);
};

export default BillingPage;
