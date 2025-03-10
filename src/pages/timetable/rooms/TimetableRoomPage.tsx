import { Container, PageHeader } from '@/shared/ui';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getRoomByIdRoomIdGetOptions } from '@/shared/api/timetable/@tanstack/react-query.gen';
import { TimetableSchedule } from '@/widgets/timetable';

export const TimetableRoomPage = () => {
	const params = useParams();

	const roomId = Number(params.roomId);

	const { data: room, isLoading: isRoomLoading } = useQuery(
		getRoomByIdRoomIdGetOptions({ path: { id: roomId } })
	);

	return (
		<>
			<PageHeader
				breadcrumbs={[
					{ label: 'Расписание', href: '/timetable' },
					{ href: '/timetable/rooms', label: 'Кабинеты' },
					{
						href: `/timetable/rooms/${roomId}`,
						label: room?.name ?? '',
						loading: isRoomLoading,
					},
				]}
			/>
			<Container>
				<TimetableSchedule roomId={roomId} />
			</Container>
		</>
	);
};
