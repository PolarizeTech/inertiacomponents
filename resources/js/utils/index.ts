export { default as useTypedPage } from './use-typed-page'
export * from './use-component'
export { mergeCssClasses } from './css-classes'
export { userAvatarUrl } from './user'
export { initCalendly, openCalendly } from './calendly'
export { resolvePage } from './resolve-page'
export { default as createApp } from './create-app'

export const camel = (str: string): string => (
  str
    .split('-')
    .map(w => ucfirst(w))
    .join('')
)

export const ucfirst = (str: string): string => (
  str.charAt(0).toUpperCase() + str.slice(1)
)