import { type ReactNode } from "react";
import { AuthProvider } from "@/ui/components/AuthProvider";
import { ThemeProvider } from "@/ui/providers/ThemeProvider";

export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<main>
			<ThemeProvider>
				<AuthProvider>{props.children}</AuthProvider>
			</ThemeProvider>
		</main>
	);
}
