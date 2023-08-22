import { LoggerOptions, format, transports } from "winston";
import * as CoralogixWinston from "coralogix-logger-winston";
import { Constants } from "coralogix-logger";

Constants.CORALOGIX_LOG_URL = "https://api.coralogix.com/logs";

// global configuration for coralogix
var config = {
	privateKey: process.env.CORALOGIX_PRIVATE_KEY,
	applicationName: `barracuda-app-${process.env.LOG_ENV}`,
	subsystemName: "API",
};

CoralogixWinston.CoralogixTransport.configure(config);

export class LoggerConfig {
	private readonly options: LoggerOptions;

	constructor() {
		this.options = {
			exitOnError: false,
			format: format.combine(
				format.colorize({ all: process.env.NODE_ENV !== "production" }),
				format.timestamp(),
				format.printf((msg) => {
					return `[${process.env.LOG_ENV}] ${msg.timestamp} [${msg.level}] - ${msg.message}`;
				})
			),
			transports: [
				new transports.Console({ level: "debug" }), // alert > error > warning > notice > info > debug
				// @ts-ignore
				new CoralogixWinston.CoralogixTransport({
					category: "~Logs~",
					handleExceptions: true,
				}),
			],
		};
	}

	public console(): object {
		return this.options;
	}
}
