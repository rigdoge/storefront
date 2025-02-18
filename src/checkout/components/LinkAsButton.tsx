import { type ReactNode } from "react";
import clsx from "clsx";

interface Props {
	children: ReactNode;
	href: string;
	variant?: "primary" | "secondary" | "tertiary";
}

export const LinkAsButton = ({ children, href, variant = "primary" }: Props) => {
	const classes = clsx(
		"inline-flex h-10 items-center justify-center whitespace-nowrap rounded border active:outline-none font-bold",
		{
			"bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70 hover:aria-disabled:bg-primary/70 px-4":
				variant === "primary",
			"border-muted hover:border-muted/70 hover:bg-muted active:bg-muted disabled:border-muted/30 aria-disabled:border-muted/30 bg-transparent disabled:bg-transparent aria-disabled:bg-transparent px-4":
				variant === "secondary",
			"h-auto border-none bg-transparent p-0": variant === "tertiary",
		},
	);

	return (
		<a href={href} className={classes}>
			{children}
		</a>
	);
};
