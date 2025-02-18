import { type FC, type ReactNode, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: ReactNode;
	variant?: "primary" | "secondary" | "tertiary";
	ariaLabel?: string;
	ariaDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
	label,
	className,
	variant = "primary",
	disabled = false,
	children: _children,
	type = "button",
	ariaLabel,
	ariaDisabled,
	...rest
}) => {
	const classes = clsx(
		"inline-flex h-10 items-center justify-center whitespace-nowrap rounded border active:outline-none",
		{
			"bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70 hover:aria-disabled:bg-primary/70 px-4":
				variant === "primary",
			"border-muted hover:border-muted/70 hover:bg-muted active:bg-muted disabled:border-muted/30 aria-disabled:border-muted/30 bg-transparent disabled:bg-transparent aria-disabled:bg-transparent px-4":
				variant === "secondary",
			"h-auto border-none bg-transparent p-0": variant === "tertiary",
		},
		className,
	);

	return (
		<button
			aria-label={ariaLabel}
			aria-disabled={ariaDisabled}
			disabled={disabled}
			className={classes}
			type={type === "submit" ? "submit" : "button"}
			{...rest}
		>
			{typeof label === "string" ? <span className="font-semibold">{label}</span> : label}
		</button>
	);
};
