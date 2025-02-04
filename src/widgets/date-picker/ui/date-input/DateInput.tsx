import * as s from './DateInput.css'
import CalendarIcon from '@src/shared/ui/assets/images/calendar.svg'
import {DatePicker} from "@src/widgets/date-picker/ui/date-picker";
import {createContext, useContext, useRef} from "react";

type Props = {
    value: string,
    setValue: (value: string) => void,
    invalid?: boolean
};

interface IDateInputContext {
    value: string,
    setValue: (value: string) => void
}

const DateInputContext = createContext<IDateInputContext>({
    value: '',
    setValue: () => {},
})

export const useDateInputContext = () => useContext(DateInputContext)

export const DateInput = ({value, setValue, invalid}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <DateInputContext.Provider
            value={{ value, setValue }}
        >
            <div
                className={s.container}
                data-invalid={invalid}
            >
                <div className={s.date_picker_container}>
                    <DatePicker/>
                </div>
                <input
                    ref={inputRef}
                    className={s.input}
                    type="text"
                    value={value}
                    placeholder="00.00.0000"
                    readOnly
                />
                <img className={s.icon} src={CalendarIcon} alt=""/>
            </div>
        </DateInputContext.Provider>
    );
};