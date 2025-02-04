import {Meta, StoryObj} from "@storybook/react";
import {Notify} from "./Notify";

const meta: Meta<typeof Notify> = {
    title: 'Компоненты/Notify',
    component: Notify
}

export default meta

type Story = StoryObj<typeof Notify>

export const Default: Story = {
    args: {
        type: 'success'
    }
}