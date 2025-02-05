import * as s from './Tooltip.css'
import {PropsWithChildren, useRef, useState} from "react";
import {createPortal} from "react-dom";

type Props = {
    title: string
}

type Coordinates = {
    left: number,
    top: number
}

export const Tooltip = (p: PropsWithChildren<Props>) => {
    const [mouseOver, setMouseOver] = useState(false)
    const [leaved, setLeaved] = useState(false)
    const bounds = useRef<Coordinates>({
        top: 0,
        left: 0,
    })

    const callbackRef = (node: HTMLDivElement | null) => {
        if (node) {
            const {left, bottom} = node.getBoundingClientRect()
            bounds.current.top = bottom
            bounds.current.left = left
        }
    }

    const handleMouseLeave = () => {
        const timeCall = performance.now()
        setLeaved(true)
        const animate = () => {
            if (performance.now() - timeCall >= 200) {
                setMouseOver(false)
            } else {
                requestAnimationFrame(animate)
            }
        }
        requestAnimationFrame(animate)
    }

    return (
        <div
            className={s.mouse_over_container}
            onMouseEnter={() => {
                setMouseOver(true)
                setLeaved(false)
            }}
            onMouseLeave={handleMouseLeave}
            ref={callbackRef}
        >
            {p.children}
            {mouseOver && createPortal(
                (
                    <div
                        className={s.tooltip}
                        data-leaved={leaved}
                        style={{
                            left: bounds.current.left,
                            top: bounds.current.top
                        }}
                    >{p.title}</div>
                ),
                document.getElementById('tooltip-portal')!
            )}
        </div>
    );
};