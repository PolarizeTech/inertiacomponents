import { UserConfig, searchForWorkspaceRoot } from 'vite'
import path from 'path'

export default (config: UserConfig, packagePath: string) => {
	
  // Support symlinks for aliasing vendor packages
	// if (config.preserveSymlinks !== false) {
	// 	config.preserveSymlinks = true
	// }

  const basePath = searchForWorkspaceRoot(process.cwd())

  // Allow aliasing this package
  config.server = config.server || {}
  config.server.fs = config.server.fs || {}

  config.server.fs.allow = [
    ...(config.server.fs.allow || []),
    path.relative(basePath, packagePath),
  ]

  config.resolve = config.resolve || {}

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    '@ja-inertia': path.resolve(`${packagePath}/resources/js`),
    '@vendor':     path.resolve('./vendor'),
    '@pckg':       path.resolve('./node_modules'),
    '@':           path.resolve('./resources/js'),
  }

  return config;
}