import { CreateOrganization } from "@clerk/nextjs";

const CreateOrganizationPage = () => (
	<CreateOrganization routing="virtual" path="/create-organization" />
);

export default CreateOrganizationPage;
