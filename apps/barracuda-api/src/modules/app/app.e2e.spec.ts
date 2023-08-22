import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "api-src/modules/app/app.module";

describe("AppController (e2e)", () => {
	let httpServer: any;
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		httpServer = app.getHttpServer();
	});

	afterAll(async () => {
		await app.close();
	});

	it("/ (GET)", async () => {
		const response = await request(httpServer).get("/");

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Big Airplane did the Hindenburg");
	});
});
