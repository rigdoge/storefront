/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
import { type FC } from "react";
import { type OrderLineFragment, type CheckoutLineFragment } from "@/checkout/graphql";
import { getFormattedMoney } from "@/checkout/lib/utils/money";

export type SummaryLine = CheckoutLineFragment | OrderLineFragment;

interface SummaryItemProps {
	line: SummaryLine;
	editable?: boolean;
}

export const SummaryItem: FC<SummaryItemProps> = ({ line, editable = true }) => {
	const { quantity, totalPrice } = line;
	// @ts-expect-error - GraphQL type definitions need to be updated
	const productName = line.variant?.product?.name || "";
	// @ts-expect-error - GraphQL type definitions need to be updated
	const productImage = line.variant?.product?.thumbnail;
	const isOrderConfirmation = !editable;

	return (
		<li className="flex gap-4">
			<div className="relative h-24 w-24 shrink-0 overflow-hidden rounded border border-neutral-200 dark:border-neutral-800">
				{productImage?.url && (
					<img src={productImage.url} alt={productName} className="h-full w-full object-contain" />
				)}
			</div>
			<div className="flex flex-1 flex-col justify-between">
				<div className="flex justify-between">
					<div>
						<h4 className="text-sm font-medium text-foreground">{productName}</h4>
						<p className="mt-1 text-sm text-muted-foreground">Quantity: {quantity}</p>
					</div>
					<div className="text-right">
						<p className={`text-sm font-medium text-foreground ${isOrderConfirmation ? "text-base" : ""}`}>
							{getFormattedMoney(totalPrice?.gross)}
						</p>
						{totalPrice?.gross && <p className="text-xs text-muted-foreground">Including tax</p>}
					</div>
				</div>
			</div>
		</li>
	);
};
