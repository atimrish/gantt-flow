import {Dispatch, SetStateAction, useState} from "react";
import {DropdownOption} from "../model";

type DropdownState<T extends any> = {
	selectedId: number;
	setSelectedId: Dispatch<SetStateAction<number>>;
	options: DropdownOption<T>[];
};

export const useDropdown = <T extends any>(options: DropdownOption<T>[]): DropdownState<T> => {
	const [selectedId, setSelectedId] = useState(0);
	return {selectedId, setSelectedId, options};
};
