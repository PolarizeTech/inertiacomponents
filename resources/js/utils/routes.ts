import route from '@tightenco/ziggy'

export default (config: object) => {
  (window as any).route = (name: string, params: object, absolute: boolean) => (
    route(name, params, absolute, config)
  )
}