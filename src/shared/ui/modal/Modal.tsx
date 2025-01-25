import {createPortal} from "react-dom";
import {PropsWithChildren} from "react";
import * as s from './Modal.css'
import CrossIcon from '@src/shared/ui/assets/images/cross.svg'

type Props = {
    open: boolean,
    close: () => void,
}

export const Modal = (p: PropsWithChildren<Props>) => {
    return p.open && createPortal((
        <>
            <div
                className={s.backdrop}
                onClick={() => p.close()}
            />
            <div className={s.container}>
                <div className={s.modal_head}>
                    <button
                        className={s.close_button}
                        onClick={() => p.close()}
                    >
                        <img src={CrossIcon} alt=""/>
                    </button>
                </div>
                <div>
                    {p.children}
                </div>
            </div>
        </>
    ), document.getElementById('modal-portal')!)
}
