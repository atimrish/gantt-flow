import * as s from './ChartColumn.css'

type Props = {
    dateString: string
}

export const ChartColumn = (p: Props) => {
    return (
        <div className={s.column} data-date-string={p.dateString} />
    );
};