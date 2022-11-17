import route from '@vendor/tightenco/ziggy/src/js'

export default function (config: object) {
  (window as any).route = (name: string, params: object, absolute: boolean) => (
    route(name, params, absolute, config)
  )
}