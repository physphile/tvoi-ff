import { Schedule, type ScheduleProps } from './Schedule';

type IrdomScheduleProps = Pick<
	ScheduleProps,
	| 'events'
	| 'date'
	| 'onDateUpdate'
	| 'isLoading'
	| 'overlay'
	| 'onShowedWeekdaysUpdate'
	| 'showedWeekdays'
	| 'period'
>;

export const IrdomSchedule = (props: IrdomScheduleProps) => {
	return (
		<Schedule {...props} hourEnd={19} hourStart={9} quantumTimeUnit={5} quantumTimeUnitHeight={8} />
	);
};
