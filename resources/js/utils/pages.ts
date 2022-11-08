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

  if (name.includes('@blazervel')) {
  
    components = import.meta.glob('@blazervel/blazervel/**/*.vue')
    alias = '@blazervel'

  } else if (name.includes('@blazervel-ui')) {

    components = import.meta.glob('@blazervel-ui/**/*.vue')
    alias = '@blazervel-ui'

  } else {

    components = import.meta.glob('@/**/*.vue')
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

  if (name.includes('@blazervel-ui')) {

    components = import.meta.glob('@blazervel-ui/**/*.jsx')
    alias = '@blazervel-ui'


  } else if (name.includes('@blazervel-ui/inertia')) {

    components = import.meta.glob('@blazervel-ui/inertia/**/*.jsx')
    alias = '@blazervel-ui/inertia'

  } else if (name.includes('@blazervel-ui')) {

    components = import.meta.glob('@blazervel-ui/**/*.jsx')
    alias = '@blazervel-ui'

  } else {

    components = import.meta.glob('@/**/*.jsx')
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