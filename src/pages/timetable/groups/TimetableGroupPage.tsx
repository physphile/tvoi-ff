import { getGroupByIdGroupIdGetOptions } from '@/shared/api/timetable/@tanstack/react-query.gen';
import { Container, PageHeader } from '@/shared/ui';
import { TimetableSchedule } from '@/widgets/timetable';
import { Flex, Text, spacing } from '@gravity-ui/uikit';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
export const TimetableGroupPage = () => {
	const params = useParams();
	const groupId = Number(params.groupId);

	const { data: group, isLoading: isGroupLoading } = useQuery(
		getGroupByIdGroupIdGetOptions({ path: { id: groupId } })
	);

	return (
		<Flex direction="column">
			<PageHeader
				breadcrumbs={[
					{ label: 'Расписание', href: '/timetable' },
					{ label: 'Группы', href: '/timetable/groups' },
					{
						label: `Группа №${group?.number}`,
						href: `/timetable/groups/${groupId}`,
						loading: isGroupLoading,
					},
				]}
			/>
			<Container>
				<Text variant="header-1" className={spacing({ mb: 1 })}>
					Группа №{group?.number}
				</Text>
				<Text variant="subheader-1" color="secondary" className={spacing({ mb: 4 })}>
					{group?.name?.replace('каф.', 'Кафедра ')}
				</Text>
				<TimetableSchedule groupId={groupId} />
			</Container>
		</Flex>
	);
};
