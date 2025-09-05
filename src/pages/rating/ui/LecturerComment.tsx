import type { CommentGet } from '@/shared/api/rating/types.gen';
import { formatNumber, getTextNumberColor } from '@/shared/helpers';
import { dateTime } from '@gravity-ui/date-utils';
import { Card, Flex, Text, spacing } from '@gravity-ui/uikit';

export interface LecturerCommentProps {
	comment: CommentGet;
}

export const LecturerComment = ({
	comment: { text, mark_kindness, mark_freebie, mark_clarity, mark_general, create_ts, user_id },
}: LecturerCommentProps) => {
	return (
		<Card className={spacing({ p: 3 })}>
			<Flex direction={'column'} gap={2}>
				<div
					style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: 'center' }}
				>
					<Text color={getTextNumberColor(mark_kindness)}>
						{mark_kindness >= 0 ? 'Доброта' : 'Злобность'}: {Math.abs(mark_kindness).toFixed(2)}
					</Text>
					<Text color={getTextNumberColor(mark_freebie)}>
						{mark_freebie >= 0 ? 'Халявность' : 'Строгость'}: {Math.abs(mark_freebie).toFixed(2)}
					</Text>
					<Text color={getTextNumberColor(mark_clarity)}>
						{mark_clarity >= 0 ? 'Понятность' : 'Бредовость'} {Math.abs(mark_clarity).toFixed(2)}
					</Text>
					<Text
						color={getTextNumberColor(mark_general)}
						style={{ justifySelf: 'flex-end', fontWeight: 700 }}
					>
						{formatNumber(mark_general)}
					</Text>
				</div>
				<p
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: text.replaceAll('\\n', '<br>').replaceAll('\\"', '"'),
					}}
				/>
				<Flex justifyContent={'flex-end'}>
					<Text color="secondary">
						{dateTime({ input: create_ts }).format('DD.MM.YYYY')} | Автор:{' '}
						{user_id ? user_id : 'Аноним'}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
};
