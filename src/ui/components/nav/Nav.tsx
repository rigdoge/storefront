import { Suspense } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav className="flex flex-1 items-center justify-end gap-4 md:gap-8">
			<div className="hidden items-center gap-4 md:flex">
				<NavLinks channel={channel} />
			</div>
			<div className="flex items-center gap-4">
				<ThemeToggle />
				<UserMenuContainer />
			</div>
			<div className="flex items-center">
				<Suspense fallback={<div className="w-6" />}>
					<CartNavItem channel={channel} />
				</Suspense>
			</div>
			<MobileMenu>
				<NavLinks channel={channel} />
			</MobileMenu>
		</nav>
	);
};
