import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { type Metadata } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import { ThemeProvider } from "@/ui/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
	manifest: "/manifest.json",
	themeColor: "#000000",
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Saleor Store",
	},
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/icons/icon-512.svg" />
				<link rel="apple-touch-icon" href="/icons/icon-512.svg" />
				<meta name="theme-color" content="#000000" />
			</head>
			<body className={`${inter.className} min-h-dvh`}>
				<ThemeProvider>
					{children}
					<DraftModeNotification />
				</ThemeProvider>
			</body>
		</html>
	);
}
