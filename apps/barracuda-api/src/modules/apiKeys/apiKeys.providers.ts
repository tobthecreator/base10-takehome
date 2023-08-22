import { ApiKey } from "api-src/models/ApiKey";
import { DATABASE_CONNECTION, API_KEY_MODEL } from "libs/shared/constants";

export const ApiKeyProviders = [
	{
		provide: API_KEY_MODEL,
		useFactory: () => ApiKey,
		inject: [DATABASE_CONNECTION],
	},
];
