import { AppProps } from "next/app";
import DashboardWrapper from "../../components/app/wrappers/DashboardWrapper";
import { OrganizationProfile } from "@clerk/nextjs";
import { TestStripe } from "app-components/app/TestStripe";

const Dashboard = ({ pageProps }: AppProps) => {
	return (
		<DashboardWrapper>
			<div>dashboard module</div>
			<OrganizationProfile routing="virtual" path="/dashboard" />
			{/* <TestStripe /> */}
		</DashboardWrapper>
	);
};

export default Dashboard;
