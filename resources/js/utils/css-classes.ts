export function mergeCssClasses(...props) {
  
  let cssClasses = []

  props.filter(prop => ['object', 'array', 'string'].indexOf(typeof prop) >= 0).forEach(prop => {

    if (typeof prop == 'string') {
      prop = prop.split(' ')
    }

    if (typeof prop == 'object' && !Array.isArray(prop)) {

      prop = Object.entries(prop).map(([key, val]) => {
        if (val === true && typeof key === 'string') {
          return key
        } else if (typeof val === 'string') {
          return val
        }
        return null
      }).filter(cn => cn !== null)

    }

    cssClasses = cssClasses.concat(prop)

  })

  return cssClasses.join(' ').trim()

}