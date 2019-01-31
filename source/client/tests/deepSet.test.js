import { deepSet } from '../src/actions/index'

const setG = ({ name, path, newVal, obj, expected }) => {
  return { [`partial tree: ${name}`]: [deepSet(path, newVal, obj), expected] }
}

const sideEffectG = ({ name, path, newVal, obj }) => {
  const valBeforeFunc = Object.assign({}, obj) // makes a clone
  const doIChange = valBeforeFunc
  deepSet(path, newVal, doIChange)// generate any side-effects // generate any side-effects
  return { [`sideeffect free: ${name}`]: [Object.is(valBeforeFunc, doIChange), true] }
}

export default {
  'Lenses-- fucntionality-- lodash.set ': {
    ...setG({
      name: 'single path segment',
      path: 'b',
      newVal: 4,
      obj: { a: 1, b: 2, c: 3 },
      expected: { b: 4 }
    }),
    ...setG({
      name: 'two path segments',
      path: 'b.c',
      newVal: 'Im New',
      obj: { a: 1, b: { c: 3 } },
      expected: { b: { c: 'Im New' } }
    })
  },
  'Lenses-- purity-- lodash.set': {
    ...sideEffectG({
      name: 'make sure object used in function is not altered',
      path: 'a',
      newVal: 'this is new',
      obj: { a: 1, b: 2, c: 3 }
    }),
    ...sideEffectG({
      name: 'mutation checks need the path, newVal, etc- but dont compare using them',
      path: 'c',
      newVal: 'this is new',
      obj: { a: 1, b: 2, c: 3 }
    }),
    ...sideEffectG({
      name: 'mutation checks need the path, newVal, etc- but dont compare using them',
      path: 'c',
      newVal: 'this is new',
      obj: { a: 1, b: 2, c: 3 }
    })
  }
}
