import type { UserInfo, UserInfoUpdate } from '@/shared/api/userdata';
import { FormRow } from '@gravity-ui/components';
import { Card, Flex, Text, TextInput, spacing } from '@gravity-ui/uikit';
import { useFormContext } from 'react-hook-form';

export type UserdataCardItem = UserInfo & { index: number };

export interface UserdataCardProps {
	items: UserdataCardItem[];
	category: string;
	readonly?: boolean;
}

export const UserdataCard = ({ items, category, readonly }: UserdataCardProps) => {
	const { register } = useFormContext<UserInfoUpdate>();

	return (
		<Card className={spacing({ p: 3 })} style={{ overflow: 'hidden' }}>
			<Text variant="subheader-2">{category}</Text>
			<Flex direction={'column'} gap={2} className={spacing({ mt: 2 })}>
				{items
					.filter(i => i.param !== 'Фото')
					.map(({ param, index, value }) => (
						<FormRow key={param} label={param}>
							{readonly ? (
								<Flex style={{ paddingLeft: 9, paddingTop: 1.5 }} height={28}>
									<Text style={{ lineHeight: '26px' }} ellipsis>
										{value}
									</Text>
								</Flex>
							) : (
								<TextInput
									defaultValue={value ?? ''}
									{...register(`items.${index}.value`)}
									disabled={readonly}
								/>
							)}
						</FormRow>
					))}
			</Flex>
		</Card>
	);
};
