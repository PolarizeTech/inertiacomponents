import { createSSRApp, h } from '@appModules/vue';
import { renderToString } from '@appModules/@vue/server-renderer';
import { createInertiaApp } from '@appModules/@inertiajs/inertia-vue3';
import createServer from '@appModules/@inertiajs/server';
import { resolvePageComponent } from '@appModules/laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '@app/../../vendor/tightenco/ziggy/dist/vue.m';

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
