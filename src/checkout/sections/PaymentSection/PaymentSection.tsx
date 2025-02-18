import React from "react";
import { PaymentMethods } from "./PaymentMethods";
import { usePayments } from "./usePayments";
import { Divider } from "@/checkout/components/Divider";
import { Title } from "@/checkout/components/Title";

export const PaymentSection = () => {
	const { availablePaymentGateways } = usePayments();

	return (
		<>
			<Divider />
			<div className="py-4" data-testid="paymentMethods">
				<Title>Payment methods</Title>
				<PaymentMethods gateways={availablePaymentGateways} />
			</div>
		</>
	);
};
