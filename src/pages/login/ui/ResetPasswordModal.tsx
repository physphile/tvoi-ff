import { requestResetForgottenPasswordEmailResetPasswordRestorePostMutation } from '@/shared/api/auth/@tanstack/react-query.gen';
import { Dialog, Flex, TextInput, useToaster } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface ResetPasswordModalProps {
	email: string;
	onClose: () => void;
	open: boolean;
}

export const ResetPasswordModal = ({
	open,
	onClose,
	email: initialEmail,
}: ResetPasswordModalProps) => {
	const toaster = useToaster();
	const [email, setEmail] = useState(initialEmail);

	const { mutate: requestResetPassword } = useMutation({
		...requestResetForgottenPasswordEmailResetPasswordRestorePostMutation(),
		onSuccess: data => {
			onClose();
			toaster.add({
				name: 'request-reset-password',
				autoHiding: false,
				theme: 'utility',
				content: `${data.ru}. Если сменили, можете войти`,
			});
		},
		onError: error => {
			toaster.add({
				name: 'request-reset-password-error',
				theme: 'danger',
				content:
					error.detail && 'ru' in error.detail ? (error.detail.ru as string) : 'Неизвестная ошибка',
			});
		},
	});

	useEffect(() => {
		if (open) {
			setEmail(initialEmail);
		}
	}, [initialEmail, open]);

	return (
		<Dialog open={open} onClose={onClose} size="m">
			<Dialog.Header caption="Восстановить пароль" />
			<Dialog.Body>
				<Flex gap={2} direction="column">
					<TextInput label="Email" type="email" size="l" value={email} onUpdate={setEmail} />
				</Flex>
			</Dialog.Body>
			<Dialog.Footer
				propsButtonApply={{ view: 'action' }}
				textButtonApply="Восстановить"
				textButtonCancel="Отмена"
				onClickButtonCancel={onClose}
				onClickButtonApply={() => requestResetPassword({ body: { email } })}
			/>
		</Dialog>
	);
};
