import {createPortal} from "react-dom";
import {PropsWithChildren, useRef} from "react";
import * as s from './Modal.css'
import CrossIcon from '@src/shared/ui/assets/images/cross.svg'

export type ModalProps = {
    open: boolean,
    close: () => void,
}

export const Modal = (p: PropsWithChildren<ModalProps>) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const backdropRef = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        containerRef.current?.classList.add(s.fade_out)
        backdropRef.current?.classList.add(s.fade_out)
        const timeCall = performance.now()
        const timeWait = () => {
            if (performance.now() - timeCall >= 300) {
                p.close()
            } else {
                requestAnimationFrame(timeWait)
            }
        }
        requestAnimationFrame(timeWait)
    }

    return p.open && createPortal((
        <>
            <div
                className={s.backdrop}
                onClick={handleClick}
                ref={backdropRef}
            />
            <div
                className={s.container}
                ref={containerRef}
            >
                <div className={s.modal_head}>
                    <button
                        className={s.close_button}
                        onClick={handleClick}
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
