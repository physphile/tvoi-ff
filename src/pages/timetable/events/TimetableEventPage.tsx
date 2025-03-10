import { getEventByIdEventIdGetOptions } from '@/shared/api/timetable/@tanstack/react-query.gen';
import { getLecturerShortName } from '@/shared/helpers';
import { Container, PageHeader } from '@/shared/ui';
import { dateTime } from '@gravity-ui/date-utils';
import { Flex, Link, Text, spacing } from '@gravity-ui/uikit';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

export const TimetableEventPage = () => {
	const params = useParams();
	const eventId = Number(params.eventId);

	const { data: event, isLoading: isEventLoading } = useQuery(
		getEventByIdEventIdGetOptions({ path: { id: eventId } })
	);

	const navigate = useNavigate();

	return (
		<Flex direction="column">
			<PageHeader
				breadcrumbs={[
					{ label: 'Расписание', href: '/timetable' },
					{ label: 'События', href: '/timetable/events' },
					{
						label: `${event?.name} ${dateTime({ input: event?.start_ts }).format('D MMMM')}`,
						href: `/timetable/events/${eventId}`,
						loading: isEventLoading,
					},
				]}
			/>
			<Container>
				<Text variant="header-1" className={spacing({ mb: 1 })}>
					{event?.name}
				</Text>
				<Text variant="subheader-1" color="secondary" className={spacing({ mb: 4 })}>
					{event?.lecturer.map(l => (
						<Link
							key={l.id}
							href={`/timetable/lecturers/${l.id}`}
							onClick={e => {
								e.preventDefault();
								navigate(`/timetable/lecturers/${l.id}`);
							}}
						>
							{getLecturerShortName(l)}
						</Link>
					))}
				</Text>
				<Text variant="subheader-1" color="secondary" className={spacing({ mb: 4 })}>
					{event?.room.map(r => (
						<Link
							key={r.id}
							href={`/timetable/rooms/${r.id}`}
							onClick={e => {
								e.preventDefault();
								navigate(`/timetable/rooms/${r.id}`);
							}}
						>
							{r.name}
						</Link>
					))}
				</Text>
			</Container>
		</Flex>
	);
};
