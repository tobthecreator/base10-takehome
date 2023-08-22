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

	async handleConnection(client: Socket) {
		await Promise.all([client.join(`main`)]);

		this.logger.log(
			`Client ${client.id} joined rooms ${[...client.rooms].join(", ")}`
		);

		this.logger.log(`total connected ${this.server.engine.clientsCount}`);
	}
}
