import {Textarea} from "@src/shared/ui/textarea/Textarea";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Textarea> = {
    title: 'Компоненты/Textarea',
    component: Textarea,
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {

}