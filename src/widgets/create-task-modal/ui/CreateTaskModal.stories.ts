import {CreateTaskModal} from "@src/widgets/create-task-modal/ui/CreateTaskModal";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof CreateTaskModal> = {
    component: CreateTaskModal,
    title: 'Компоненты/CreateTaskModal',
}

export default meta

type Story = StoryObj<typeof CreateTaskModal>

export const Default: Story = {
    args: {
        open: false,
        close: () => {}
    }
}