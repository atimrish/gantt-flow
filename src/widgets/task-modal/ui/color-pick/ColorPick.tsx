import * as s from "@src/widgets/task-modal/ui/color-pick/ColorPick.css";
import {useId} from "react";

type Props = {
    value: string;
    checked: boolean,
    onChange: () => void,
};
export const ColorPick = (p: Props) => {
    const id = useId()
    return (
        <label
            htmlFor={id}
            className={s.color_label}
            style={{color: p.value}}
        >
            <input
                type="radio"
                name="color"
                value={p.value}
                id={id}
                checked={p.checked}
                onChange={p.onChange}
            />
            <div className={s.color_input} style={{backgroundColor: p.value}}/>
        </label>
    );
};