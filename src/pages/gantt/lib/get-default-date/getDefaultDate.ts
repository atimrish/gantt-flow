export const getDefaultDate = (leftOffset: number) => {
    const now = new Date();
    now.setDate(now.getDate() - leftOffset);
    return now;
}