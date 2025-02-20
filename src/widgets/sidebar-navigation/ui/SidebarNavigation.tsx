import * as s from './SidebarNavigation.css'
import LogoImage from '@src/shared/ui/assets/images/logo.png'
import HomeIcon from '@src/shared/ui/assets/images/navigation/home.svg'
import ProfileIcon from '@src/shared/ui/assets/images/navigation/profile.svg'
import ProjectIcon from '@src/shared/ui/assets/images/navigation/project.svg'
import SettingIcon from '@src/shared/ui/assets/images/navigation/settings.svg'
import TaskIcon from '@src/shared/ui/assets/images/navigation/task.svg'
import BellIcon from '@src/shared/ui/assets/images/navigation/bell.svg'
import {Tooltip} from "@src/shared/ui/tooltip";

export const SidebarNavigation = () => {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                <img src={LogoImage} alt=""/>
            </div>
            <div className={s.navigation}>
                <Tooltip title="Домашняя страница (в разработке)">
                    <img src={HomeIcon} alt=""/>
                </Tooltip>

                <Tooltip title="Профиль (в разработке)">
                    <img src={ProfileIcon} alt=""/>
                </Tooltip>

                <Tooltip title="Задачи (в разработке)">
                    <img src={TaskIcon} alt=""/>
                </Tooltip>

                <Tooltip title="Проекты (в разработке)">
                    <img src={ProjectIcon} alt=""/>
                </Tooltip>

                <Tooltip title="Настройки (в разработке)">
                    <img src={SettingIcon} alt=""/>
                </Tooltip>

                <Tooltip title="Уведомления (в разработке)">
                    <img src={BellIcon} alt=""/>
                </Tooltip>
            </div>
        </div>
    );
};