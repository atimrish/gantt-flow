import {Meta, StoryObj} from "@storybook/react";
import {TextInput} from "@src/shared/ui/text-input/TextInput";
import {useState} from "react";

const meta: Meta<typeof TextInput> = {
    title: 'Компоненты/TextInput',
    component: TextInput,
}

export default meta

type Story = StoryObj<typeof TextInput>

export const Default: Story = {
    decorators: [
        (Story, options) => {
            const [value, setValue] = useState('')
            return (
                <Story {...options} args={{value, setValue}} />
            )
        }
    ]
}