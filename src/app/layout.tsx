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
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh" suppressHydrationWarning>
			<body className={`${inter.className} min-h-dvh`}>
				<ThemeProvider>
					{children}
					<DraftModeNotification />
				</ThemeProvider>
			</body>
		</html>
	);
}
