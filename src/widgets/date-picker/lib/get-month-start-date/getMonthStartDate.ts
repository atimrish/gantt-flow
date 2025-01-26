/**
 * Метод для получения начальной даты для календаря
 * @param date
 */
export const getMonthStartDate = (date: Date) => {
    const now = new Date(date)
    now.setDate(1)
    const weekDay = now.getDay()
    now.setDate(now.getDate() - (weekDay - 1))
    return now
}