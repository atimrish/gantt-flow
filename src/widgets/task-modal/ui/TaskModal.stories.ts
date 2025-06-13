import {TaskModal} from "@src/widgets/task-modal/ui/TaskModal";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof TaskModal> = {
	component: TaskModal,
	title: "Компоненты/TaskModal",
};

export default meta;

type Story = StoryObj<typeof TaskModal>;

export const Default: Story = {
	args: {
		modal: {
			open: false,
			close: () => {},
		},
	},
};
