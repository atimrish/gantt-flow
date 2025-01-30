import * as s from './ChartView.css'
import {Typography} from "@src/shared/ui/typography";
import {TableHeadElement} from "@src/shared/ui/table-head-element/TableHeadElement";
import {ChartColumn} from "@src/pages/gantt/ui/chart-column";
import {useEffect, useRef, useState} from "react";
import {columnWidth} from "@src/pages/gantt/config";
import {getDefaultDate} from "@src/pages/gantt/lib/get-default-date";
import {Weekdays} from "@src/shared/model/types";
import {getWeekday} from "@src/shared/lib/get-weekday";
import {splitDate} from "@src/widgets/create-task-modal/lib/split-date";

type ChartDates = Array<{
    date: number
    dateString: string
    weekday: Weekdays,
    currentDate: boolean
}>

const defaultOffsetX = columnWidth * -6

export const ChartView = () => {
    const viewRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);

    const nowString = new Date().toLocaleDateString();
    const offsetX = defaultOffsetX
    let isMouseDown = false;
    let moveX = 0

    const [dates, setDates] = useState<ChartDates>([])

    const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isMouseDown && headRef.current && chartRef.current) {
            const newOffsetX = offsetX - moveX + e.clientX
            headRef.current.style.transform = `translate(${newOffsetX}px, 0px)`
            chartRef.current.style.transform = `translate(${newOffsetX}px, 0px)`

            //движение вправо
            if (newOffsetX <= -12 * columnWidth) {
                const lastDate = splitDate(dates[dates.length - 1].dateString)
                for (let i = 0; i < 6; i++) {
                    lastDate.setDate(lastDate.getDate() + 1)
                    dates.push({
                        date: lastDate.getDate(),
                        dateString: lastDate.toLocaleDateString(),
                        weekday: getWeekday(lastDate),
                        currentDate: nowString === lastDate.toLocaleDateString(),
                    })
                    dates.shift()
                }

                setDates([...dates])
            }

            //движение влево
            if (newOffsetX >= 0) {
                const firstDate = splitDate(dates[0].dateString)
                for (let i = 0; i < 6; i++) {
                    firstDate.setDate(firstDate.getDate() -1)
                    dates.unshift({
                        date: firstDate.getDate(),
                        dateString: firstDate.toLocaleDateString(),
                        weekday: getWeekday(firstDate),
                        currentDate: nowString === firstDate.toLocaleDateString(),
                    })
                    dates.pop()
                }

                setDates([...dates])
            }
        }
    }

    useEffect(() => {
        if (viewRef.current && headRef.current && chartRef.current) {
            const {width} = viewRef.current.getBoundingClientRect()
            const colsCount = Math.ceil(width / columnWidth) + 12
            const newDates: ChartDates = []
            const leftDate = getDefaultDate()

            for (let i = 0; i <= colsCount; i++) {
                newDates.push({
                    date: leftDate.getDate(),
                    dateString: leftDate.toLocaleDateString(),
                    weekday: getWeekday(leftDate),
                    currentDate: nowString === leftDate.toLocaleDateString(),
                })
                leftDate.setDate(leftDate.getDate() + 1)
            }

            headRef.current.style.transform = `translate(${offsetX}px, 0px)`
            chartRef.current.style.transform = `translate(${offsetX}px, 0px)`
            setDates(newDates)
        }
    }, []);

    useEffect(() => {
        if (headRef.current && chartRef.current) {
            headRef.current.style.transform = `translate(${defaultOffsetX}px, 0px)`
            chartRef.current.style.transform = `translate(${defaultOffsetX}px, 0px)`
        }
    }, [dates]);

    return (
        <div
            className={s.container}
            ref={viewRef}
        >
            <div className={s.chart_heading_block}>
                <Typography.Text className={s.chart_heading_text}>Январь, 2025</Typography.Text>
                <div
                    className={s.chart_heading_dates}
                    ref={headRef}
                >
                    {
                        dates.map((i) => (
                            <TableHeadElement
                                current={i.currentDate}
                                day={i.weekday}
                                date={i.date}
                                key={i.dateString}
                            />
                        ))
                    }
                </div>
            </div>

            <div
                className={s.chart_body}
                ref={chartRef}
                onMouseDown={(e) => {
                    isMouseDown = true
                    moveX = e.clientX
                }}
                onMouseUp={() => {
                    isMouseDown = false
                    moveX = 0
                }}
                onMouseMove={handleMove}
            >
                {
                    dates.map((i) => (<ChartColumn key={i.dateString}/>))
                }
            </div>
        </div>
    );
};