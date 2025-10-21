import { Schedule, type ScheduleProps } from "./Schedule";

type IrdomScheduleProps = Pick<
	ScheduleProps,
	"date" | "events" | "isLoading" | "onDateUpdate" | "onShowedWeekdaysUpdate" | "overlay" | "period" | "showedWeekdays"
>;

export const IrdomSchedule = (props: IrdomScheduleProps) => {
	return <Schedule {...props} hourEnd={19} hourStart={9} quantumTimeUnit={5} quantumTimeUnitHeight={8} />;
};
