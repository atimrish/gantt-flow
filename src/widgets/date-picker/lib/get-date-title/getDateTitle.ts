import i18n from '@src/app/i18n/i18n'

export const getDateTitle = (date: Date) => {
    return date.toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'long',
    })
}