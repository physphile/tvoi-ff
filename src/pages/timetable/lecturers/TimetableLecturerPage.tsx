import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { getLecturerByIdLecturerIdGetOptions } from "@/shared/api/timetable/@tanstack/react-query.gen";
import { getLecturerShortName } from "@/shared/helpers";
import { Container, PageHeader } from "@/shared/ui";
import { TimetableSchedule } from "@/widgets/timetable";

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
					{ href: "/timetable", label: "Расписание" },
					{ href: "/timetable/lecturers", label: "Преподаватели" },
					{
						href: `/timetable/lecturers/${lecturerId}`,
						label: getLecturerShortName(lecturer),
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
