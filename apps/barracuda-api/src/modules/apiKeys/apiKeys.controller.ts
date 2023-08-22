import {
	Body,
	Controller,
	Get,
	Injectable,
	Param,
	Post,
	UseGuards,
	Put,
	Delete,
} from "@nestjs/common";
import { API_KEY } from "libs/shared/constants";
import { IApiKey, IEventActor, TUpdateApiKey } from "libs/shared/interfaces";
import { AdminGuard, HybridAuthGuard } from "api-src/modules/auth/auth.guards";
import { ApiKeyService } from "api-src/modules/apiKeys/apiKeys.service";
import { Actor, OrganizationId } from "api-src/modules/auth/auth.decorators";

@Injectable()
@Controller({ path: API_KEY })
export class ApiKeyController {
	constructor(private apiKeysService: ApiKeyService) {}

	@UseGuards(HybridAuthGuard("jwt"))
	@Get("/all")
	async FetchProjectKeys(@OrganizationId() organizationId: string) {
		return this.apiKeysService.FetchProjectKeys(organizationId);
	}

	@UseGuards(HybridAuthGuard("jwt"), AdminGuard)
	@Post("/")
	async Create(
		@Body() newApiKey: IApiKey,
		@OrganizationId() organizationId: string
	) {
		return this.apiKeysService.Create({
			...newApiKey,
			organization: organizationId,
		});
	}

	@UseGuards(HybridAuthGuard("jwt"), AdminGuard)
	@Put("/:apiKeyId")
	async Update(
		@Actor() actor: IEventActor,
		@Body() update: TUpdateApiKey,
		@Param("apiKeyId") apiKeyId: string
	) {
		return this.apiKeysService.Update(apiKeyId, update, actor);
	}

	@UseGuards(HybridAuthGuard("jwt"))
	@Delete("/:apiKeyId")
	async DeleteApiKey(
		@Actor() actor: IEventActor,
		@Param("apiKeyId") apiKeyId: string
	) {
		return this.apiKeysService.Delete(apiKeyId, actor);
	}

	@UseGuards(HybridAuthGuard("jwt"))
	@Get("/:apiKeyId")
	async GetApiKey(@Param("apiKeyId") apiKeyId: string) {
		return this.apiKeysService.FindById(apiKeyId);
	}

	@UseGuards(HybridAuthGuard("jwt"))
	@Post("/:apiKeyId/regenerate")
	async RegenerateApiKey(@Param("apiKeyId") apiKeyId: string) {
		return this.apiKeysService.RegenerateApiKey(apiKeyId);
	}
}
