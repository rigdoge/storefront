import { type FC } from "react";
import clsx from "clsx";
import { SummaryItem, type SummaryLine } from "./SummaryItem";
import { PromoCodeAdd } from "./PromoCodeAdd";
import { SummaryMoneyRow } from "./SummaryMoneyRow";
import { SummaryPromoCodeRow } from "./SummaryPromoCodeRow";
import { ChevronDownIcon } from "@/checkout/ui-kit/icons";
import { getFormattedMoney } from "@/checkout/lib/utils/money";
import { Title } from "@/checkout/components";
import { type GiftCardFragment, type Money as MoneyType } from "@/checkout/graphql";
import { type GrossMoney, type GrossMoneyWithTax } from "@/checkout/lib/globalTypes";

interface SummaryProps {
	editable?: boolean;
	lines: SummaryLine[];
	totalPrice?: GrossMoneyWithTax;
	subtotalPrice?: GrossMoney;
	giftCards?: GiftCardFragment[];
	voucherCode?: string | null;
	discount?: MoneyType | null;
	shippingPrice: GrossMoney;
}

export const Summary: FC<SummaryProps> = ({
	editable = true,
	lines,
	totalPrice,
	subtotalPrice,
	giftCards = [],
	voucherCode,
	discount,
	shippingPrice,
}) => {
	const summaryLines = lines.filter((line) => line.quantity > 0);

	const isOrderConfirmation = !editable;

	return (
		<section className="summary">
			<div className="sticky top-8">
				<div className="rounded border border-neutral-200 bg-background p-4 dark:border-neutral-800">
					<div className="flex justify-between">
						<Title>Summary</Title>
						{editable && (
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">
									{summaryLines.length} {summaryLines.length === 1 ? "item" : "items"}
								</span>
								<ChevronDownIcon />
							</div>
						)}
					</div>
					<ul className="mt-6 flex flex-col gap-4">
						{summaryLines.map((line) => (
							<SummaryItem editable={editable} key={line.id} line={line} />
						))}
					</ul>
					{editable && <PromoCodeAdd />}
					<div className="mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-800">
						<SummaryMoneyRow
							label="Subtotal"
							money={subtotalPrice?.gross}
							className={clsx({
								"text-sm": !isOrderConfirmation,
							})}
						/>
						{voucherCode && (
							<SummaryPromoCodeRow
								editable={editable}
								label="Discount"
								money={discount}
								negative
								promoCode={voucherCode}
							/>
						)}
						{giftCards.map(({ id, last4CodeChars, currentBalance }) => (
							<SummaryPromoCodeRow
								editable={editable}
								key={id}
								label={`Gift Card (${last4CodeChars})`}
								money={currentBalance}
								negative
								promoCodeId={id}
							/>
						))}
						<SummaryMoneyRow
							label="Shipping"
							money={shippingPrice.gross}
							className={clsx({
								"text-sm": !isOrderConfirmation,
							})}
						/>
						<SummaryMoneyRow
							className="border-t border-neutral-200 pt-4 dark:border-neutral-800"
							label="Total"
							money={totalPrice?.gross}
							footer={
								totalPrice?.tax && (
									<div className="text-xs text-muted-foreground">
										Including {getFormattedMoney(totalPrice.tax)} tax
									</div>
								)
							}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
