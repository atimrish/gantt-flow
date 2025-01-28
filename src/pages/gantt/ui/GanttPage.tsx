import {SidebarNavigation} from "@src/widgets/sidebar-navigation/ui";
import {SidebarTasks} from "@src/widgets/sidebar-tasks/ui";
import * as s from './GanttPage.css'

export const GanttPage = () => {
    return (
        <div className={s.container}>
            <SidebarNavigation/>
            <SidebarTasks/>
        </div>
    );
};