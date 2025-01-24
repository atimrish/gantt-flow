import {Meta, StoryObj} from "@storybook/react";
import {SidebarTask} from "./SidebarTask";

const meta: Meta<typeof SidebarTask> = {
    title: 'Компоненты/SidebarTask',
    component: SidebarTask
}

export default meta

type Story = StoryObj<typeof SidebarTask>

export const Default: Story = {
    args: {
        taskName: 'Название',
        percent: 40
    }
}