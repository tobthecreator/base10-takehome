import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import clerk from "@clerk/clerk-sdk-node";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor() {
		super({
			jwtFromRequest: (req) => {
				if (!req || !req.cookies) return null;
				return req.cookies["__session"];
			},
			ignoreExpiration: false,
			secretOrKey: process.env.CLERK_JWT_KEY,
			passReqToCallback: true,
		});
	}

	async validate(req, { sub: userId }): Promise<any> {
		const user = await clerk.users.getUser(userId);
		const memberships = await clerk.users.getOrganizationMembershipList({
			userId,
		});

		// We only allow one org per user
		const membership = memberships[0];

		// Attach organizationId to request context
		req.organizationId = membership.organization.id;

		return {
			id: user.id,
			type: "User",
			data: { ...user, membership },
		};
	}
}
