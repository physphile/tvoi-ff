import {
	getGroupsGroupGetOptions,
	getLecturersLecturerGetOptions,
	getRoomsRoomGetOptions,
} from '@/shared/api/timetable/@tanstack/react-query.gen';
import { getLecturerShortName } from '@/shared/helpers';
import { Container, PageHeader } from '@/shared/ui';
import { TimetableSchedule } from '@/widgets/timetable';
import { Flex, Select, Skeleton, spacing } from '@gravity-ui/uikit';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

export const TimetableEventsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const roomId = searchParams.get('roomId');
	const groupId = searchParams.get('groupId');
	const lecturerId = searchParams.get('lecturerId');

	const { data: roomsData, isLoading: isRoomsLoading } = useQuery(
		getRoomsRoomGetOptions({ query: { limit: 10e5 } })
	);
	const { data: groupsData, isLoading: isGroupsLoading } = useQuery(
		getGroupsGroupGetOptions({ query: { limit: 10e5 } })
	);
	const { data: lecturersData, isLoading: isLecturersLoading } = useQuery(
		getLecturersLecturerGetOptions({ query: { limit: 10e5 } })
	);

	const rooms = roomsData?.items ?? [];
	const groups = groupsData?.items.filter(group => Boolean(group.number)) ?? [];
	const lecturers = lecturersData?.items ?? [];

	const isLoading = isRoomsLoading || isGroupsLoading || isLecturersLoading;

	return (
		<>
			<PageHeader
				breadcrumbs={[
					{ label: 'Расписание', href: '/timetable' },
					{ label: 'События', href: '/timetable/events' },
				]}
			/>
			<Container>
				<Flex gap={3} className={spacing({ mb: 3 })}>
					{isLoading ? (
						<>
							<Skeleton style={{ flex: 1, height: 28 }} />
							<Skeleton style={{ flex: 1, height: 28 }} />
							<Skeleton style={{ flex: 1, height: 28 }} />
						</>
					) : (
						<>
							<Select
								width="max"
								placeholder="Выберите"
								options={rooms.map(room => ({
									content: room.name,
									value: room.id.toString(),
								}))}
								onUpdate={([value]) => setSearchParams({ roomId: value })}
								filterable
								filterPlaceholder="Поиск"
								label="Кабинет"
								hasClear
							/>
							<Select
								width="max"
								placeholder="Выберите"
								options={groups.map(group => ({
									content: group.number,
									value: group.id.toString(),
								}))}
								onUpdate={([value]) => setSearchParams({ groupId: value })}
								filterable
								filterPlaceholder="Поиск"
								label="Группа"
								hasClear
							/>
							<Select
								width="max"
								placeholder="Выберите"
								options={lecturers.map(lecturer => ({
									content: getLecturerShortName(lecturer),
									value: lecturer.id.toString(),
								}))}
								onUpdate={([value]) => setSearchParams({ lecturerId: value })}
								filterable
								filterPlaceholder="Поиск"
								label="Преподаватель"
								hasClear
							/>
						</>
					)}
				</Flex>
				<TimetableSchedule
					roomId={roomId ? Number(roomId) : undefined}
					groupId={groupId ? Number(groupId) : undefined}
					lecturerId={lecturerId ? Number(lecturerId) : undefined}
				/>
			</Container>
		</>
	);
};
