import {Weekdays} from "@src/shared/model/types";

export const getWeekday = (date: Date): Weekdays =>
    date.toLocaleDateString(
        'ru-RU',
        {weekday: 'short'}
    ).toUpperCase() as Weekdays