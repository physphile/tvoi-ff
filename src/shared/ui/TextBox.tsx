import { Text, type TextProps } from '@gravity-ui/uikit';
import type { PropsWithChildren } from 'react';

interface TextBoxProps extends TextProps, PropsWithChildren {
	lines: number;
}

export const TextBox = ({ lines, style, children, ...props }: TextBoxProps) => {
	return (
		<Text
			{...props}
			style={{
				overflow: 'hidden',
				display: '-webkit-box',
				WebkitLineClamp: lines,
				WebkitBoxOrient: 'vertical',
				...style,
			}}
		>
			{children}
		</Text>
	);
};
