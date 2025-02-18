import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
	workboxOptions: {
		runtimeCaching: [
			{
				urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif)$/,
				handler: "CacheFirst",
				options: {
					cacheName: "image-cache",
					expiration: {
						maxEntries: 50,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
					},
				},
			},
			{
				urlPattern: /^https:\/\/.*\.(css|js)$/,
				handler: "StaleWhileRevalidate",
				options: {
					cacheName: "static-resources",
					expiration: {
						maxEntries: 30,
						maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
					},
				},
			},
		],
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	experimental: {
		typedRoutes: false,
	},
	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
				? "export"
				: undefined,
};

export default withPWA(nextConfig);
