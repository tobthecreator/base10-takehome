// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { withSentryConfig } = require("@sentry/nextjs");
const withNx = require("@nrwl/next/plugins/with-nx");
const WorkerPlugin = require("worker-plugin");

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
const sentryWebpackPluginOptions = {
	// Additional config options for the Sentry Webpack plugin. Keep in mind that
	// the following options are set automatically, and overriding them is not
	// recommended:
	//   release, url, org, project, authToken, configFile, stripPrefix,
	//   urlPrefix, include, ignore

	silent: true, // Suppresses all logs
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
};

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	// For developing "/blog", "/partnerships", or "/links"
	// trailingSlash: true,
	sentry: {
		hideSourceMaps: false,
	},
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	// Strict mode disabled in order to support react-beautiful-dnd on React 18. If you set this
	// to true, then drag and drop won't work in development, but should still work in prod
	// regardless since this flag is only for development environments
	reactStrictMode: false,
	images: {
		domains: [
			"pbs.twimg.com",
			"tailwindui.com",
			"storage.googleapis.com",
			"ipfs.io",
			"cloudflare-ipfs.com",
			"staging-assets.barracuda.io",
			"assets.barracuda.io",
			"images.jpgstoreapis.com",
			"image-optimizer.jpgstoreapis.com",
		],
	},
	experimental: {
		images: {
			allowFutureImage: true,
		},
	},
	webpack: (config, { isServer }) => {
		// config.plugins.push(
		// 	new webpack.EnvironmentPlugin(Object.keys(process.env))
		// );

		if (!isServer) {
			config.resolve.fallback.fs = false;
			config.resolve.fallback.tls = false;
			config.resolve.fallback.net = false;
			config.resolve.fallback.child_process = false;
		}

		config.plugins.push(
			...[
				new WorkerPlugin(),
				// new CopyPlugin([
				// 	{
				// 		from: path.resolve(__dirname, "../../node_modules/tdweb/dist/**/*"),
				// 		to: ".",
				// 		flatten: true,
				// 		copyUnmodified: true,
				// 		ignore: ["tdweb.js"],
				// 	},
				// ]),
			]
		);

		return config;
	},

	// 	return config;
	// },
	async redirects() {
		return [];
	},
};

const moduleExports = {
	...withNx(nextConfig),
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
