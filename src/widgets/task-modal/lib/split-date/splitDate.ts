type SplitDateResult = [day: number, month: number, year: number]

export const splitDate = (dateString: string): Date => {
    const splitResult = dateString.split('.').map(Number) as SplitDateResult
    return new Date(splitResult[2], splitResult[1] - 1, splitResult[0])
}