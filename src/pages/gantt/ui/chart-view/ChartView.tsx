import * as s from './ChartView.css'
import {Typography} from "@src/shared/ui/typography";
import {TableHeadElement} from "@src/shared/ui/table-head-element/TableHeadElement";
import {useEffect, useRef, useState} from "react";
import {columnWidth, outerColumnsCount} from "@src/pages/gantt/config";
import {getDefaultDate} from "@src/pages/gantt/lib/get-default-date";
import {ChartDate} from "@src/pages/gantt/model/types";
import {getChartDate} from "@src/pages/gantt/lib/get-chart-date";
import {setChartElementsOffset} from "@src/pages/gantt/lib/set-chart-elements-offset";
import {getChartRightDates} from "@src/pages/gantt/lib/get-chart-right-dates";
import {getChartLeftDates} from "@src/pages/gantt/lib/get-chart-left-dates";
import {useThrottle} from "@src/shared/lib/use-throttle";
import {ChartTasks} from "@src/pages/gantt/ui/chart-tasks";

type ChartDates = Array<ChartDate>
const defaultOffsetX = columnWidth * -outerColumnsCount

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
            setChartElementsOffset(headRef.current, chartRef.current, newOffsetX)

            //движение вправо
            if (newOffsetX <= (outerColumnsCount * -2) * columnWidth) {
                setDates([...getChartRightDates(dates, outerColumnsCount, nowString)])
            }

            //движение влево
            if (newOffsetX >= 0) {
                setDates([...getChartLeftDates(dates, outerColumnsCount, nowString)])
            }
        }
    }

    const throttledMove = useThrottle(handleMove, 15)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isMouseDown = true
        moveX = e.clientX
    }

    const handleMouseUp = () => {
        isMouseDown = false
        moveX = 0
    }

    useEffect(() => {
        if (viewRef.current && headRef.current && chartRef.current) {
            const {width} = viewRef.current.getBoundingClientRect()
            const colsCount = Math.ceil(width / columnWidth) + (outerColumnsCount * 2)
            const newDates: ChartDates = []
            const leftDate = getDefaultDate(outerColumnsCount)

            for (let i = 0; i <= colsCount; i++) {
                newDates.push(getChartDate(nowString, leftDate))
                leftDate.setDate(leftDate.getDate() + 1)
            }

            setChartElementsOffset(headRef.current, chartRef.current, offsetX)
            setDates(newDates)
        }
    }, []);

    useEffect(() => {
        if (headRef.current && chartRef.current) {
            setChartElementsOffset(headRef.current, chartRef.current, defaultOffsetX)
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
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={throttledMove}
            >
                <ChartTasks dates={dates} />
            </div>
        </div>
    );
};