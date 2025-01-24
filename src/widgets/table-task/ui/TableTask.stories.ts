import {Meta, StoryObj} from "@storybook/react";
import {TableTask} from "./TableTask";

const meta: Meta<typeof TableTask> = {
    title: 'Компоненты/TableTask',
    component: TableTask
}

export default meta

type Story = StoryObj<typeof TableTask>

export const Default: Story = {
    args: {
        percent: 30,
        taskName: 'Какое-то название'
    }
}
