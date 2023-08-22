import {
	ExecutionContext,
	UnauthorizedException,
	mixin,
	Injectable,
	CanActivate,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

// Scenarios
// 1. Route with HybridAuthGuard("api") - Person passes invalid or no bearer token - 401 ERROR - Caught by Bearer Strategy
// 2. Route with HybridAuthGuard("api") - Person passes valid bearer token - 200 Success - Return true from "api" if statement in guard
// 3. Route with HybridAuthGuard("jwt") - Person passes any bearer token, no cookies - 401 ERROR - Caught by "!req.cookies" if statement in guard
// 4. Route with HybridAuthGuard("jwt") - Person passes invalid cookies, no bearer token - 401 ERROR - Caught by Jwt & Jwt Refresh Strategies
// 5. Route with HybridAuthGuard("jwt") - Person passes valid cookies - 200 Success - Return true from the existence of valid cookies
// 6. Route with HybridAuthGuard("jwt") - Person passes valid cookies, and bearer token - 200 success because the strategies all fall back to one another, so bearer key is ignored
// 7. Route with HybridAuthGuard("hybrid") - Both success scenarios above will work. If no cookie and no valid bearer, 401 ERROR

/**
 * Types specify different access methods for a route:
 * "jwt" - Accessible only via jwt authentication cookies issued to the barracuda app
 * "api" - Accessible only via Bearer Auth, using an API key issued in the barracuda app
 * "hybrid" - Both methods will work
 *
 * @param type
 * @returns boolean
 */
export const HybridAuthGuard = (type: "jwt" | "api" | "hybrid") => {
	class JwtAuthGuard extends AuthGuard(["bearer", "jwt"]) {
		constructor() {
			super();
		}

		async canActivate(context: ExecutionContext) {
			const canActivate: boolean | Observable<boolean> =
				await super.canActivate(context);
			const req = context.switchToHttp().getRequest();

			if (!canActivate) {
				return false;
			}

			// API Key Flow
			// Always catch here when a route is API-only
			// If we've received a valid user of type "ApiKey", then return true, simple as that
			if (type === "api") {
				if (req.user.type === "ApiKey") {
					return true;
				}
				return false;
			}

			// Hybrid Flow
			// If it's a hybrid, only return true here if the attached user came from an API Key
			// Otherwise, we put them through the jwt flows below
			if (type === "hybrid" && req.user.type === "ApiKey") {
				return true;
			}

			// JWT Flow
			// This is pretty much the same as hybrid for now, but leaving the clear separation just in case we need to add more complex JWT stuff in the future
			return true;
		}

		handleRequest(err, user, info) {
			// You can throw an exception based on either "info" or "err" arguments
			if (err || !user) {
				throw err || new UnauthorizedException();
			}

			return user;
		}
	}

	const guard = mixin(JwtAuthGuard);
	return guard;
};

/*
	The Authenticated user has the permissions provided as a param
*/
@Injectable()
export class AdminGuard implements CanActivate {
	constructor() {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();

		return request.user.data.membership.role === "admin";
	}
}

@Injectable()
export class OpsAuthGuard extends AuthGuard("ops-bearer") {}
