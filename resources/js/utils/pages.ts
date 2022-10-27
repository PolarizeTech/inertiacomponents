export const resolvePage = (name: string, extension: string = 'vue') => {
  const page = {
    vue: vueComponentLookup(name),
    jsx: jsxComponentLookup(name)
  }[extension]

  if (page !== null) {
    return typeof page === 'function'
      ? page()
      : page
  }

  throw new Error(`Page not found: ${name}`)
}

function vueComponentLookup(name: string) {

  let components,
      alias = ''

  if (name.includes('@blazervel/auth')) {

    components = import.meta.glob('@blazervel/auth/**/*.vue')
    alias = '@blazervel/auth'

  } else if (name.includes('@blazervel/workspaces')) {

    components = import.meta.glob('@blazervel/workspaces/**/*.vue')
    alias = '@blazervel/workspaces'

  } else if (name.includes('@blazervel/inertia')) {

    components = import.meta.glob('@blazervel/inertia/**/*.vue')
    alias = '@blazervel/inertia'

  } else if (name.includes('@blazervel/ui')) {

    components = import.meta.glob('@blazervel/ui/**/*.vue')
    alias = '@blazervel/ui'

  } else {

    components = import.meta.glob('@app/**/*.vue')
    alias = '@app'

  }

  for (const path in components) {

    if (
      !path.endsWith(`${name.replace(alias, '').replace('.', '/')}.vue`)
    ) continue

    return components[path]
  }

  return null
  
}

function jsxComponentLookup(name: string) {

  let components,
      alias = ''

  if (name.includes('@blazervel/auth')) {

    components = import.meta.glob('@blazervel/auth/**/*.jsx')
    alias = '@blazervel/auth'

  } else if (name.includes('@blazervel/workspaces')) {

    components = import.meta.glob('@blazervel/workspaces/**/*.jsx')
    alias = '@blazervel/workspaces'

  } else if (name.includes('@blazervel/inertia')) {

    components = import.meta.glob('@blazervel/inertia/**/*.jsx')
    alias = '@blazervel/inertia'

  } else if (name.includes('@blazervel/ui')) {

    components = import.meta.glob('@blazervel/ui/**/*.jsx')
    alias = '@blazervel/ui'

  } else {

    components = import.meta.glob('@app/**/*.jsx')
    alias = '@app'

  }

  for (const path in components) {

    if (
      !path.endsWith(`${name.replace(alias, '').replace('.', '/')}.jsx`)
    ) continue

    return components[path]
  }

  return null
  
}