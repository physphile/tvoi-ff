import { getEventsEventGetOptions } from '@/shared/api/timetable/@tanstack/react-query.gen';
import { dateTime } from '@gravity-ui/date-utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Schedule } from '@/shared/ui';
import { NoSearchResults } from '@gravity-ui/illustrations';
import { useMediaQuery } from 'usehooks-ts';

interface TimetableScheduleProps {
	groupId?: number;
	roomId?: number;
	lecturerId?: number;
}

export const TimetableSchedule = ({ groupId, roomId, lecturerId }: TimetableScheduleProps) => {
	const isMobile = useMediaQuery('(max-width: 768px)');

	const [currentDate, setCurrentDate] = useState(dateTime());
	const [showedWeekdays, setShowedWeekdays] = useState<1 | 3 | 7>(isMobile ? 3 : 7);

	const period = useMemo(() => {
		switch (showedWeekdays) {
			case 1:
				return { start: currentDate, end: currentDate.add(1, 'day') };
			case 3:
				return { start: currentDate.subtract(1, 'day'), end: currentDate.add(1, 'day') };
			case 7:
				return { start: currentDate.set({ weekday: 0 }), end: currentDate.set({ weekday: 6 }) };
		}
	}, [currentDate, showedWeekdays]);

	const { data, isLoading, error } = useQuery(
		getEventsEventGetOptions({
			query: {
				group_id: groupId,
				room_id: roomId,
				lecturer_id: lecturerId,
				start: period.start.format('YYYY-MM-DD'),
				end: period.end.format('YYYY-MM-DD'),
			},
		})
	);

	const events = data?.items ?? [];

	return (
		<Schedule
			events={events}
			isLoading={isLoading}
			date={currentDate}
			onDateUpdate={setCurrentDate}
			overlay={error ? <NoSearchResults /> : undefined}
			showedWeekdays={showedWeekdays}
			onShowedWeekdaysUpdate={setShowedWeekdays}
			period={period}
		/>
	);
};
