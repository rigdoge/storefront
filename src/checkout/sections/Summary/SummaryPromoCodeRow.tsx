import { type FC } from "react";
import { SummaryMoneyRow } from "./SummaryMoneyRow";
import { type Money as MoneyType } from "@/checkout/graphql";
import { TrashIcon } from "@/checkout/ui-kit/icons";

interface SummaryPromoCodeRowProps {
	label: string;
	money?: MoneyType | null;
	promoCode?: string;
	promoCodeId?: string;
	editable?: boolean;
	negative?: boolean;
}

export const SummaryPromoCodeRow: FC<SummaryPromoCodeRowProps> = ({
	label,
	money,
	_promoCode,
	_promoCodeId,
	editable = true,
	negative = false,
}) => {
	return (
		<div className="group relative">
			<SummaryMoneyRow label={label} money={money} negative={negative} className="text-sm" />
			{editable && (
				<button
					className="absolute -right-8 top-0 hidden p-2 text-muted-foreground hover:text-foreground group-hover:block"
					aria-label="Remove promo code"
				>
					<TrashIcon className="h-4 w-4" />
				</button>
			)}
		</div>
	);
};
