import {Meta, StoryObj} from "@storybook/react";
import {DateInput} from "@src/widgets/date-picker/ui/date-input/DateInput";
import {useState} from "react";
import {Story} from "@storybook/blocks";

const meta: Meta<typeof DateInput> = {
    title: 'Компоненты/DateInput',
    component: DateInput,
    decorators: [
        (Story, options) => {
            const [value, setValue] = useState('')
            return (
                <Story {...options} args={{value, setValue}} />
            )
        }
    ],
}

export default meta

type Story = StoryObj<typeof DateInput>

export const Default: Story = {}