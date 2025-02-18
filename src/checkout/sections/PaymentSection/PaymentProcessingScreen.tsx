import { BarLoader } from "react-spinners";
import React, { type ReactNode, useState, useCallback, useMemo } from "react";
import { Title } from "@/checkout/components";
import { createSafeContext } from "@/checkout/providers/createSafeContext";
import { getQueryParams } from "@/checkout/lib/utils/url";

interface PaymentProcessingContextConsumerProps {
	setIsProcessingPayment: (processing: boolean) => void;
}

const [usePaymentProcessingScreen, Provider] = createSafeContext<PaymentProcessingContextConsumerProps>();

export const PaymentProcessingScreen = ({ children }: { children: ReactNode }) => {
	const getInitialProcessing = () => {
		const { processingPayment } = getQueryParams();
		return !!processingPayment;
	};

	const [isProcessingPayment, setIsProcessingPayment] = useState(getInitialProcessing());

	const handleSetProcessing = useCallback((processing: boolean) => {
		setIsProcessingPayment(processing);
	}, []);

	return (
		<Provider value={useMemo(() => ({ setIsProcessingPayment: handleSetProcessing }), [handleSetProcessing])}>
			{isProcessingPayment && (
				<div className="fixed inset-0 z-50 flex flex-col items-center bg-background/80 backdrop-blur-md">
					<div className="flex flex-grow flex-col items-center justify-center gap-6 pb-40">
						<Title className="text-foreground">Almost done...</Title>
						<div className="w-48">
							<BarLoader width="100%" color="currentColor" className="text-primary" />
						</div>
						<p className="text-sm text-muted-foreground">Processing your payment</p>
					</div>
				</div>
			)}
			{children}
		</Provider>
	);
};

export { usePaymentProcessingScreen };
