import * as s from './DatePicker.css'
import {Typography} from "@src/shared/ui/typography";
import {classes} from "@src/shared/lib/classes";
import {NextIcon} from "@src/widgets/date-picker/ui/next-icon";
import {CalendarDate} from "@src/widgets/date-picker/ui/calendar-date";
import {getMonthDates} from "@src/widgets/date-picker/lib/get-month-dates";
import {useState} from "react";
import {getDateTitle} from "@src/widgets/date-picker/lib/get-date-title";

type Props = {}
export const DatePicker = (p: Props) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const dates = getMonthDates(currentMonth)
    const now = new Date()
    now.setMonth(currentMonth)

    return (
        <div className={s.container}>
            <div className={s.top_block}>
                <Typography.Heading className={s.top_text}>{getDateTitle(now)}</Typography.Heading>
                <button
                    className={classes(s.top_button, s.rotated_image)}
                    onClick={() => setCurrentMonth(prev => prev - 1)}
                >
                    <NextIcon/>
                </button>
                <button
                    className={s.top_button}
                    onClick={() => setCurrentMonth(prev => prev + 1)}
                >
                    <NextIcon/>
                </button>
            </div>

            <div className={s.week}>
                <Typography.Text>Пн</Typography.Text>
                <Typography.Text>Вт</Typography.Text>
                <Typography.Text>Ср</Typography.Text>
                <Typography.Text>Чт</Typography.Text>
                <Typography.Text>Пт</Typography.Text>
                <Typography.Text>Сб</Typography.Text>
                <Typography.Text>Вс</Typography.Text>
            </div>

            <div className={s.calendar}>
                {dates.map(i => (
                    <CalendarDate
                        date={i.date}
                        currentMonth={i.currentMonth}
                        currentDay={i.currentDate}
                        dateString={i.dateString}
                        key={i.dateString}
                    />
                ))}
            </div>
        </div>
    );
};