export interface ICudaObject {
	readonly _id: string; // nanoId
	readonly organization: string; // organizationId

	// Date | string to help with redux serialization
	readonly createdAt: Date | string;
	readonly updatedAt: Date | string;
}
