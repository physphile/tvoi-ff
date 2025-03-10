import { Flex, Text } from '@gravity-ui/uikit';
import type { ReactNode } from 'react';

export interface KeyValueProps {
	title: ReactNode;
	value: ReactNode;
}

export const KeyValue = ({ title, value }: KeyValueProps) => {
	return (
		<Flex>
			<Text ellipsis>{title}</Text>
			<div
				style={{ flex: 1, borderBottom: '1px dotted black', margin: '0 2px 4px', minWidth: 20 }}
			/>
			<Text whiteSpace="nowrap">{value}</Text>
		</Flex>
	);
};
