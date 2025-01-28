import * as s from './Button.css'
import {HTMLAttributes, PropsWithChildren} from "react";
import {classes} from "@src/shared/lib/classes";

export const Button = (p: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) => {
    return (
        <button {...p} className={classes(s.button, p.className)}>
            {p.children}
        </button>
    );
};