import {Meta, StoryObj} from "@storybook/react";
import {Typography} from "@src/shared/ui/typography/Typography";

const meta: Meta<typeof Typography.Heading> = {
    title: 'Компоненты/Typography',
    component: Typography.Heading,
}

export default meta

type Story = StoryObj<typeof Typography.Heading>

export const Default: Story = {
    args: {
        children: 'Какой-то текст',
        as: 'h2'
    }
}