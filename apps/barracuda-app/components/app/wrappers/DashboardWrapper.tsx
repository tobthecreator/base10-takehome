import { ReactNode } from "react";
import { persistor, store } from "../../../lib/redux/dashboard/dashboard.store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import DashboardLayoutContainer from "../layout/DashboardLayoutContainer";
import DashboardSynchronizer from "../../../lib/redux/dashboard/dashboard.synchronizer";
import { SubscriptionProvider } from "use-stripe-subscription";
import { useOrganization } from "@clerk/nextjs";

// used for our customers
const DashboardWrapper = ({ children }: { children: ReactNode }) => {
	const { organization } = useOrganization();

	if (!organization) {
		return <>Loading</>;
	}

	return (
		<SubscriptionProvider
			stripePublishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
			endpoint={`http://localhost:3333/stripe/subscription/${organization.id}`}
		>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<DashboardSynchronizer />
					{/* 
					We use this function syntax to address a bug in redux-persist that breaks SSR and all of our meta tags
					Reference: https://github.com/vercel/next.js/issues/8240
					*/}

					<DashboardLayoutContainer>{children}</DashboardLayoutContainer>
				</PersistGate>
			</Provider>
		</SubscriptionProvider>
	);
};

export default DashboardWrapper;
