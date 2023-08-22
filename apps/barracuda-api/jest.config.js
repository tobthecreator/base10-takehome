module.exports = {
	displayName: "barracuda-api",
	preset: "../../jest.preset.js",
	globals: {
		"ts-jest": {
			tsconfig: "<rootDir>/tsconfig.spec.json",
		},
	},
	globalSetup: "./src/test/globalSetup.ts",
	globalTeardown: "./src/test/globalTeardown.ts",
	testEnvironment: "node",
	transform: {
		"^.+\\.[tj]s$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory: "../../coverage/apps/barracuda-api",
};
