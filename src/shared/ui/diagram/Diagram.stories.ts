import {Meta, StoryObj} from "@storybook/react";
import {Diagram} from "./Diagram";

const meta: Meta<typeof Diagram> = {
    title: 'Компоненты/Diagram',
    component: Diagram
}

export default meta

type Story = StoryObj<typeof Diagram>

export const Default: Story = {
    args: {
        value: 75
    }
}