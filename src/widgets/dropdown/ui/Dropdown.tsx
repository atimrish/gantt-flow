import {useEffect, useRef, useState} from "react";
import {useDropdown} from "../lib/useDropdown";
import * as s from "./Dropdown.css";
import {createPortal} from "react-dom";

type DropdownProps<T extends any> = ReturnType<typeof useDropdown<T>>;

export const Dropdown = <T extends any>({selectedId, setSelectedId, options}: DropdownProps<T>) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const coordsRef = useRef<{left: number; top: number; width: number}>({left: 0, top: 0, width: 0});

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (buttonRef.current) {
			const {top, height, left, width} = buttonRef.current.getBoundingClientRect();
			coordsRef.current = {top: top + height, left, width};
		}
	}, []);

	return (
		<button
			className={s.focusable}
			onFocus={() => setOpen(true)}
			onBlur={() => {
				setTimeout(() => setOpen(false), 100);
			}}
			ref={buttonRef}>
			<div className={s.main_dropdown}>{options[selectedId].node}</div>

			{open &&
				createPortal(
					<div
						className={s.drop_list}
						style={{
							left: coordsRef.current.left,
							top: coordsRef.current.top,
							minWidth: coordsRef.current.width + "px",
						}}>
						{options.map(({node}, index) => (
							<div key={index} onClick={() => setSelectedId(index)}>
								{node}
							</div>
						))}
					</div>,
					document.getElementById("dropdown-portal")!
				)}
		</button>
	);
};
