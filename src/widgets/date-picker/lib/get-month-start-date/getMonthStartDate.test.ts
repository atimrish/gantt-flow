import {describe, test, expect} from '@jest/globals'
import {getMonthStartDate} from "@src/widgets/date-picker/lib/get-month-start-date";

describe('getMonthStartDate', () => {
    test('должна возвратиться первая дата для календаря месяца', () => {
        const date = new Date()
        date.setFullYear(2025, 0, 26)

        const expected = new Date()
        expected.setFullYear(2024, 11, 30)

        expect(getMonthStartDate(date).toDateString()).toBe(expected.toDateString())
    })
})