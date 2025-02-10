import * as s from './TextInput.css'
import {forwardRef, HTMLAttributes} from "react";
import {classes} from "@src/shared/lib/classes";

type Props = {
    value: string
    setValue: (value: string) => void
    placeholder?: string,
    invalid?: boolean
};
export const TextInput = forwardRef<HTMLInputElement, Props & HTMLAttributes<HTMLInputElement>>(
    (p, ref) => {
        const {value, setValue, invalid, ...other} = p

        return (
            <div className={s.container}>
                <input
                    {...other}
                    data-invalid={invalid}
                    type="text"
                    className={classes(s.input, p.className)}
                    value={value}
                    placeholder={p.placeholder}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    ref={ref}
                />
            </div>
        );
    }
)