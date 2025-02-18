import { DummyPaymentElement } from "./DummyPayment/DummyPaymentElement";
import { type PaymentGateway } from "@/checkout/graphql";

interface PaymentMethodsProps {
	gateways?: PaymentGateway[];
}

export const PaymentMethods = ({ gateways = [] }: PaymentMethodsProps) => {
	if (!gateways || gateways.length === 0) {
		return (
			<div className="rounded-lg border p-4 text-center text-gray-600">No payment methods available.</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{gateways.map((gateway) => {
				if (gateway.id === "mirumee.payments.dummy") {
					return <DummyPaymentElement key={gateway.id} gateway={gateway} />;
				}
				return null;
			})}
		</div>
	);
};
