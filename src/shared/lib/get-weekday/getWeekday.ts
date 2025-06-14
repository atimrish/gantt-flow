import {Weekdays} from "@src/shared/model/types";

export const getWeekday = (date: Date): Weekdays =>
    date.toLocaleDateString(
        'en-En',
        {weekday: 'short'}
    ).toLowerCase() as Weekdays