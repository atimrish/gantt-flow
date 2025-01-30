export const setChartElementsOffset = (head: HTMLDivElement, chart: HTMLDivElement, offsetX: number) => {
    head.style.transform = `translate(${offsetX}px, 0px)`
    chart.style.transform = `translate(${offsetX}px, 0px)`
}