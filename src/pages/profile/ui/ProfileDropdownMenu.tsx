import {
	deleteUserUserUserIdDeleteMutation,
	logoutLogoutPostMutation,
	updateSessionSessionIdPatchMutation,
} from '@/shared/api/auth/@tanstack/react-query.gen';
import type { AuthBackendAuthMethodSessionSession } from '@/shared/api/auth/types.gen';
import { useLoginData, useModal } from '@/shared/hooks';
import { ConfirmDialog } from '@gravity-ui/components';
import { DropdownMenu, useToaster } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const ProfileDropdownMenu = () => {
	const { token, removeLoginData, user_id, id: session_id, setLoginData } = useLoginData();
	const toaster = useToaster();
	const navigate = useNavigate();

	const { mutate: logout } = useMutation({
		...logoutLogoutPostMutation(),
		onSuccess: () => {
			toaster.add({ name: 'logout-success', theme: 'success', content: 'Выход выполнен успешно' });
			removeLoginData();
			navigate('/login');
		},
		onError: error =>
			toaster.add({
				theme: 'danger',
				name: 'logout-error',
				content: 'ru' in error ? (error.ru as string) : 'Неизвестная ошибка',
			}),
	});

	const [showModal, modal] = useModal(({ open, onReject, onApply }) => (
		<ConfirmDialog
			open={open}
			onClose={onReject}
			title="Подтвердите действие"
			message="Вы уверены, что хотите удалить аккаунт?"
			textButtonApply="Удалить"
			textButtonCancel="Отмена"
			onClickButtonCancel={onReject}
			onClickButtonApply={onApply}
			propsButtonApply={{ view: 'outlined-danger' }}
		/>
	));

	const { mutate: updateSession } = useMutation({
		...updateSessionSessionIdPatchMutation(),
		onSuccess: data => {
			setLoginData(data as AuthBackendAuthMethodSessionSession);
			deleteUser({
				auth: token,
				path: {
					user_id,
				},
			});
		},
		onError: error => {
			toaster.add({
				theme: 'danger',
				name: 'update-session-error',
				content: 'ru' in error ? (error.ru as string) : 'Неизвестная ошибка',
			});
		},
	});

	const { mutate: deleteUser } = useMutation({
		...deleteUserUserUserIdDeleteMutation(),
		onSuccess: () => {
			toaster.add({
				name: 'delete-user-success',
				theme: 'success',
				content: 'Аккаунт успешно удален',
			});
			removeLoginData();
			navigate('/login');
		},
		onError: error => {
			if ((error.detail as unknown as string) === 'Not authorized') {
				return updateSession({
					auth: token,
					path: {
						id: session_id,
					},
					body: {
						scopes: ['auth.user.selfdelete'],
					},
				});
			}

			toaster.add({
				theme: 'danger',
				name: 'delete-user-error',
				content: 'ru' in error ? (error.ru as string) : 'Неизвестная ошибка',
			});
		},
	});

	return (
		<>
			<DropdownMenu
				items={[
					{
						text: 'Выйти',
						action: () => logout({ auth: token }),
					},
					{
						text: 'Удалить аккаунт',
						theme: 'danger',
						action: async () => {
							const isConfirmed = await showModal();

							if (!isConfirmed) {
								return;
							}

							deleteUser({
								auth: token,
								path: {
									user_id,
								},
							});
						},
					},
				]}
			/>
			{modal}
		</>
	);
};
