import { type FC, type ReactNode } from "react";
import clsx from "clsx";
import { type Money as MoneyType } from "@/checkout/graphql";
import { getFormattedMoney } from "@/checkout/lib/utils/money";

interface SummaryMoneyRowProps {
	label: string;
	money?: MoneyType | null;
	negative?: boolean;
	className?: string;
	footer?: ReactNode;
}

export const SummaryMoneyRow: FC<SummaryMoneyRowProps> = ({
	label,
	money,
	negative = false,
	className,
	footer,
}) => {
	if (!money) return null;

	const formattedMoney = getFormattedMoney(money);
	const displayValue = negative ? `-${formattedMoney}` : formattedMoney;

	return (
		<div className={clsx("flex flex-col", className)}>
			<div className="flex justify-between">
				<p className="text-sm font-medium text-foreground">{label}</p>
				<p className="text-sm font-medium text-foreground">{displayValue}</p>
			</div>
			{footer && <div className="mt-1">{footer}</div>}
		</div>
	);
};
