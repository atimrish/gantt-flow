import * as s from './ContextMenu.css'
import {Checkbox} from "@src/shared/ui/checkbox";
import {Typography} from "@src/shared/ui/typography";
import EditIcon from '@src/shared/ui/assets/images/edit.svg'
import ColorIcon from '@src/shared/ui/assets/images/color.svg'
import ProgressIcon from '@src/shared/ui/assets/images/progress.svg'
import DeleteIcon from '@src/shared/ui/assets/images/delete.svg'
import NextIcon from '@src/shared/ui/assets/images/next.svg'
import {classes} from "@src/shared/lib/classes";
import {colors} from '@src/widgets/context-menu/config'

export const ContextMenu = () => {
    return (
        <div className={s.container}>
            <div
                className={s.top_block}
            >
                <Checkbox/>
                <Typography.Text className={s.font_size}>Выполнено</Typography.Text>
            </div>

            <div className={s.bottom_block}>
                <img src={EditIcon} alt=""/>
                <Typography.Text className={s.font_size}>Редактировать</Typography.Text>
            </div>

            <div className={classes(s.bottom_block, s.submenu_trigger)}>
                <img src={ColorIcon} alt=""/>
                <Typography.Text className={s.font_size}>Цвет</Typography.Text>
                <img className={s.next_icon} src={NextIcon} alt=""/>

                <div className={s.submenu}>
                    <div className={s.color_picker}>
                        {Object.values(colors).map(i => (
                            <div className={s.circle} style={{backgroundColor: i}}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className={classes(s.bottom_block, s.submenu_trigger)}>
                <img src={ProgressIcon} alt=""/>
                <Typography.Text className={s.font_size}>Прогресс</Typography.Text>
                <img className={s.next_icon} src={NextIcon} alt=""/>

                <div className={s.submenu}>
                    <div className={s.progress_picker}>
                        <Typography.Text className={s.progress}>10%</Typography.Text>
                        <Typography.Text className={s.progress}>20%</Typography.Text>
                        <Typography.Text className={s.progress}>30%</Typography.Text>
                        <Typography.Text className={s.progress}>40%</Typography.Text>
                        <Typography.Text className={s.progress}>50%</Typography.Text>
                        <Typography.Text className={s.progress}>60%</Typography.Text>
                        <Typography.Text className={s.progress}>70%</Typography.Text>
                        <Typography.Text className={s.progress}>80%</Typography.Text>
                        <Typography.Text className={s.progress}>90%</Typography.Text>
                        <Typography.Text className={s.progress}>100%</Typography.Text>
                    </div>
                </div>
            </div>

            <div className={s.bottom_block}>
                <img src={DeleteIcon} alt=""/>
                <Typography.Text className={s.font_size}>Удалить</Typography.Text>
            </div>
        </div>
    );
};