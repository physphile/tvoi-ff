import { getLecturerByIdLecturerIdGetOptions } from '@/shared/api/timetable/@tanstack/react-query.gen';
import { getLecturerShortName } from '@/shared/helpers';
import { Container, PageHeader } from '@/shared/ui';
import { TimetableSchedule } from '@/widgets/timetable';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export const TimetableLecturerPage = () => {
	const params = useParams();
	const lecturerId = Number(params.lecturerId);

	const { data: lecturer = {}, isLoading: isLecturerLoading } = useQuery(
		getLecturerByIdLecturerIdGetOptions({ path: { id: lecturerId } })
	);

	return (
		<>
			<PageHeader
				breadcrumbs={[
					{ label: 'Расписание', href: '/timetable' },
					{ label: 'Преподаватели', href: '/timetable/lecturers' },
					{
						label: getLecturerShortName(lecturer),
						href: `/timetable/lecturers/${lecturerId}`,
						loading: isLecturerLoading,
					},
				]}
			/>
			<Container>
				<TimetableSchedule lecturerId={lecturerId} />
			</Container>
		</>
	);
};
