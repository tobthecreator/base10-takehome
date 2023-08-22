import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class OpsBearerStrategy extends PassportStrategy(
	Strategy,
	"ops-bearer"
) {
	constructor() {
		super();
	}

	async validate(token: any, done) {
		if (token === process.env.RETOOL_API_KEY) {
			return done(null, true);
		}
		return done(new UnauthorizedException(), false);
	}
}
