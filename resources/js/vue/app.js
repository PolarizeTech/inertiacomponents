import { createApp, h } from '@appModules/vue'
import { createInertiaApp } from '@appModules/@inertiajs/inertia-vue3'
import { InertiaProgress } from '@appModules/@inertiajs/progress'
import { resolvePage } from '../'
import '@blazervel/ui/../css/app.css'
import { ZiggyVue } from '@app/../../vendor/tightenco/ziggy/dist/vue.m'

const appName = import.meta.env.VITE_APP_NAME || 'Blazervel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePage(name),
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .mount(el)
    },
})

InertiaProgress.init({ color: '#4B5563' })