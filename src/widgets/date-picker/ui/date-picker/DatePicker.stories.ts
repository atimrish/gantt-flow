import {Meta, StoryObj} from "@storybook/react";
import {DatePicker} from "@src/widgets/date-picker/ui/date-picker/DatePicker";

const meta: Meta<typeof DatePicker> = {
    title: 'Компоненты/DatePicker',
    component: DatePicker
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {}
