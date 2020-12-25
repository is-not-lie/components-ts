const _toString = Object.prototype.toString

export const isObject = (target: any) =>
  typeof target === 'object' && target !== null

export const isSimpleObject = (target: any) =>
  _toString.call(target) === '[object Object]'

export const isArray = (target: any) => Array.isArray(target)
