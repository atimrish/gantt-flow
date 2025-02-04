import * as s from './Textarea.css'
import {HTMLAttributes} from "react";
import {classes} from "@src/shared/lib/classes";

type Props = {
    value: string,
    setValue: (value: string) => void,
};
export const Textarea = (p: Props & HTMLAttributes<HTMLTextAreaElement>) => {
    const {value, setValue, ...other} = p;

    return (
        <div className={s.container}>
            <textarea
                {...other}
                value={value}
                onChange={e => setValue(e.currentTarget.value)}
                className={classes(s.textarea, p.className)}
            />
        </div>
    );
};