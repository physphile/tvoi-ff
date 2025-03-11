import { ActionBar } from '@gravity-ui/navigation';
import { Breadcrumbs, Flex, Skeleton, spacing } from '@gravity-ui/uikit';
import { type ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router';

export interface PageHeaderProps {
	breadcrumbs: {
		label: ReactNode;
		href: string;
		loading?: boolean;
		hide?: boolean;
	}[];
	actions?: React.ReactNode;
}

export const PageHeader = (props: PageHeaderProps) => {
	const navigate = useNavigate();

	const breadcrumbs = useMemo(
		() => [
			{
				label: 'Главная',
				href: '/',
			},
			...props.breadcrumbs,
		],
		[props.breadcrumbs]
	);
	return (
		<ActionBar>
			<Flex
				alignItems={'center'}
				justifyContent={'space-between'}
				width={'100%'}
				className={spacing({ px: 3 })}
			>
				<Breadcrumbs style={{ width: '100%', alignItems: 'center' }}>
					{breadcrumbs.map(
						({ href, label, loading, hide }, index) =>
							!hide && (
								<Breadcrumbs.Item
									href={href}
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									onClick={e => {
										e.preventDefault();
										navigate(href);
									}}
								>
									{loading ? <Skeleton style={{ height: 24, width: 100 }} /> : label}
								</Breadcrumbs.Item>
							)
					)}
				</Breadcrumbs>
				{props.actions}
			</Flex>
		</ActionBar>
	);
};
