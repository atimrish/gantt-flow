import {Meta, StoryObj} from "@storybook/react";
import {ContextMenu} from "@src/widgets/context-menu/ui/ContextMenu";

const meta: Meta<typeof ContextMenu> = {
    title: 'Компоненты/ContextMenu',
    component: ContextMenu,
}

export default meta

type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {

}