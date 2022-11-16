import { LocalizationConfigProps } from "../types"

export default function (langConfig: LocalizationConfigProps) {
  (window as any).lang = (
    key: string,
    replace: object = {},
    fallback: boolean = true,
    count: number|null = null,
    config: LocalizationConfigProps
  ) => (
    lang(key, replace, fallback, count, config || langConfig)
  )
}

function lang(
  key: string,
  replace: object = {},
  fallback: boolean = true,
  count: number|null = null,
  config: LocalizationConfigProps
) {

  const translations: object = config.translations,
        keys: Array<string> = key.split('.')

  let translation: string|null = null,
      results: object = translations
  
  keys.map(k => {
    if (typeof results[k] === 'object') {
      results = results[k]
      return
    }
    
    translation = results[k] || ''
  })


  if (!translation && fallback) {

    for (var localeKey in translations) {
    
      results = translations[localeKey]

      keys.map(k => {
        if (typeof results[k] === 'object') {
          results = results[k]
          return
        }

        translation = results[k] || ''
      })

      if (translation) {
        break
      }
    }

  }

  count = count !== null && (Array.isArray(count) || count === Object(count)) 
            ? Object.values(count).length 
            : (typeof count === 'number' ? count : null)
  
  if (count !== null) {
    // Support pluralization (https://laravel.com/docs/9.x/localization#pluralization)
  }

  if (!translation) {
    translation = key
  }

  for (var key in replace) {
    translation = translation.replace(':' + key, replace[key])
  }

  return translation
}