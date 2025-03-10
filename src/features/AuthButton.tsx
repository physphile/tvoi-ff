import { capitalize } from '@/shared/helpers/capitalize';
import { Button, type ButtonButtonProps } from '@gravity-ui/uikit';
import { Skeleton } from '@gravity-ui/uikit';
import { useQuery } from '@tanstack/react-query';
import { useMemoizedFn } from 'ahooks';
import { AUTH_METHODS_MAP, type AuthMethod } from './lib';

interface AuthButtonProps extends Omit<ButtonButtonProps, 'onClick' | 'type'> {
	method: AuthMethod;
}

export const AuthButton = ({ method, children, ...props }: AuthButtonProps) => {
	const { data: authUrl, isLoading } = useQuery({
		queryKey: AUTH_METHODS_MAP[method].getQueryKey(),
		queryFn: () => AUTH_METHODS_MAP[method].getAuthUrl(),
		select: data => data.data?.url,
	});

	const onClick = useMemoizedFn(() => {
		if (!authUrl) {
			return;
		}

		window.open(authUrl, '_self');
	});

	if (isLoading) {
		return <Skeleton style={{ width: 100, height: 40 }} />;
	}

	return (
		<Button type="button" {...props} onClick={onClick}>
			{children ?? capitalize(method)}
		</Button>
	);
};
