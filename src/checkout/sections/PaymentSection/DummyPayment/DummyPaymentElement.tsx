import React, { useState } from "react";
import { useMutation, type TypedDocumentNode } from "urql";
import { type PaymentGateway } from "@/checkout/graphql";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useCheckoutComplete } from "@/checkout/hooks/useCheckoutComplete";
import { useAlerts } from "@/checkout/hooks/useAlerts";
import { usePaymentProcessingScreen } from "@/checkout/sections/PaymentSection/PaymentProcessingScreen";

interface CheckoutPaymentCreateMutation {
	checkoutPaymentCreate: {
		payment: {
			id: string;
			gateway: string;
			token: string;
			chargeStatus: string;
		} | null;
		errors: Array<{
			field: string | null;
			message: string;
			code: string;
		}>;
	};
}

interface CheckoutPaymentCreateVariables {
	checkoutId: string;
	input: {
		gateway: string;
		token: string;
		amount: number;
	};
}

const CheckoutPaymentCreateDocument: TypedDocumentNode<
	CheckoutPaymentCreateMutation,
	CheckoutPaymentCreateVariables
> = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "CheckoutPaymentCreate" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "checkoutId" } },
					type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "PaymentInput" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "checkoutPaymentCreate" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "checkoutId" } },
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "input" },
								value: { kind: "Variable", name: { kind: "Name", value: "input" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "payment" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{ kind: "Field", name: { kind: "Name", value: "gateway" } },
											{ kind: "Field", name: { kind: "Name", value: "token" } },
											{ kind: "Field", name: { kind: "Name", value: "chargeStatus" } },
										],
									},
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "errors" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "field" } },
											{ kind: "Field", name: { kind: "Name", value: "message" } },
											{ kind: "Field", name: { kind: "Name", value: "code" } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
};

interface CheckoutCompleteMutation {
	checkoutComplete: {
		order: {
			id: string;
		} | null;
		errors: Array<{
			field: string | null;
			message: string;
			code: string;
		}>;
	};
}

interface CheckoutCompleteVariables {
	checkoutId: string;
}

const CheckoutCompleteDocument: TypedDocumentNode<CheckoutCompleteMutation, CheckoutCompleteVariables> = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "CheckoutComplete" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "checkoutId" } },
					type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "checkoutComplete" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "checkoutId" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "order" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
									},
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "errors" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "field" } },
											{ kind: "Field", name: { kind: "Name", value: "message" } },
											{ kind: "Field", name: { kind: "Name", value: "code" } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
};

interface DummyPaymentElementProps {
	gateway: PaymentGateway;
}

export const DummyPaymentElement: React.FC<DummyPaymentElementProps> = ({ gateway }) => {
	const { checkout } = useCheckout();
	const [, checkoutPaymentCreate] = useMutation<
		CheckoutPaymentCreateMutation,
		CheckoutPaymentCreateVariables
	>(CheckoutPaymentCreateDocument);
	const [, checkoutComplete] = useMutation<CheckoutCompleteMutation, CheckoutCompleteVariables>(
		CheckoutCompleteDocument,
	);
	const { onCheckoutComplete } = useCheckoutComplete();
	const { showSuccess, showErrors } = useAlerts();
	const [isProcessing, setIsProcessing] = useState(false);
	const { setIsProcessingPayment } = usePaymentProcessingScreen();

	const handlePayment = async () => {
		if (isProcessing) return;

		try {
			setIsProcessing(true);
			setIsProcessingPayment(true);
			console.log("Starting payment process...");

			// Validate checkout data
			if (!checkout?.id) {
				throw new Error("Checkout ID is missing");
			}

			if (!checkout?.totalPrice?.gross?.amount) {
				throw new Error("Invalid checkout amount");
			}

			console.log("Checkout ID:", checkout.id);
			console.log("Gateway ID:", gateway.id);
			console.log("Total Amount:", checkout.totalPrice.gross.amount);

			// Step 1: Create payment
			const paymentCreateResult = await checkoutPaymentCreate({
				checkoutId: checkout.id,
				input: {
					gateway: gateway.id,
					token: "dummy-token",
					amount: checkout.totalPrice.gross.amount,
				},
			});

			console.log("Payment create result:", JSON.stringify(paymentCreateResult, null, 2));

			if (paymentCreateResult.error) {
				throw new Error(paymentCreateResult.error.message);
			}

			const paymentCreateErrors = paymentCreateResult.data?.checkoutPaymentCreate.errors;
			if (paymentCreateErrors?.length) {
				console.error("Payment create errors:", JSON.stringify(paymentCreateErrors, null, 2));
				showErrors(paymentCreateErrors);
				return;
			}

			// Step 2: Complete checkout
			const completeResult = await checkoutComplete({
				checkoutId: checkout.id,
			});

			console.log("Checkout complete result:", JSON.stringify(completeResult, null, 2));

			if (completeResult.error) {
				throw new Error(completeResult.error.message);
			}

			const completeErrors = completeResult.data?.checkoutComplete.errors;
			if (completeErrors?.length) {
				console.error("Checkout complete errors:", JSON.stringify(completeErrors, null, 2));
				showErrors(completeErrors);
				return;
			}

			const order = completeResult.data?.checkoutComplete.order;
			if (!order) {
				throw new Error("Order was not created");
			}

			showSuccess("Payment successful!");
			await onCheckoutComplete();
		} catch (error) {
			console.error("Payment failed:", error);
			showErrors([{ message: error instanceof Error ? error.message : "Payment failed. Please try again." }]);
		} finally {
			setIsProcessing(false);
			setIsProcessingPayment(false);
		}
	};

	return (
		<div className="rounded-lg border border-neutral-200 bg-background p-4 dark:border-neutral-800">
			<h3 className="mb-2 font-semibold text-foreground">Dummy Payment</h3>
			<p className="mb-4 text-sm text-muted-foreground">
				This is a test payment method that will always succeed.
			</p>
			<button
				onClick={handlePayment}
				disabled={isProcessing}
				className="h-12 w-full items-center rounded-md bg-primary px-6 py-3 text-base font-medium leading-6 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isProcessing ? "Processing..." : "Pay now"}
			</button>
		</div>
	);
};
