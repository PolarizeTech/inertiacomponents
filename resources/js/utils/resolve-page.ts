export const resolvePage = (name: string): any => {

  let page = null

  // Check packages for components
  const project = import.meta.glob('@app/Pages/**/*.tsx', {eager: true}),
        jaInertia = import.meta.glob('@ja-inertia/**/Pages/**/*.tsx', {eager: true})

  const components = {
    ...project,
    ...jaInertia
  }

  for (const path in components) {

    const ext = path.split('.').reverse()[0],
          alias = name.startsWith('@') ? name.split('/')[0] + '/' : ''
          
    if (!path.endsWith(`${name.replace(alias, '')}.${ext}`)) {
      continue
    }

    page = components[path]
    page = typeof page === 'function' ? page() : page
    page = page.default || page

    return page
  }

  throw new Error(`Page not found: ${name}`)
}