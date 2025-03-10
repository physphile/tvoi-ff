import { AUTH_METHODS_MAP, type AuthMethod } from '@/features/lib';

export const isAuthMethod = (method: string): method is AuthMethod => {
	return method in AUTH_METHODS_MAP;
};
