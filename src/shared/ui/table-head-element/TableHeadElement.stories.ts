import {Meta, StoryObj} from "@storybook/react";
import {TableHeadElement} from "./TableHeadElement";

const meta: Meta<typeof TableHeadElement> = {
    title: 'Компоненты/TableHeadElement',
    component: TableHeadElement,
}

export default meta

type Story = StoryObj<typeof TableHeadElement>

export const Default: Story = {
    args: {
        current: false,
        day: 'mon',
        date: 18
    }
}