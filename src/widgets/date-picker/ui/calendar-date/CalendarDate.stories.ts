import {Meta, StoryObj} from "@storybook/react";
import {CalendarDate} from "@src/widgets/date-picker/ui/calendar-date/CalendarDate";

const meta: Meta<typeof CalendarDate> = {
    title: 'Компоненты/CalendarDate',
    component: CalendarDate
}

export default meta

type Story = StoryObj<typeof CalendarDate>

export const Default: Story = {
    args: {
        date: 1,
        currentMonth: false,
        currentDay: false
    }
}