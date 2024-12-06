import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import MonacoEditorNlsPlugin, {
    esbuildPluginMonacoEditorNls,
    Languages,
} from 'vite-plugin-monaco-editor-nls';

import zh_CN from 'vscode-loc.git/i18n/vscode-language-pack-zh-hans/translations/main.i18n.json';
// https://vitejs.dev/config/
// export default defineConfig({
//     build: {
//         sourcemap: true,
//     },
//     optimizeDeps: {
//         /** vite >= 2.3.0 */
//         esbuildOptions: {
//             plugins: [
//                 esbuildPluginMonacoEditorNls({
//                     locale: Languages.zh_hans,
//                 }),
//             ],
//         },
//     },
//   plugins: [react(), MonacoEditorNlsPlugin({locale: Languages.zh_hans})],
// })

export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': path.resolve('./src'),
        },
    },
    build: {
        sourcemap: true,
    },
    optimizeDeps: {
        /** vite 版本需要大于等于2.3.0 */
        esbuildOptions: {
            plugins: [
                esbuildPluginMonacoEditorNls({
                    locale: Languages.zh_hans,
                    /**
                     * The weight of `localedata` is higher than that of `locale`
                     */
                    localeData: zh_CN.contents
                }),
            ],
        },
    },
    plugins: [
        react(),
        MonacoEditorNlsPlugin({
            locale: Languages.zh_hans,
            /**
             * The weight of `localedata` is higher than that of `locale`
             */
            localeData: zh_CN.contents
        }),
    ],
});

