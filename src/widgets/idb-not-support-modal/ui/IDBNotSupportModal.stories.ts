import {Meta, StoryObj} from "@storybook/react";
import {IDBNotSupportModal} from "@src/widgets/idb-not-support-modal/ui/IDBNotSupportModal";

const meta: Meta<typeof IDBNotSupportModal> = {
    title: 'Компоненты/IDBNotSupportModal',
    component: IDBNotSupportModal,
}

export default meta

type Story = StoryObj<typeof IDBNotSupportModal>

export const Default: Story = {
    args: {
        open: false,
        close: () => {}
    }
}