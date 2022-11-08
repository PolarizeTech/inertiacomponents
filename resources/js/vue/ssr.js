import { createSSRApp, h } from '@pckg/vue';
import { renderToString } from '@pckg/@vue/server-renderer';
import { createInertiaApp } from '@pckg/@inertiajs/inertia-vue3';
import createServer from '@pckg/@inertiajs/server';
import { resolvePageComponent } from '@pckg/laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '@/../../vendor/tightenco/ziggy/dist/vue.m';

const appName = 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
        setup({ app, props, plugin }) {
            return createSSRApp({ render: () => h(app, props) })
                .use(plugin)
                .use(ZiggyVue, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });
        },
    })
);
