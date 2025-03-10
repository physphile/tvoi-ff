import { type ReactNode, useMemo, useRef, useState } from 'react';

import { useBoolean, useMemoizedFn } from 'ahooks';

export interface RenderModalOptions<CloseValue = void, ApplyValue = void, RejectValue = void> {
	onClose: (value?: CloseValue) => void;
	onApply: (value?: ApplyValue) => void;
	onReject: (value?: RejectValue) => void;
	open: boolean;
}

export const useModal = <CloseValue, ApplyValue, RejectValue, AdditionalData>(
	renderModal: (
		options: RenderModalOptions<CloseValue, ApplyValue, RejectValue>,
		additionalData?: AdditionalData
	) => ReactNode,
	keepMounted = true
) => {
	type ModalReturnValue = CloseValue | ApplyValue | undefined;
	const resolveRef = useRef<((value: ModalReturnValue) => void) | null>(null);
	const rejectRef = useRef<((value?: RejectValue) => void) | null>(null);
	const [open, { setTrue: show, setFalse: hide }] = useBoolean(false);
	const [additionalData, setAdditionalData] = useState<AdditionalData>();

	const showModal = useMemoizedFn(
		async (data?: AdditionalData): Promise<ModalReturnValue> =>
			new Promise<ModalReturnValue>((resolve, reject) => {
				resolveRef.current = resolve;
				rejectRef.current = reject;
				show();
				setAdditionalData(data);
			})
	);

	const handleApply = useMemoizedFn((value?: ApplyValue) => {
		hide();
		resolveRef.current?.(value);
	});

	const handleClose = useMemoizedFn((value?: CloseValue) => {
		hide();
		resolveRef.current?.(value);
	});

	const handleReject = useMemoizedFn((value?: RejectValue) => {
		hide();
		rejectRef.current?.(value);
	});

	const modal = useMemo(
		() =>
			open || keepMounted
				? renderModal(
						{
							onApply: handleApply,
							onClose: handleClose,
							onReject: handleReject,
							open,
						},
						additionalData
					)
				: null,
		[additionalData, handleApply, handleClose, handleReject, keepMounted, open, renderModal]
	);

	return [showModal, modal] as const;
};
