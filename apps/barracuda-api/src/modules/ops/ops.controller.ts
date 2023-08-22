import { Controller, UseGuards } from "@nestjs/common";
import { OPS } from "libs/shared/constants";
import { OpsAuthGuard } from "../auth/auth.guards";
import { OpsService } from "./ops.service";

@Controller({ path: OPS })
@UseGuards(OpsAuthGuard)
export class OpsController {
	constructor(private opsService: OpsService) {}
}
