import { Gate, useSubscription } from "use-stripe-subscription";
export const TestStripe = () => {
	const { isLoaded, products, redirectToCheckout, redirectToCustomerPortal } =
		useSubscription();

	if (!isLoaded) {
		return null;
	}

	return (
		<>
			{products.map(({ product, prices }) => (
				<div key={product.id}>
					<h4>{product.name}</h4>
					<Gate unsubscribed>
						{prices.map((price) => (
							<button
								key={price.id}
								onClick={() => redirectToCheckout({ price: price.id })}
							>
								Purchase {price.unit_amount} {price.currency}
							</button>
						))}
					</Gate>
					<Gate product={product}>Active plan</Gate>
					<Gate product={product} negate>
						<button onClick={() => redirectToCustomerPortal({})}>
							Change plan
						</button>
					</Gate>
				</div>
			))}
		</>
	);
};
