import { UserConfig, searchForWorkspaceRoot } from 'vite'
import path from 'path'
import { _merge } from './resources/js/vite/utils'
import devServerConfig from './resources/js/vite/dev-server'

interface JaInertiaOptionsProps {
  progress?: {color: string}
}

export default (options: JaInertiaOptionsProps) => ({

  name: 'ja-inertia',
  
  config: (config: UserConfig, { mode, command }: { mode: string, command: string }) => {

    if (!['build', 'serve'].includes(command)) {
      return config
    }

    const packagePath = __dirname

    config = _merge(config, 'define', {
      JA_INERTIA_OPTIONS: options
    })
      
    // Support symlinks for aliasing vendor packages
    config.preserveSymlinks = true

    // Allow importing from this package
    config = _merge(config, 'server.fs.allow', [
      searchForWorkspaceRoot(process.cwd()),
      path.resolve(`${packagePath}/resources/js`),
    ])

    config = _merge(config, 'resolve.alias', {
      '@tightenco/ziggy': path.resolve('vendor/tightenco/ziggy/src/js'),
      '@ja-inertia': path.resolve(`${packagePath}/resources/js`),
      '@app': path.resolve('./resources/js'),
      '@pckg': path.resolve('./node_modules'),
      '~': path.resolve('./node_modules'),
    })

    if (mode !== 'development') {
      return config
    }
  
    // Configure dev server (e.g. valet https, HMR, etc.)
    // config = devServerConfig(config, mode)
    
    return config
  }
})