import Lens from '../src/utils/fp/monocle.js'
// vary is like a replace
// view is like a reveal

const viewG = ({ name, path, obj, expected }) => {
  let actual = Lens.reveal(path)(obj)
  return { [name]: [actual, expected] }
}

const varyG = ({ name, path, newData, obj, expected }) => {
  let actual = Lens.replace(path)(newData)(obj)
  console.log({ varyActual: actual })
  return { [name]: [actual, expected] }
}

const testObj = { a: 1, b: 2, c: { d: 4, e: { f: 6, g: [{ h: 8 }, { i: 10 }, { j: 11 }] } } }
const testObj2 = { a: [
  { b: 2, c: ['first', 'second'] },
  { '': 'empty', ' ': 'space', 'fnExample': (i) => i },
  { d: 4, e: 5 }
],
'lil': 'little' }
const testObj3 = [
  { theArrayIsTheTrunk: true },
  { theObjectsInsideAreBranches: true },
  { b: 2, c: 3 },
  { a: 1, b: 2, c: { d: 4, e: { f: 6, g: { 'and': true } } } },
  { 'trunk': false, 'branch': true, a: { 'Jan': 1, 'Months': [{ 1: 'Jan' }, { 2: 'Feb' }], b: { c: { d: { e: true } } } } },
  { 'trunk': false, 'branch': true, a: { 'included': true, b: { c: { d: { e: true } } } } },
  { 'trunk': false, 'branch': true, a: { 'included': true, b: { c: { d: { e: true } } } } }
]

export default {
  'Compose a reveal Lens for test obj': { // test suite is an obj - test name is a key - and the assertion is the [0,1]
    ...viewG({
      name: '001. Single String Indexer',
      obj: testObj,
      path: 'a',
      expected: 1
    }),
    ...viewG({
      name: '002. Dotted String Indexer',
      obj: testObj,
      path: 'c.e.g',
      expected: [{ h: 8 }, { i: 10 }, { j: 11 }]
    }),
    ...viewG({
      name: '003. Invalid Path Indexing to NA data',
      obj: testObj,
      path: 'a.b',
      expected: null
    }),
    ...viewG({
      name: '004. Path is partially invalid',
      obj: testObj,
      path: 'c.e.m',
      expected: null
    }),
    ...viewG({
      name: '005. Sloppy trailing dot',
      obj: testObj,
      path: 'c.e.f.',
      expected: 6
    }),
    ...viewG({
      name: '006. Mixed Case : Dotted + array notation',
      obj: testObj,
      path: 'c.e.g.[0]',
      expected: { h: 8 }
    }),
    ...viewG({
      name: '007. Mixed Case - Interleaved notation . + [] + .',
      obj: testObj,
      path: 'c.e.g.[1].i',
      expected: 10
    }),
    ...viewG({
      name: '008. Index Out of Range',
      obj: testObj,
      path: 'c.e.g.[10]',
      expected: null
    }),
    ...viewG({
      name: '009. More Mixed Case Paths',
      obj: testObj2,
      path: 'a.[0].c.[0]',
      expected: 'first'
    })
  },
  'Compose a reveal Lense for Arrays': {
    ...viewG({
      name: '001. Indexer Starts with Array Indexing',
      obj: testObj3,
      path: '[3].a',
      expected: 1
    }),
    ...viewG({
      name: '002. Array Started Indexing w/ a number object index',
      obj: testObj3,
      path: '[4].a.Months.[0].1',
      expected: 'Jan'
    })
  }
  // 'Compose a reaplace Lens for test obj': {
  //   ...varyG({
  //     name: '001. Top Level String Index',
  //     obj: testObj,
  //     path: 'a',
  //     newData: 10,
  //     expected: { a: 10 }
  //   }),
  //   ...varyG({
  //     name: '002. Chagne tree data, get the whole affected branch',
  //     obj: testObj,
  //     path: 'c.d',
  //     newData: { new: 'data' },
  //     expected: { c: { d: { new: 'data' }, e: { f: 6, g: [{ h: 8 }, { new: 'data' }, { j: 11 }] } } }
  //   }),
  //   ...varyG({
  //     name: '003. Chagne deep-tree data, Get back the affected branch',
  //     obj: testObj,
  //     path: 'c.e.g.[1]',
  //     newData: { new: 'data' },
  //     expected: { c: { d: 4, e: { f: 6, g: [{ h: 8 }, { new: 'data' }, { j: 11 }] } } }
  //   }),
  //   ...varyG({
  //     name: '004. replace non-existant data',
  //     obj: testObj,
  //     path: 'c.e.f.y', // inject or cough-it-back?
  //     newData: 1,
  //     expected: null
  //   })
  // }
}
