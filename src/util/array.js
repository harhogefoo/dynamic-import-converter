export const flattenDeep = array =>
  array.reduce(
    (a, c) => (Array.isArray(c) ? a.concat(flattenDeep(c)) : a.concat(c)),
    []
  )

export const extractUndefined = ary => ary.filter(v => v)
