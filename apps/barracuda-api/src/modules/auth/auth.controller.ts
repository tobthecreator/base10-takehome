import { AUTH } from "libs/shared/constants";
import {
	Body,
	Controller,
	Get,
	Injectable,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminGuard, HybridAuthGuard } from "api-src/modules/auth/auth.guards";

// @ApiBearerAuth()
@ApiTags("Auth")
@Injectable()
@Controller({ path: AUTH })
export class AuthController {
	constructor() {}

	@Get("/")
	async TestGet() {
		return { testGet: true };
	}

	@UseGuards(HybridAuthGuard("jwt"), AdminGuard)
	@Post("")
	async TestPost(
		// @Actor() actor: IEventActor,
		// @Body() body: CreateAuthDTO
		@Body() body: any
	): Promise<any> {
		console.log("Hit test post");
		return { testPost: true };
	}
}
