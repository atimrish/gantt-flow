export const getDefaultDate = () => {
    const now = new Date();
    now.setDate(now.getDate() - 6);
    return now;
}