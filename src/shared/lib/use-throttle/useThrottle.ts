export const useThrottle = (cb: (...args: Array<any>) => any, ms: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null

    return (...args: Parameters<typeof cb>) => {
        if (timer === null) {
            cb(...args)
            timer = setTimeout(() => timer = null, ms)
        }
    }
}