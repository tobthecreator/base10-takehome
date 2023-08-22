import * as mongoose from "mongoose";
import { DATABASE_CONNECTION } from "libs/shared/constants";
import { GetMongoURI } from "../app/app.module";

export const mongooseProviders = [
	{
		provide: DATABASE_CONNECTION,
		useFactory: (): Promise<typeof mongoose> => mongoose.connect(GetMongoURI()),
	},
];
