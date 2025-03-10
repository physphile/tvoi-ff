import {
	authUrlAuthenticAuthUrlGet,
	authUrlGithubAuthUrlGet,
	authUrlGoogleAuthUrlGet,
	authUrlLkMsuAuthUrlGet,
	authUrlMyMsuAuthUrlGet,
	authUrlPhysicsMsuAuthUrlGet,
	authUrlTelegramAuthUrlGet,
	authUrlVkAuthUrlGet,
	authUrlYandexAuthUrlGet,
	loginAuthenticLoginPost,
	loginGithubLoginPost,
	loginGoogleLoginPost,
	loginLkMsuLoginPost,
	loginMyMsuLoginPost,
	loginPhysicsMsuLoginPost,
	loginTelegramLoginPost,
	loginVkLoginPost,
	loginYandexLoginPost,
	registerAuthenticRegistrationPost,
	registerGithubRegistrationPost,
	registerGoogleRegistrationPost,
	registerLkMsuRegistrationPost,
	registerMyMsuRegistrationPost,
	registerPhysicsMsuRegistrationPost,
	registerTelegramRegistrationPost,
	registerVkRegistrationPost,
	registerYandexRegistrationPost,
} from '@/shared/api/auth';
import {
	authUrlAuthenticAuthUrlGetQueryKey,
	authUrlGithubAuthUrlGetQueryKey,
	authUrlGoogleAuthUrlGetQueryKey,
	authUrlLkMsuAuthUrlGetQueryKey,
	authUrlMyMsuAuthUrlGetQueryKey,
	authUrlPhysicsMsuAuthUrlGetQueryKey,
	authUrlTelegramAuthUrlGetQueryKey,
	authUrlVkAuthUrlGetQueryKey,
	authUrlYandexAuthUrlGetQueryKey,
} from '@/shared/api/auth/@tanstack/react-query.gen';

export const AUTH_METHODS_MAP = Object.freeze({
	google: {
		login: loginGoogleLoginPost,
		register: registerGoogleRegistrationPost,
		getAuthUrl: authUrlGoogleAuthUrlGet,
		getQueryKey: authUrlGoogleAuthUrlGetQueryKey,
	},
	authentic: {
		login: loginAuthenticLoginPost,
		register: registerAuthenticRegistrationPost,
		getAuthUrl: authUrlAuthenticAuthUrlGet,
		getQueryKey: authUrlAuthenticAuthUrlGetQueryKey,
	},
	github: {
		login: loginGithubLoginPost,
		register: registerGithubRegistrationPost,
		getAuthUrl: authUrlGithubAuthUrlGet,
		getQueryKey: authUrlGithubAuthUrlGetQueryKey,
	},
	'lk-msu': {
		login: loginLkMsuLoginPost,
		register: registerLkMsuRegistrationPost,
		getAuthUrl: authUrlLkMsuAuthUrlGet,
		getQueryKey: authUrlLkMsuAuthUrlGetQueryKey,
	},
	yandex: {
		login: loginYandexLoginPost,
		register: registerYandexRegistrationPost,
		getAuthUrl: authUrlYandexAuthUrlGet,
		getQueryKey: authUrlYandexAuthUrlGetQueryKey,
	},
	'my-msu': {
		login: loginMyMsuLoginPost,
		register: registerMyMsuRegistrationPost,
		getAuthUrl: authUrlMyMsuAuthUrlGet,
		getQueryKey: authUrlMyMsuAuthUrlGetQueryKey,
	},
	'physics-msu': {
		login: loginPhysicsMsuLoginPost,
		register: registerPhysicsMsuRegistrationPost,
		getAuthUrl: authUrlPhysicsMsuAuthUrlGet,
		getQueryKey: authUrlPhysicsMsuAuthUrlGetQueryKey,
	},
	telegram: {
		login: loginTelegramLoginPost,
		register: registerTelegramRegistrationPost,
		getAuthUrl: authUrlTelegramAuthUrlGet,
		getQueryKey: authUrlTelegramAuthUrlGetQueryKey,
	},
	vk: {
		login: loginVkLoginPost,
		register: registerVkRegistrationPost,
		getAuthUrl: authUrlVkAuthUrlGet,
		getQueryKey: authUrlVkAuthUrlGetQueryKey,
	},
});

export type AuthMethod = keyof typeof AUTH_METHODS_MAP;

export const AUTH_METHODS_LIST = Object.keys(AUTH_METHODS_MAP) as AuthMethod[];
