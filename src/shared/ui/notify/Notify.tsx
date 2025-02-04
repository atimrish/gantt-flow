import * as s from './Notify.css'
import SuccessIcon from '@src/shared/ui/assets/images/notify/success.svg'
import WarningIcon from '@src/shared/ui/assets/images/notify/warning.svg'
import ErrorIcon from '@src/shared/ui/assets/images/notify/error.svg'
import InfoIcon from '@src/shared/ui/assets/images/notify/info.svg'
import {Typography} from "@src/shared/ui/typography";

type Props = {
    type: 'success' | 'warning' | 'info' | 'error',
    title: string,
    description?: string,
};

const icons: Record<Props['type'], string> = {
    success: SuccessIcon,
    warning: WarningIcon,
    info: InfoIcon,
    error: ErrorIcon
}

export const Notify = (p: Props) => {
    return (
        <div className={s.container}>
            <img className={s.icon} src={icons[p.type]} alt=""/>

            <div className={s.text_block}>
                <Typography.Text className={s.title}>{p.title}</Typography.Text>
                <Typography.Text className={s.description}>{p.description}</Typography.Text>
            </div>

            <svg
                width="16"
                height="16"
                viewBox="0 0 352.817 352.817"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path id="path"
                      d="M9.76 9.76C-3.26 22.78 -3.26 43.88 9.76 56.9L129.26 176.4L9.76 295.91C-3.26 308.93 -3.26 330.03 9.76 343.05C22.78 356.07 43.88 356.07 56.9 343.05L176.4 223.54L295.91 343.05C308.93 356.07 330.03 356.07 343.05 343.05C356.07 330.03 356.07 308.93 343.05 295.91L223.54 176.4L343.05 56.9C356.07 43.88 356.07 22.78 343.05 9.76C330.03 -3.26 308.93 -3.26 295.91 9.76L176.4 129.26L56.9 9.76C43.88 -3.26 22.78 -3.26 9.76 9.76Z"
                      fill="var(--light-gray)"
                      fillOpacity="1.000000"
                      fillRule="nonzero"
                />
            </svg>
        </div>
    );
};