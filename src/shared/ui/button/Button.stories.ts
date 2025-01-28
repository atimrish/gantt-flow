import {Meta, StoryObj} from "@storybook/react";
import {Button} from "./Button";

const meta: Meta<typeof Button> = {
    title: 'Компоненты/Button',
    component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
    args: {
        children: 'Какой-то текст'
    }
}