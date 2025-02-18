import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { type Metadata, type Viewport } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import { ThemeProvider } from "@/ui/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
	metadataBase: new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:3000"),
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Saleor Store",
	},
};

export const viewport: Viewport = {
	themeColor: "#000000",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/icons/icon-512.svg" />
				<link rel="apple-touch-icon" href="/icons/icon-512.svg" />
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
