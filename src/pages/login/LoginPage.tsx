import { AuthButton } from '@/features/AuthButton';
import { AUTH_METHODS_LIST, AUTH_METHODS_MAP } from '@/features/lib';
import type { AuthBackendAuthMethodSessionSession } from '@/shared/api/auth';
import { capitalize } from '@/shared/helpers/capitalize';
import { Flex, useToaster } from '@gravity-ui/uikit';
import { useMount } from 'ahooks';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';
import { isAuthMethod } from './helpers';
import { EmailLoginForm } from './ui';
import { PageHeader } from '@/shared/ui';

export const LoginPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const method = useMemo(() => searchParams.get('method') ?? '', [searchParams]);

	const [, setLoginData] = useLocalStorage<AuthBackendAuthMethodSessionSession | null>(
		'login_data',
		null
	);

	const toaster = useToaster();

	useMount(async () => {
		const result = searchParams.get('result');

		if (result === 'success') {
			toaster.add({
				name: 'approve-email-success',
				theme: 'success',
				content: 'Почта подтверждена',
			});
			setSearchParams({});
			return;
		}

		if (result === 'error') {
			toaster.add({
				name: 'approve-email-error',
				theme: 'danger',
				content: 'Не удалось подтвердить почту',
			});
			setSearchParams({});
			return;
		}

		const code = searchParams.get('code');
		const state = searchParams.get('state');

		if (!code || !state) {
			setSearchParams({});
			return;
		}

		if (!isAuthMethod(method)) {
			toaster.add({
				name: 'method-not-supported',
				theme: 'danger',
				content: 'Этот метод авторизации еще не поддержан',
			});
			setSearchParams({});
			return;
		}

		const { login, register } = AUTH_METHODS_MAP[method];

		const { data, error: loginError } = await login({
			body: { scopes: [], state, code },
		});

		if (!loginError) {
			toaster.add({
				theme: 'success',
				name: 'login-email-success',
				content: 'Вход выполнен успешно',
			});
			setLoginData(data as AuthBackendAuthMethodSessionSession);
			navigate('/profile');

			return;
		}

		// @ts-expect-error в автосгенерированных типах нет нормальных ошибок
		const errorMatch = loginError.message.match(/^No users found for(.*)account$/);
		if (errorMatch) {
			toaster.add({
				theme: 'utility',
				name: 'login-method-error',
				content: `Нет пользователя с таким ${capitalize(errorMatch[1].trim())} аккаунтом. Зарегистрироваться?`,
				autoHiding: false,
				actions: [
					{
						label: 'Зарегистрироваться',
						onClick: async () => {
							if (!('id_token' in loginError)) {
								toaster.add({
									theme: 'danger',
									name: 'register-error',
									content: 'Не удалось зарегистрироваться',
								});

								return;
							}

							const { data, error: registerError } = await register({
								body: { id_token: loginError.id_token as string },
							});
							if (registerError) {
								toaster.add({
									theme: 'danger',
									name: 'register-error',
									content: 'Не удалось зарегистрироваться',
								});

								return;
							}

							toaster.add({
								theme: 'success',
								name: 'register-success',
								content: 'Регистрация выполнена успешно',
							});

							setLoginData(data as AuthBackendAuthMethodSessionSession);
							navigate('/profile');
						},
					},
				],
			});
			return;
		}

		toaster.add({
			name: 'login-method-error',
			theme: 'danger',
			content: 'Не удалось войти',
		});
		setSearchParams({});
		return;
	});

	return (
		<>
			<PageHeader
				breadcrumbs={[
					{
						label: 'Вход',
						href: '/login',
					},
				]}
			/>
			<div style={{ margin: 'auto', width: 'clamp(200px, 100%, 600px)' }}>
				<EmailLoginForm />
				<Flex gap={2} wrap justifyContent={'center'} style={{ marginTop: 32 }}>
					{AUTH_METHODS_LIST.map(method => (
						<AuthButton key={method} method={method} size="l" style={{ width: 90 }} />
					))}
				</Flex>
			</div>
		</>
	);
};
