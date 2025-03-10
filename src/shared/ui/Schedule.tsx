import { type DateTime, dateTime } from '@gravity-ui/date-utils';
import { ArrowLeft, ArrowRight } from '@gravity-ui/icons';
import {
	Button,
	Flex,
	Icon,
	Overlay,
	SegmentedRadioGroup,
	Text,
	TextInput,
} from '@gravity-ui/uikit';
import { Loader } from '@gravity-ui/uikit';
import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import type { EventGet } from '../api/timetable';
import { getEventsWithIntersections, findLcm } from '../helpers';
import { EventCard } from './EventCard';
import { assignOrders } from '../helpers/assignOrders';
import { useMediaQuery } from 'usehooks-ts';

export interface ScheduleProps {
	events: EventGet[];
	isLoading?: boolean;
	date: DateTime;
	onDateUpdate: (date: DateTime) => void;
	hourStart: number;
	hourEnd: number;
	quantumTimeUnit: number;
	quantumTimeUnitHeight: number;
	overlay?: ReactNode;
	onShowedWeekdaysUpdate: (weekdays: 1 | 3 | 7) => void;
	showedWeekdays: 1 | 3 | 7;
	period: { start: DateTime; end: DateTime };
}

export const Schedule = ({
	events,
	isLoading = false,
	date,
	onDateUpdate,
	hourStart,
	hourEnd,
	quantumTimeUnit,
	quantumTimeUnitHeight,
	overlay,
	onShowedWeekdaysUpdate,
	showedWeekdays,
	period,
}: ScheduleProps) => {
	const hoursCount = hourEnd - hourStart;
	const quantaInHour = 60 / quantumTimeUnit;

	const getDayStart = useCallback(
		(date: string | DateTime) => {
			return dateTime({ input: date }).set({
				hour: hourStart,
				minute: 0,
				second: 0,
				millisecond: 0,
			});
		},
		[hourStart]
	);
	const eventsWithIntersections = useMemo(
		() => assignOrders(getEventsWithIntersections(events)),
		[events]
	);

	const lcm = useMemo(
		() => findLcm(eventsWithIntersections.map(event => event.intersections)),
		[eventsWithIntersections]
	);

	const transformedEvents = useMemo(
		() =>
			eventsWithIntersections.map(event => {
				const d = dateTime({ input: event.start_ts });
				const dayStart = getDayStart(event.start_ts);
				const deltaStart = d.diff(dayStart, 'minutes');
				const deltaEnd = dateTime({ input: event.end_ts }).diff(dayStart, 'minutes');
				const gridRowStart = Math.round(deltaStart / quantumTimeUnit) + 1;
				const gridRowEnd = Math.round(deltaEnd / quantumTimeUnit) + 1;

				const gridColumnStart = lcm * (d.day() - period.start.day()) + event.order;
				const gridColumnEnd = gridColumnStart + lcm / event.intersections;

				return {
					style: {
						gridRowStart,
						gridRowEnd,
						gridColumnStart,
						gridColumnEnd,
					},
					event,
				};
			}) ?? [],
		[eventsWithIntersections, lcm, getDayStart, quantumTimeUnit, period.start]
	);

	const [currentOffset, setCurrentOffset] = useState(
		dateTime().diff(getDayStart(dateTime()), 'minutes')
	);

	const isMobile = useMediaQuery('(max-width: 768px)');

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentOffset(dateTime().diff(getDayStart(dateTime()), 'minutes'));
		}, 60e3);
		return () => clearInterval(interval);
	}, [getDayStart]);

	return (
		<Flex direction={'column'}>
			<Flex gap={2} justifyContent={'space-between'} direction={isMobile ? 'column' : 'row'}>
				<Flex>
					<Button
						onClick={() => onDateUpdate(date.subtract(showedWeekdays, 'day'))}
						pin="round-brick"
						view="outlined"
						size="xl"
					>
						<Icon data={ArrowLeft} />
					</Button>
					<TextInput
						size="xl"
						pin="brick-brick"
						readOnly
						value={
							showedWeekdays === 1
								? `${period.start.format('D MMMM')}`
								: `${period.start.format('D MMMM')} – ${period.end.format('D MMMM')}`
						}
					/>
					<Button
						size="xl"
						onClick={() => onDateUpdate(date.add(showedWeekdays, 'day'))}
						view="outlined"
						pin="brick-round"
					>
						<Icon data={ArrowRight} />
					</Button>
				</Flex>
				<SegmentedRadioGroup
					size="xl"
					value={showedWeekdays.toString()}
					options={[
						{ value: '1', content: '1 день' },
						{ value: '3', content: '3 дня' },
						{ value: '7', content: '7 дней' },
					]}
					onUpdate={value => {
						onShowedWeekdaysUpdate(Number(value) as 1 | 3 | 7);
					}}
				/>
			</Flex>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `50px repeat(${showedWeekdays}, minmax(0, 1fr))`,
					gridTemplateRows: `100px repeat(${hoursCount}, ${quantumTimeUnitHeight * quantaInHour}px)`,
				}}
			>
				{/* subgrid */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: `repeat(${lcm * showedWeekdays}, minmax(0, 1fr))`,
						gridTemplateRows: `repeat(${hoursCount * quantaInHour}, ${quantumTimeUnitHeight}px)`,
						position: 'relative',
						gridColumn: `2 / ${2 + showedWeekdays}`,
						gridRow: '2 / 12',
						containerType: 'size',
					}}
				>
					{transformedEvents.map(({ event, style }) => (
						<EventCard key={event.id} event={event} style={style} />
					))}

					{/* now line */}
					{dateTime().hour() < hourEnd &&
						dateTime().hour() > hourStart &&
						date.format('YYYY-MM-DD') === dateTime().format('YYYY-MM-DD') &&
						dateTime().weekday() < showedWeekdays && (
							<div
								style={{
									height: 2,
									background: 'red',
									position: 'absolute',
									borderRadius: 999,
									width: `calc(100% / ${showedWeekdays})`,
									transform: `translate(calc(100cqw / ${showedWeekdays} * ${dateTime().weekday()}), calc(100cqh / ${hoursCount} / 60 * ${currentOffset})`,
									top: 0,
									left: 0,
									zIndex: 3,
								}}
							>
								<div
									style={{
										height: 12,
										width: 12,
										position: 'absolute',
										top: -5,
										left: -1,
										background: 'red',
										borderRadius: 999,
									}}
								/>
							</div>
						)}
					{/* grid lines */}
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
						<div
							key={i}
							style={{
								position: 'absolute',
								top: quantumTimeUnitHeight * quantaInHour * i,
								left: 0,
								right: 0,
								background: 'var(--g-color-line-generic)',
								height: 1,
							}}
						/>
					))}

					<Overlay visible={isLoading}>
						<Loader size="l" />
					</Overlay>
					<Overlay visible={!isLoading && Boolean(overlay)}>{overlay}</Overlay>
				</div>

				{/* header */}
				{Array.from({ length: showedWeekdays }, (_, i) => i).map(i => (
					<Flex
						key={i}
						direction={'column'}
						gap={2}
						alignItems={'center'}
						justifyContent={'center'}
						style={{
							gridColumn: i + 1 + 1,
							gridRow: 1,
						}}
					>
						<Text>{period.start.add(i, 'day').format('dd').toUpperCase()}</Text>
						<Text variant="subheader-3">{period.start.add(i, 'day').format('DD')}</Text>
					</Flex>
				))}
				{/* hours */}
				{Array.from({ length: hoursCount }, (_, i) => i).map(i => (
					<Flex
						key={i}
						style={{
							gridColumn: 1,
							gridRowStart: i + 1 + 1,
							gridRowEnd: i + 1 + 1 + 1,
						}}
					>
						<Text variant="body-2" style={{ transform: 'translateY(-50%)', height: 'fit-content' }}>
							{i + 9}:00
						</Text>
					</Flex>
				))}
			</div>
		</Flex>
	);
};
