import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SocketGateway } from "./socket.gateway";
import { SocketService } from "./socket.service";

@Global()
@Module({
	imports: [MongooseModule],
	controllers: [],
	providers: [SocketService, SocketGateway],
	exports: [SocketService],
})
export class SocketModule {}
