module.exports = {
	content: [
		"./apps/barracuda-app/pages/**/*.{js,ts,jsx,tsx}",
		"./apps/barracuda-app/components/**/*.{js,ts,jsx,tsx}",
	],
	presets: [require("../../tailwind-workspace-preset.js")],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						ul: {
							p: {
								lineHeight: "1.25",
							},
						},
						ol: {
							p: {
								lineHeight: "1.25",
							},
						},
					},
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
