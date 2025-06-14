import * as s from './SidebarNavigation.css'
import LogoImage from '@src/shared/ui/assets/images/logo.png'
import HomeIcon from '@src/shared/ui/assets/images/navigation/home.svg'
import ProfileIcon from '@src/shared/ui/assets/images/navigation/profile.svg'
import ProjectIcon from '@src/shared/ui/assets/images/navigation/project.svg'
import SettingIcon from '@src/shared/ui/assets/images/navigation/settings.svg'
import TaskIcon from '@src/shared/ui/assets/images/navigation/task.svg'
import BellIcon from '@src/shared/ui/assets/images/navigation/bell.svg'
import {Tooltip} from "@src/shared/ui/tooltip";
import {useTranslation} from 'react-i18next'

export const SidebarNavigation = () => {
    const {t} = useTranslation()

    return (
        <div className={s.container}>
            <div className={s.logo}>
                <img src={LogoImage} alt=""/>
            </div>
            <div className={s.navigation}>
                <Tooltip title={t('sidebarTooltip.home')}>
                    <img src={HomeIcon} alt=""/>
                </Tooltip>

                <Tooltip title={t('sidebarTooltip.profile')}>
                    <img src={ProfileIcon} alt=""/>
                </Tooltip>

                <Tooltip title={t('sidebarTooltip.tasks')}>
                    <img src={TaskIcon} alt=""/>
                </Tooltip>

                <Tooltip title={t('sidebarTooltip.projects')}>
                    <img src={ProjectIcon} alt=""/>
                </Tooltip>

                <Tooltip title={t('sidebarTooltip.settings')}>
                    <img src={SettingIcon} alt=""/>
                </Tooltip>

                <Tooltip title={t('sidebarTooltip.notifies')}>
                    <img src={BellIcon} alt=""/>
                </Tooltip>
            </div>
        </div>
    );
};