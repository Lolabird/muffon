import {
  defineConfig,
  splitVendorChunkPlugin
} from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import injectPlugin from '@rollup/plugin-inject'
import electronRendererPlugin from 'vite-plugin-electron-renderer'
import {
  resolve as resolvePath
} from 'node:path'

export default defineConfig(
  {
    plugins: [
      vuePlugin(
        {
          template: {
            compilerOptions: {
              isCustomElement: tag => {
                return [
                  'emoji-picker'
                ].includes(
                  tag
                )
              }
            }
          }
        }
      ),
      injectPlugin(
        {
          $: 'jquery',
          jQuery: 'jquery'
        }
      ),
      electronRendererPlugin(),
      splitVendorChunkPlugin()
    ],
    resolve: {
      alias: {
        '@': resolvePath(
          __dirname,
          './src'
        )
      }
    },
    server: {
      port: 3000
    },
    build: {
      outDir: 'build',
      target: 'esnext'
    }
  }
)
