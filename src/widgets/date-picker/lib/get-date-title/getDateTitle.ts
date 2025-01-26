export const getDateTitle = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
    })
}