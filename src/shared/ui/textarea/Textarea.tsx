import * as s from './Textarea.css'
import {HTMLAttributes} from "react";
import {classes} from "@src/shared/lib/classes";

type Props = {
    value: string,
    setValue: (value: string) => void,
};
export const Textarea = (p: Props & HTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <textarea
            {...p}
            value={p.value}
            onChange={e => p.setValue(e.currentTarget.value)}
            className={classes(s.textarea, p.className)}
        />
    );
};