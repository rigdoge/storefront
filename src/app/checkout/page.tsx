import { invariant } from "ts-invariant";
import { RootWrapper } from "./pageWrapper";
import { Logo } from "@/ui/components/Logo";

export const metadata = {
	title: "Checkout · Saleor Storefront example",
};

export default function CheckoutPage({
	searchParams,
}: {
	searchParams: { checkout?: string; order?: string };
}) {
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	return (
		<div className="min-h-dvh bg-background">
			<section className="mx-auto flex min-h-dvh max-w-7xl flex-col p-8">
				<Logo />
				<h1 className="mt-8 text-3xl font-bold text-foreground">Checkout</h1>

				<section className="mb-12 mt-6 flex-1">
					<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
				</section>
			</section>
		</div>
	);
}
