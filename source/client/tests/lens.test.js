import {
  useWith as rUseWith,
  path as rPath,
  split as rSplit,
  pathOr as orPath } from 'ramda'
import { path as Rpath } from 'rambda'
import get from 'lodash-es/get'

const dotPath = rUseWith(rPath, [rSplit('.')])

console.log({
  pathOr: orPath.toString().length,
  pathR: Rpath.toString().length,
  get: get.toString().length
})

// console.log(JSON.stringify(pathR).length)
// console.log(JSON.stringify(get).length)

const orPathG = ({ name, path, obj, expected }) => {
  let actual = orPath(null, path, obj)
  return { [name]: [actual, expected] }
}

const dotPathG = ({ name, path, obj, expected }) => {
  let actual = dotPath(path, obj)
  return { [name]: [actual, expected] }
}
const RpathG = ({ name, path, obj, expected }) => {
  let actual = Rpath(path)(obj)
  return { [name]: [actual, expected] }
}

const getG = ({ name, path, obj, expected }) => {
  let actual = get(obj, path, null)
  // console.log({ varyActual: actual })
  return { [name]: [actual, expected] }
}

const testObj = { a: 1, b: 2, c: { d: 4, e: { f: 6, g: [{ h: 8 }, { i: 10 }, { j: 11 }] } } }
// const testObj2 = { a: [
//   { b: 2, c: ['first', 'second'] },
//   { '': 'empty', ' ': 'space', 'fnExample': (i) => i },
//   { d: 4, e: 5 }
// ],
// 'lil': 'little' }
// const testObj3 = [
//   { theArrayIsTheTrunk: true },
//   { theObjectsInsideAreBranches: true },
//   { b: 2, c: 3 },
//   { a: 1, b: 2, c: { d: 4, e: { f: 6, g: { 'and': true } } } },
//   { 'trunk': false, 'branch': true, a: { 'Jan': 1, 'Months': [{ 1: 'Jan' }, { 2: 'Feb' }], b: { c: { d: { e: true } } } } },
//   { 'trunk': false, 'branch': true, a: { 'included': true, b: { c: { d: { e: true } } } } },
//   { 'trunk': false, 'branch': true, a: { 'included': true, b: { c: { d: { e: true } } } } }
// ]

export default {
  'Lenses-- lodash': {
    ...getG({
      name: '001. Simple Deep Nest',
      path: 'c.d',
      obj: testObj,
      expected: 4
    }),
    ...getG({
      name: '002. Mixed dot+ bracket path',
      path: 'c.e.g[0].h',
      obj: testObj,
      expected: 8
    })
    // ...getG({
    //   name: '',
    //   path: '',
    //   obj: testObj2,
    //   expected: {}
    // }),
    // ...getG({
    //   name: '',
    //   path: '',
    //   obj: testObj3,
    //   expected: {}
    // })
  },
  'Lenses-- ramda': {
    ...orPathG({
      name: '001. Simple',
      path: 'c.d'.split('.'),
      obj: testObj,
      expected: 4
    }),
    ...dotPathG({
      name: '002. using dotPath',
      path: 'c.e.g',
      obj: testObj,
      expected: [{ h: 8 }, { i: 10 }, { j: 11 }]
    }),
    ...orPathG({
      name: '003. Mixed Path',
      path: 'c.e.g.0.h'.split('.'),
      obj: testObj,
      expected: 8
    })
    // ...orPathG({
    //   name: '',
    //   path: '',
    //   obj: {},
    //   expected: {}
    // }),
    // ...orPathG({
    //   name: '',
    //   path: '',
    //   obj: {},
    //   expected: {}
    // })
  },
  'Lenses-- rambda': {
    ...RpathG({
      name: '001. Simple Case',
      path: 'c.d',
      obj: testObj,
      expected: 4
    }),
    ...RpathG({
      name: '002. Mixed Case',
      path: 'c.e.g.0.h',
      obj: testObj,
      expected: 8
    })
    // ...RpathG({
    //   name: '',
    //   path: '',
    //   obj: {},
    //   expected: {}
    // }),
    // ...RpathG({
    //   name: '',
    //   path: '',
    //   obj: {},
    //   expected: {}
    // })
  }
}
