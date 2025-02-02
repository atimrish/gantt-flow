import * as s from './TableTask.css'
import {Typography} from "@src/shared/ui/typography";
import ButtonIcon from '@src/shared/ui/assets/images/table-task-button.svg'
import {useRef} from "react";
import {observer} from "mobx-react";
import {useRootContext} from "@src/app/providers/rootProvider";
import {updateTask} from "@src/entities/task/api/updateTask";
import {useThrottle} from "@src/shared/lib/use-throttle";

type Props = {
    id: IDBValidKey
};
export const TableTask = observer((p: Props) => {
    const {task} = useRootContext()
    const currentTask = task.tasks.find(i => i.id === p.id)
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null)

    let startMoveX = 0
    let initWidth = 0
    let initLeft = 0

    const updateDate = async (x: number, y: number, key: 'start' | 'end') => {
        const targetElem = document.elementsFromPoint(x, y).find(i => {
            return Boolean(i.attributes.getNamedItem('data-date-string'))
        })

        if (targetElem && currentTask) {
            //обновить
            const targetDate = targetElem.attributes.getNamedItem('data-date-string')!
            const newEndDate = targetDate.value
            await updateTask({...currentTask, [key]: newEndDate})
            await task.fetch()
        }
    }

    const handleMouseUpLeft = (e: MouseEvent) => {
        startMoveX = 0
        updateDate(e.clientX, e.clientY, 'start')
        document.removeEventListener('mouseup', handleMouseUpLeft)
        document.removeEventListener('mousemove', handleMoveLeft)
    }

    const handleMouseUpRight = (e: MouseEvent) => {
        startMoveX = 0
        updateDate(e.clientX, e.clientY, 'end')
        document.removeEventListener('mouseup', handleMouseUpRight)
        document.removeEventListener('mousemove', handleMoveRight)
    }

    const handleMoveLeft = useThrottle((e: MouseEvent) => {
        if (parentRef.current) {
            const diff = e.clientX - startMoveX
            parentRef.current.style.left = initLeft + diff + 'px'
            parentRef.current.style.width = initWidth - diff + 'px'
        }
    }, 100)

    const handleMoveRight = useThrottle((e: MouseEvent) => {
        if (containerRef.current) {
            containerRef.current.style.width = initWidth + e.clientX - startMoveX + 'px'
        }
    }, 100)

    const handleMouseDownLeft = (e: React.MouseEvent) => {
        e.stopPropagation()
        startMoveX = e.clientX
        document.addEventListener('mouseup', handleMouseUpLeft)
        document.addEventListener('mousemove', handleMoveLeft)
    }

    const handleMouseDownRight = (e: React.MouseEvent) => {
        e.stopPropagation()
        startMoveX = e.clientX
        document.addEventListener('mouseup', handleMouseUpRight)
        document.addEventListener('mousemove', handleMoveRight)
    }

    const callbackRef = (node: HTMLDivElement) => {
        if (node) {
            initWidth = node.clientWidth
            containerRef.current = node
            const parent = node.parentNode as HTMLDivElement
            initLeft = parent.offsetLeft
            parentRef.current = parent
        } else {
            document.removeEventListener('mouseup', handleMouseUpRight)
            document.removeEventListener('mousemove', handleMoveRight)
            document.removeEventListener('mouseup', handleMouseUpLeft)
            document.removeEventListener('mousemove', handleMoveLeft)
        }
    }

    return (
        <div
            className={s.container}
            ref={callbackRef}
        >
            <div
                className={s.percent_back}
                style={{width: `${currentTask?.progress}%`}}
            />
            <div className={s.content}>
                <img
                    src={ButtonIcon}
                    alt=""
                    onMouseDown={handleMouseDownLeft}
                    draggable="false"
                />
                <Typography.Text className={s.text}>{currentTask?.name}</Typography.Text>
                <Typography.Text className={s.text}>{currentTask?.progress}%</Typography.Text>
                <img
                    src={ButtonIcon}
                    alt=""
                    onMouseDown={handleMouseDownRight}
                    draggable="false"
                />
            </div>
        </div>
    );
})