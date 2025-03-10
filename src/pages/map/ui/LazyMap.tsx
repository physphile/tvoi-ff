import { Card, Flex, Loader } from '@gravity-ui/uikit';
import { Suspense, lazy } from 'react';

const MapComponent = lazy(() => import('./Map').then(m => ({ default: m.MapComponent })));

export const LazyMap = () => {
	return (
		<Suspense
			fallback={
				<Card>
					<Flex justifyContent={'center'} alignItems={'center'} height={500}>
						<Loader size="l" />
					</Flex>
				</Card>
			}
		>
			<MapComponent />
		</Suspense>
	);
};
