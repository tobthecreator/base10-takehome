import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getData(): { message: string } {
		return { message: "Big Airplane did the Hindenburg" };
	}
}
