import * as s from './TableHeadElement.css'

type Props = {
    current: boolean,
    day: 'ПН' | 'ВТ' | 'СР' | 'ЧТ' | 'ПТ' | 'СБ' | 'ВС',
    date: number
}

export const TableHeadElement = (p: Props) => {
    return (
        <div
            className={s.container}
            data-current={p.current}
        >
            <div className={s.day}>{p.day}</div>
            <div className={s.date}>{p.date}</div>
        </div>
    );
};