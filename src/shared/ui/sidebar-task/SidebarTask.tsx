import * as s from './SidebarTask.css'
import {Typography} from "@src/shared/ui/typography";
import {Diagram} from "@src/shared/ui/diagram";

type Props = {
    taskName: string,
    percent: number
}
export const SidebarTask = (p: Props) => {
    return (
        <div className={s.container}>
            <Typography.Text>{p.taskName}</Typography.Text>
            <div className={s.diagram}>
                <Diagram value={p.percent}/>
            </div>
            <Typography.Text>{p.percent}%</Typography.Text>
        </div>
    );
};