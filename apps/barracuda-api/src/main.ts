import { LoggerConfig } from "api-src/winstonLogger";
import {
	Logger,
	ValidationPipe,
	VersioningType,
	VERSION_NEUTRAL,
} from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";
import { WinstonModule } from "nest-winston";
import { AppModule } from "./modules/app/app.module";
import bodyParser = require("body-parser");
import { useContainer } from "class-validator";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { TasksModule } from "./modules/tasks/tasks.module";

const logger: LoggerConfig = new LoggerConfig();

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
		logger: WinstonModule.createLogger(logger.console()),
	});
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
	});

	app.use(cookieParser());
	app.useBodyParser("json", { limit: "50mb" });
	app.useBodyParser<bodyParser.OptionsUrlencoded>("urlencoded", {
		limit: "50mb",
		extended: true,
	});
	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
	app.enableVersioning({
		type: VersioningType.HEADER,
		header: "Cuda-Version",
		defaultVersion: VERSION_NEUTRAL,
	});

	const apiConfig2023_03_10 = new DocumentBuilder()
		.setTitle("Cuda API 2023-03-10")
		.setVersion("2023-03-10")
		.addGlobalParameters({
			name: "Cuda-Version",
			in: "header",
			schema: { default: "2023-03-10" },
		})
		.addBearerAuth({ type: "http", scheme: "bearer" })
		.setBasePath(process.env.NEXT_PUBLIC_API_URL!)
		.addServer(process.env.NEXT_PUBLIC_API_URL!, "", {
			version: { default: "2023-03-10" },
		})
		// .addServer("https://1617-2600-1700-1b30-27b0-e16c-9637-54c8-800d.ngrok.io/")
		.build();

	let apiDocument2023_03_10 = SwaggerModule.createDocument(
		app,
		apiConfig2023_03_10,
		{
			include: [TasksModule],
		}
	);

	apiDocument2023_03_10["x-readme"] = {
		"samples-languages": ["curl", "node", "javascript"],
	};

	SwaggerModule.setup("docs", app, apiDocument2023_03_10, {
		swaggerOptions: {
			defaultModelsExpandDepth: 10,
			defaultModelExpandDepth: 10,
		},
	});

	const port = process.env.PORT || 3333;

	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
