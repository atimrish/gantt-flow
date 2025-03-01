/**
 * Метод для получения конечной даты для календаря
 * @param date
 */
export const getMonthEndDate = (date: Date) => {
    const now = new Date(date)
    now.setFullYear(now.getFullYear(), now.getMonth() + 1, 1)
    const weekDay = now.getDay()
    if (weekDay === 1) {
        now.setDate(now.getDate() - 1)
    } else if (weekDay !== 0) {
        now.setDate(now.getDate() + 7 - weekDay)
    }

    return now
}