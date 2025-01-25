import * as s from './SidebarTasks.css'
import {Typography} from "@src/shared/ui/typography/Typography";
import {SidebarTask} from "@src/shared/ui/sidebar-task";

export const SidebarTasks = () => {
    return (
        <div className={s.container}>
            <div className={s.top_block}>
                <Typography.Heading className={s.project_title}>Название проетка</Typography.Heading>

                <div className={s.sidebar_heading}>
                    <Typography.Text>Задача</Typography.Text>
                    <Typography.Text>Прогресс</Typography.Text>
                </div>

                <div className={s.overflow_block}>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                    <SidebarTask taskName={'Название задачи'} percent={67}/>
                </div>
            </div>
            <button className={s.button}>
                <svg
                    width="24.000000"
                    height="24.000000"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        id="path"
                        d="M2.02 13.98L2 14C0.88 14 0 13.12 0 12C0 10.88 0.88 10 2 10L2.02 10.02L2.02 13.98ZM21.98 10.02L22 10C23.12 10 24 10.88 24 12C24 13.12 23.12 14 22 14L21.98 13.98L21.98 10.02ZM10.02 2.01L10 2C10 0.88 10.88 0 12 0C13.12 0 14 0.88 14 2L13.98 2.01L10.02 2.01ZM13.98 21.98L14 22C14 23.12 13.12 24 12 24C10.88 24 10 23.12 10 22L10.02 21.98L13.98 21.98Z"
                        fill="#26354C"
                        fillOpacity="0"
                        fillRule="nonzero"
                    />
                    <path
                        id="path"
                        d="M2 12L22 12M12 2L12 22"
                        stroke="#26354C"
                        strokeOpacity="1.000000"
                        strokeWidth="4.000000"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
                <Typography.Text>Новая задача</Typography.Text>
            </button>
        </div>
    );
};