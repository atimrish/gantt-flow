import * as s from './SidebarNavigation.css'
import LogoImage from '@src/shared/ui/assets/images/logo.png'
import HomeIcon from '@src/shared/ui/assets/images/navigation/home.svg'
import ProfileIcon from '@src/shared/ui/assets/images/navigation/profile.svg'
import ProjectIcon from '@src/shared/ui/assets/images/navigation/project.svg'
import SettingIcon from '@src/shared/ui/assets/images/navigation/settings.svg'
import TaskIcon from '@src/shared/ui/assets/images/navigation/task.svg'
import BellIcon from '@src/shared/ui/assets/images/navigation/bell.svg'

type Props = {

};
export const SidebarNavigation = (p: Props) => {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                <img src={LogoImage} alt=""/>
            </div>
            <div className={s.navigation}>
                <img src={HomeIcon} alt=""/>
                <img src={ProfileIcon} alt=""/>
                <img src={TaskIcon} alt=""/>
                <img src={ProjectIcon} alt=""/>
                <img src={SettingIcon} alt=""/>
                <img src={BellIcon} alt=""/>
            </div>
        </div>
    );
};