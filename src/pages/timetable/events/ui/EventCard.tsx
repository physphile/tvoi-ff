import type { Event } from '@/shared/api/timetable';
import { getLecturerShortName } from '@/shared/helpers';
import { TextBox } from '@/shared/ui';
import { Card, Flex, spacing } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router';

interface EventCardProps {
	event: Event;
	style: React.CSSProperties;
}

export const EventCard = ({ event, style }: EventCardProps) => {
	const navigate = useNavigate();

	return (
		<Card
			type="selection"
			onClick={() => navigate(`/timetable/events/${event.id}`)}
			key={event.id}
			style={{
				...style,
				background:
					event.name === 'ВОЕННАЯ ПОДГОТОВКА'
						? 'var(--g-color-base-generic)'
						: event.name === event.name.toUpperCase()
							? 'var(--g-color-base-info-light)'
							: 'var(--g-color-base-utility-light)',
				position: 'relative',
				zIndex: 2,
			}}
			className={spacing({ p: 2 })}
		>
			<Flex direction={'column'} gap={1}>
				<TextBox lines={3} style={{ fontWeight: 'bold' }} variant="caption-2">
					{event.name}
				</TextBox>
				<TextBox lines={3} variant="caption-2">
					{event.lecturer.map(getLecturerShortName).join(', ')}
				</TextBox>
				<TextBox lines={3} variant="caption-2">
					{event.room.map(r => r.name).join(', ')}
				</TextBox>
			</Flex>
		</Card>
	);
};
