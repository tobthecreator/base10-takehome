import { Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

export class LogService {
	constructor(
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
	) {}

	private readonly context = "client-logs";

	AddLog(clientLogMessage: string) {
		if (process.env.NEXT_PUBLIC_AUTOMATIC_MONGODB_DATABASE === "test") return;

		this.logger.log({
			level: "info",
			message: clientLogMessage,
			context: this.context,
		});
	}

	AddError(clientErrorMessage: string) {
		if (process.env.NEXT_PUBLIC_AUTOMATIC_MONGODB_DATABASE === "test") return;

		this.logger.log({
			level: "error",
			message: clientErrorMessage,
			context: this.context,
		});
	}
}
