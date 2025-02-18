import { type FC, useState } from "react";
import { Button } from "@/checkout/components";

export const PromoCodeAdd: FC = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="mt-6">
			{isExpanded ? (
				<div className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="Enter promo code"
						className="w-full rounded border border-neutral-200 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-neutral-300 focus:outline-none dark:border-neutral-800 dark:focus:border-neutral-700"
					/>
					<div className="flex gap-2">
						<Button variant="secondary" className="flex-1" onClick={() => setIsExpanded(false)}>
							Cancel
						</Button>
						<Button className="flex-1">Apply</Button>
					</div>
				</div>
			) : (
				<button
					onClick={() => setIsExpanded(true)}
					className="text-sm text-muted-foreground hover:text-foreground"
				>
					Do you have a gift card or discount code?
				</button>
			)}
		</div>
	);
};
