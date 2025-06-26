import {Meta, StoryObj} from "@storybook/react";
import {Dropdown} from "./Dropdown";
import {useDropdown} from "../lib/useDropdown";

const meta: Meta<typeof Dropdown> = {
	title: "Компоненты/Dropdown",
	component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
	render: () => {
		const dropdownState = useDropdown([
			{
				node: "Test",
				value: 1,
			},
			{
				node: "Test2",
				value: 2,
			},
		]);

		return <Dropdown {...dropdownState} />;
	},
};
