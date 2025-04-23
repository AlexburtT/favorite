import { defineConfig } from "vite";

export default defineConfig({
	server: {
		port: 8000,
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		// setupFiles: './tests/setup.js'
	},
});
