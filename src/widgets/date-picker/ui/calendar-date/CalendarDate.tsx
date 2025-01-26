import * as s from './CalendarDate.css'
import {Typography} from "@src/shared/ui/typography";
import {useDateInputContext} from "@src/widgets/date-picker/ui/date-input";

type Props = {
    date: number
    currentMonth: boolean,
    currentDay: boolean,
    dateString: string,
};
export const CalendarDate = (p: Props) => {
    const currentClass = p.currentMonth ? s.current : s.not_current
    const {setValue} = useDateInputContext()

    const onClickHandler = () => {
        setValue(p.dateString)
    }

    return (
        <button
            className={s.container}
            data-current-day={p.currentDay}
            onClick={onClickHandler}
        >
            <Typography.Text className={currentClass}>
                {p.date}
            </Typography.Text>
        </button>
    );
};