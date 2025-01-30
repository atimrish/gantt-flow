import {SidebarNavigation} from "@src/widgets/sidebar-navigation/ui";
import {SidebarTasks} from "@src/widgets/sidebar-tasks/ui";
import * as s from './GanttPage.css'
import {ChartView} from "@src/pages/gantt/ui/chart-view";

export const GanttPage = () => {
    return (
        <div className={s.container}>
            <SidebarNavigation/>
            <SidebarTasks/>
            <ChartView/>
        </div>
    );
};