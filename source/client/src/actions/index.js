import set from 'lodash.set'

export const deepSet = (_path, _newVal, _obj, delim = '.') => {
  const clone = Object.assign({}, _obj)
  const newObj = set(clone, _path, _newVal)
  const firstSeg = _path.split(delim)[0]
  return { [firstSeg]: newObj[firstSeg] }
}

export * from './filter.js'
export * from './login.js'
export * from './menu.js'
export * from './search.js'
export * from './settings.js'
export * from './messaging.js'
