import { paymentMethodToComponent } from "./supportedPaymentApps";
import { PaymentSectionSkeleton } from "@/checkout/sections/PaymentSection/PaymentSectionSkeleton";
import { usePayments } from "@/checkout/sections/PaymentSection/usePayments";
import { useCheckoutUpdateState } from "@/checkout/state/updateStateStore";
import { type ParsedPaymentGateways } from "@/checkout/sections/PaymentSection/types";

const uniquePaymentGateways = (gateways: ParsedPaymentGateways): ParsedPaymentGateways => {
  const seen = new Set();
  return [...gateways].filter((gateway) => {
    const key = gateway.id;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const PaymentMethods = () => {
	const { availablePaymentGateways, fetching } = usePayments();
	const {
		changingBillingCountry,
		updateState: { checkoutDeliveryMethodUpdate },
	} = useCheckoutUpdateState();

	// delivery methods change total price so we want to wait until the change is done
	if (changingBillingCountry || fetching || checkoutDeliveryMethodUpdate === "loading") {
		return <PaymentSectionSkeleton />;
	}

	const uniqueGateways = uniquePaymentGateways(availablePaymentGateways);

	return (
		<div className="gap-y-8">
			{uniqueGateways.map((gateway) => {
				if (!gateway) return null;
				const Component = paymentMethodToComponent[gateway.id];
				if (!Component) return null;
				return (
					<Component
						key={gateway.id}
						// @ts-expect-error -- gateway matches the id but TypeScript doesn't know that
						config={gateway}
					/>
				);
			})}
		</div>
	);
};
