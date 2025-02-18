import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	register: true,
	skipWaiting: true,
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
