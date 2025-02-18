"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="relative rounded-md p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800"
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
		>
			<div className="relative h-5 w-5">
				<Sun className="absolute h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</div>
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
