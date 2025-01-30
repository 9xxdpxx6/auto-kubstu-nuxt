export default defineNuxtRouteMiddleware((to) => {
    if (process.server) {
        const nuxtApp = useNuxtApp()
        if (nuxtApp.ssrContext?.event.res.statusCode === 404) {
            throw createError({
                statusCode: 404,
                message: 'Страница не найдена'
            })
        }
    }
})