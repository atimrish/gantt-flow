import {Meta, StoryObj} from "@storybook/react";
import {SidebarNavigation} from "@src/widgets/sidebar-navigation/ui/SidebarNavigation";

const meta: Meta<typeof SidebarNavigation> = {
    title: 'Компоненты/SidebarNavigation',
    component: SidebarNavigation
}

export default meta

type Story = StoryObj<typeof SidebarNavigation>

export const Default: Story = {

}