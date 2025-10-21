import type { PropsWithChildren } from "react";

import { Text, type TextProps } from "@gravity-ui/uikit";

interface TextBoxProps extends PropsWithChildren, TextProps {
	lines: number;
}

export const TextBox = ({ children, lines, style, ...props }: TextBoxProps) => {
	return (
		<Text
			{...props}
			style={{
				display: "-webkit-box",
				overflow: "hidden",
				WebkitBoxOrient: "vertical",
				WebkitLineClamp: lines,
				...style,
			}}
		>
			{children}
		</Text>
	);
};
