import { Col, Flex, Row, spacing } from '@gravity-ui/uikit';
import type { PropsWithChildren, ReactNode } from 'react';

interface ContainerProps extends PropsWithChildren {
	aside?: ReactNode;
}

export const Container = ({ children, aside }: ContainerProps) => {
	return (
		<Row space={3} className={spacing({ p: 3 })} style={{ maxWidth: aside ? '100%' : '1200px' }}>
			<Col s={'12'} l={aside ? '7' : '12'}>
				<Flex direction={'column'}>{children}</Flex>
			</Col>
			{aside && (
				<Col s={'12'} l={'5'}>
					<Flex direction={'column'}>{aside}</Flex>
				</Col>
			)}
		</Row>
	);
};
