export type Notify = {
    id: number,
    type: 'success' | 'warning' | 'info' | 'error',
    title: string,
    description?: string,
}