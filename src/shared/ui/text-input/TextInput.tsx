import * as s from './TextInput.css'
import {HTMLAttributes} from "react";
import {classes} from "@src/shared/lib/classes";

type Props = {
    value: string
    setValue: (value: string) => void
    placeholder?: string
};
export const TextInput = (p: Props & HTMLAttributes<HTMLInputElement>) => {
    return (
        <div>
            <input
                {...p}
                type="text"
                className={classes(s.input, p.className)}
                value={p.value}
                placeholder={p.placeholder}
                onChange={(e) => p.setValue(e.currentTarget.value)}
            />
        </div>
    );
};