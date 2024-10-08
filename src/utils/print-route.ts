/* eslint-disable no-console */
interface Layer {
  route?: { path: string, stack: Layer[] }
  name?: string
  handle?: { stack: Layer[] }
  method?: string
  regexp: string
}

export function print(path: string[], layer: Layer): void {
  if (layer.route) {
    const newPath = path.concat(split(layer.route.path))
    layer.route.stack.forEach(subLayer => print(newPath, subLayer))
  }
  else if (layer.name === 'router' && layer?.handle?.stack) {
    const newPath = path.concat(split(layer.regexp))
    layer.handle.stack.forEach(subLayer => print(newPath, subLayer))
  }
  else if (layer.method) {
    console.log(
      '\x1B[34m%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'),
    )
  }
}

function split(thing: string | { fast_slash?: boolean }) {
  if (typeof thing === 'string')
    return thing.split('/')

  if (thing.fast_slash)
    return ''

  const match = thing
    .toString()
    .replace('\\/?', '')
    .replace('(?=\\/|$)', '$')
    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//)
  return match ? match[1].replace(/\\(.)/g, '$1').split('/') : `<complex:${thing.toString()}>`
}
