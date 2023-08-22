import { Logger } from "@nestjs/common";
import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { SocketService } from "./socket.service";
import { Server, Socket } from "socket.io";
import clerk from "@clerk/clerk-sdk-node";

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

@WebSocketGateway({
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
})
export class SocketGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	constructor(private socketService: SocketService) {}

	@WebSocketServer() public server: Server;
	private logger: Logger = new Logger("ChatGateway");

	afterInit(server: Server) {
		this.socketService.socket = server;
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	// TODO STARTER - make this work with our new auth provider
	async handleConnection(client: Socket, ...args: any[]) {
		const cookies = client.handshake.headers.cookie;

		if (!cookies) {
			client.disconnect();
			return;
		}

		const refreshToken = this.getRefreshToken(cookies ?? "");

		if (!refreshToken) {
			client.disconnect();
			return;
		}

		const session = await clerk.verifyToken(refreshToken);
		const user = await clerk.users.getUser(session.sub);

		const memberships = await clerk.users.getOrganizationMembershipList({
			userId: user.id,
		});

		if (!user) {
			client.disconnect();
			return;
		}

		if (memberships.length === 0) {
			client.disconnect();
			return;
		}

		const organizationIds = memberships.map((m) => {
			return m.organization.id;
		});

		await Promise.all([
			client.join(`uid.${user.id}`),
			...organizationIds.map((organizationId) => {
				return client.join(`oid.${organizationId}`);
			}),
		]);

		this.logger.log(
			`Client ${client.id} joined rooms ${[...client.rooms].join(", ")}`
		);

		this.logger.log(`total connected ${this.server.engine.clientsCount}`);
	}

	// TODO STARTER - make this work with our new auth provider

	getRefreshToken(cookies: string): string {
		if (cookies === "") return "";

		let pairs = cookies.split(";");

		let splittedPairs = pairs.map((cookie) => cookie.split("="));

		const cookieObj = splittedPairs.reduce(function (obj, cookie) {
			obj[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(
				cookie[1].trim()
			);

			return obj;
		}, {});

		return cookieObj["__session"];
	}
}
