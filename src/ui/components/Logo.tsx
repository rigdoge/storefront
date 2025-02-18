"use client";

import { LinkWithChannel } from "../atoms/LinkWithChannel";

export function Logo() {
	return (
		<LinkWithChannel href="/" className="flex items-center gap-2">
			<span className="text-lg font-bold text-foreground">Saleor Store</span>
		</LinkWithChannel>
	);
}
