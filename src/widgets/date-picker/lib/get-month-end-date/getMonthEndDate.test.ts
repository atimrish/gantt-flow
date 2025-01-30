import {describe, test, expect} from '@jest/globals'
import {getMonthEndDate} from "@src/widgets/date-picker/lib/get-month-end-date";

describe('getMonthStartDate', () => {
    test('должна возвратиться конечная дата для календаря месяца', () => {
        const date = new Date()
        date.setFullYear(2025, 0, 26)

        const expected = new Date()
        expected.setFullYear(2025, 1, 2)

        expect(getMonthEndDate(date).toDateString()).toBe(expected.toDateString())
    })

    test('должна возвратиться конечная дата для календаря месяца', () => {
        const date = new Date()
        date.setFullYear(2025, 0, 29)

        const expected = new Date()
        expected.setFullYear(2025, 1, 2)

        expect(getMonthEndDate(date).toDateString()).toBe(expected.toDateString())
    })
})