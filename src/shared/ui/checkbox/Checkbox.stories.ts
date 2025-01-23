import {Meta, StoryObj} from "@storybook/react";
import {Checkbox} from "@src/shared/ui/checkbox/Checkbox";

const meta: Meta<typeof Checkbox> = {
    title: 'Компоненты/Checkbox',
    component: Checkbox
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
    args: {
        checked: false
    }
}