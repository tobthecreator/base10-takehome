import { Logger, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./modules/app/app.module";
import bodyParser = require("body-parser");
import { useContainer } from "class-validator";

// TODO this can all go minus whatever heroku link we deploy to and localhost
const whitelist = [
	"http://localhost:4200",
	"https://barracuda-staging-app.herokuapp.com",
	"http://barracuda.tech",
	"https://barracuda.tech",
	"http://barracuda.io",
	"https://barracuda.io",
	"http://brcda.io",
	"https://brcda.io",
	"https://app.barracuda.io",
	"https://barracuda-app.herokuapp.com",
];

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: {
			origin: (origin, callback) => {
				if (
					!origin ||
					whitelist.indexOf(origin) !== -1 ||
					process.env.NODE_ENV === "development"
				) {
					callback(null, true);
				} else {
					callback(new Error("Not allowed by CORS"));
				}
			},
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
			preflightContinue: false,
			optionsSuccessStatus: 204,
			credentials: true,
		},
		bodyParser: true,
		rawBody: true,
	});

	app.use(cookieParser());
	app.useBodyParser("json", { limit: "50mb" });
	app.useBodyParser<bodyParser.OptionsUrlencoded>("urlencoded", {
		limit: "50mb",
		extended: true,
	});
	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

	const port = process.env.PORT || 3333;

	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
