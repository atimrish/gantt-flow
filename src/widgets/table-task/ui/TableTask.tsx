import * as s from './TableTask.css'
import {Typography} from "@src/shared/ui/typography";
import ButtonIcon from '@src/shared/ui/assets/images/table-task-button.svg'

type Props = {
    taskName: string,
    percent: number
};
export const TableTask = (p: Props) => {
    return (
        <div className={s.container}>
            <div
                className={s.percent_back}
                style={{width: `${p.percent}%`}}
            />
            <div className={s.content}>
                <img
                    src={ButtonIcon}
                    alt=""
                    onMouseDown={(e) => {
                        e.stopPropagation()
                    }}
                />
                <Typography.Text className={s.text}>{p.taskName}</Typography.Text>
                <Typography.Text className={s.text}>{p.percent}%</Typography.Text>
                <img
                    src={ButtonIcon}
                    alt=""
                    onMouseDown={(e) => {
                        e.stopPropagation()
                    }}
                />
            </div>
        </div>
    );
};