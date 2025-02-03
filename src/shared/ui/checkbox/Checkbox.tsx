import * as s from './Checkbox.css'
import MarkImage from '@src/shared/ui/assets/images/mark.svg'
import {useId} from "react";

type Props = {
    checked: boolean,
    setChecked: (checked: boolean) => void,
};
export const Checkbox = (p: Props) => {
    const id = useId()

    return (
        <label className={s.label} id={id}>
            <input
                type="checkbox"
                id={id}
                checked={p.checked}
                onChange={(e) => p.setChecked(e.currentTarget.checked)}
            />

            <div className={s.checkbox_container}>
                <img className={s.mark} src={MarkImage} alt=" " />
            </div>
        </label>
    );
};