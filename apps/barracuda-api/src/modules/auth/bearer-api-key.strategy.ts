import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ApiKeyService } from "api-src/modules/apiKeys/apiKeys.service";
import { IPassportUser } from "libs/shared/interfaces";

@Injectable()
export class BearerApiKeyStrategy extends PassportStrategy(Strategy) {
	constructor(private apiKeyService: ApiKeyService) {
		super({ passReqToCallback: true });
	}
	async validate(req, token: string, done): Promise<IPassportUser> {
		if (!token) {
			console.log("No token passed, returning unauthorized error");
			return done(new UnauthorizedException(), false);
		}
		const fullApiKey = await this.apiKeyService.GetFullKey(token, "barracuda");
		if (fullApiKey) {
			req.organizationId = fullApiKey.organization;
			this.apiKeyService.Update(fullApiKey._id, { lastUsed: new Date() });
			return done(null, {
				id: fullApiKey._id,
				type: "ApiKey",
				data: fullApiKey,
			});
		}
		console.log("Invalid token, returning error");
		return done(new UnauthorizedException(), false);
	}
}
