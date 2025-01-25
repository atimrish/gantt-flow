import {Meta, StoryObj} from "@storybook/react";
import {SidebarTasks} from "@src/widgets/sidebar-tasks/ui/SidebarTasks";

const meta: Meta<typeof SidebarTasks> = {
    title: 'Компоненты/SidebarTasks',
    component: SidebarTasks,
}

export default meta

type Story = StoryObj<typeof SidebarTasks>

export const Default: Story = {

}