import { SignUp, useOrganization } from "@clerk/nextjs";

const SignUpPage = () => {
	const { organization } = useOrganization();

	const redirectUrl = organization
		? "/dashboard"
		: "/create-organization?ref=sign-up";

	return (
		<SignUp
			path="/sign-up"
			routing="path"
			signInUrl="/sign-in"
			redirectUrl={redirectUrl}
		/>
	);
};

export default SignUpPage;
