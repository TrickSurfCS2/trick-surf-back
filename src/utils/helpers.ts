function toCamelCaseKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCaseKeys)
  }
  else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: any, key) => {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1)
      acc[camelKey] = toCamelCaseKeys(obj[key])
      return acc
    }, {})
  }
  return obj
}

export { toCamelCaseKeys }
