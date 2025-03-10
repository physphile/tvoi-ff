import type { AuthBackendAuthMethodSessionSession } from '@/shared/api/auth';
import {
	loginEmailLoginPostMutation,
	registerEmailRegistrationPostMutation,
} from '@/shared/api/auth/@tanstack/react-query.gen';
import { Button, Flex, PasswordInput, TextInput, spacing, useToaster } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';
import { ResetPasswordModal } from './ResetPasswordModal';

interface LoginForm {
	email: string;
	password: string;
}

export const EmailLoginForm = () => {
	const toaster = useToaster();
	const navigate = useNavigate();

	const { register, handleSubmit, getValues } = useForm<LoginForm>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [, setLoginData] = useLocalStorage<AuthBackendAuthMethodSessionSession | null>(
		'login_data',
		null
	);

	const { mutate: registerEmail } = useMutation({
		...registerEmailRegistrationPostMutation(),
		onSuccess: data => {
			toaster.add({
				name: 'register-email-success',
				theme: 'utility',
				content: `${data.ru}. После смены пароля можете войти.`,
				autoHiding: false,
				actions: [
					{
						label: 'Войти',
						onClick: () => loginEmail({ body: { ...getValues() } }),
					},
				],
			});
		},
		onError: error =>
			toaster.add({
				theme: 'danger',
				name: 'register-email-error',
				content: 'ru' in error ? (error.ru as string) : 'Неизвестная ошибка',
			}),
	});

	const { mutate: loginEmail } = useMutation({
		...loginEmailLoginPostMutation(),
		onSuccess: data => {
			toaster.removeAll();
			toaster.add({
				theme: 'success',
				name: 'login-email-success',
				content: 'Вход выполнен успешно',
			});
			setLoginData(data);
			navigate('/profile');
		},
		onError: error => {
			// @ts-expect-error в автосгенерированных типах нет нормальных ошибок
			if (error.message === 'Incorrect login or password') {
				toaster.add({
					theme: 'utility',
					name: 'login-email-error',
					content: 'Неверный Email / Пароль. Зарегистрироваться?',
					autoHiding: false,
					actions: [
						{
							label: 'Зарегистрироваться',
							onClick: () => registerEmail({ body: getValues() }),
						},
					],
				});
			} else {
				toaster.add({
					theme: 'danger',
					name: 'login-email-error',
					content: 'ru' in error ? (error.ru as string) : 'Неизвестная ошибка',
				});
			}
		},
	});

	const onSubmit = async (data: LoginForm) => {
		loginEmail({ body: { ...data, scopes: ['auth.user.selfdelete'] } });
	};

	const [isRestorePasswordModalVisible, setIsRestorePasswordModalVisible] = useState(false);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex direction="column" gap={3}>
					<TextInput {...register('email')} label="Email" type="email" size="xl" />
					<PasswordInput
						{...{ ...register('password'), ref: undefined }}
						label="Пароль"
						size="xl"
						controlRef={register('password').ref}
					/>
					<Button type="submit" view="action" size="xl" className={spacing({ mt: 4 })}>
						Войти / Зарегистрироваться
					</Button>
					<Button
						type="button"
						view="outlined"
						size="xl"
						className={spacing({ mt: 1 })}
						onClick={() => {
							setIsRestorePasswordModalVisible(true);
							toaster.remove('login-email-error');
						}}
					>
						Восстановить пароль
					</Button>
				</Flex>
			</form>
			<ResetPasswordModal
				open={isRestorePasswordModalVisible}
				onClose={() => setIsRestorePasswordModalVisible(false)}
				email={getValues('email')}
			/>
		</>
	);
};
