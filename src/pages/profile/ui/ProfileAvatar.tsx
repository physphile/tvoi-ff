import { stringToColor } from '@/shared/helpers/stringToColor';
import { Avatar, Skeleton } from '@gravity-ui/uikit';
import type { CSSProperties } from 'react';

export interface ProfileAvatarProps {
	imgUrl: string;
	name: string;
	style?: CSSProperties;
	className?: string;
	loading?: boolean;
}

export const ProfileAvatar = ({ imgUrl, name, style, className, loading }: ProfileAvatarProps) => {
	if (loading) {
		return (
			<Skeleton
				style={{
					borderRadius: 999,
					display: 'flex',
					width: 'clamp(100px, 50vw, 200px)',
					height: 'clamp(100px, 50vw, 200px)',
					...style,
				}}
				className={className}
			/>
		);
	}

	return (
		<Avatar
			imgUrl={imgUrl ?? 'kek'}
			fallbackImgUrl={`https://ui-avatars.com/api/?name=${name.replace('@', '').slice(0, 2).toUpperCase()}&background=${stringToColor(name)}&color=fff`}
			style={{ width: 'clamp(100px, 50vw, 200px)', height: 'clamp(100px, 50vw, 200px)', ...style }}
			className={className}
		/>
	);
};
