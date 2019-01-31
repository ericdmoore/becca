/**
 * Project MAGIC MONICLE:
 * @module utils/monocle
 * @author: Eric Moore <eric@beccamail.org>
 * @description Lightweight lenses for aritocrats! A lightweight lens for dealing the "deepstate" in HyperApp (@ref: https://hyperapp.js.org/)
 * Semantic choices are made to make HA dev easier
 *
 * For Example: set - returns the an object partial - which guarentees a top level key  is returned
 * This is done for HAV1 - which replaces the whole top level key
 *
 * set is more straightforward - and less HA specific
 */

const friendlySplit = (path, delim = '.') => {
  return Array.isArray(path)
    ? path
    : !(path.endsWith(delim))
      ? path.split(delim)
      : path.slice(0, -1).split(delim)
}
/**
 * Easily Lens.view/Pluck/Path/Get objects from way down in nested objects.
 *
 * @description Some desc
 * @param {string} path - The path of indexers needed to find the data to focus on.
 * @param {string} delim - [delim='.'] Deli.
 * @example
 *   myState1 = {a:{b:{c:{foundMe:false}}},b:{1:'Hi'}}
 *   console.log(reveal('b.1')(myState1)) //> 'Hi'
 * @example
 *   var picker = reveal('a.b.c.foundMe') // (<state>)=>{}
 *   var myState1 = {a:{b:{c:{foundMe:false}}},b:{1:'Hi'}}
 *   var myState2 = {a:{b:{c:{foundMe:true}}},b:{2:'Ho'}}
 *   var a = picker(myState1) // true
 *   var b = picker(myState2) // false
 *   console.log(a || b) //> true
 *
 * @returns {*} Hyperapp render func.
 */
const reveal = (path, delim = '.') => (state) => {
  let ret
  const segArr = friendlySplit(path, delim)
  try {
    ret = segArr.reduce((p, seg) => {
      if (seg.includes('[')) {
        return p[parseInt(seg.slice(1, -1))]
      } else { return p[seg] }
    }, state)
  } catch (err) {
    console.error({ path, state, err })
  }
  return ret || null
}

/**
  * Vary Title.
  *
  * @description some de
  * @example
  * vary('some.path', '.')
  * @param {string} path - Asd.
  * @param {string} [delim='.'] - Asd.
  * @returns {*} Curried function.
  */
const vary = (path, delim = '.') => (newData) => (state) => {
  const segArr = friendlySplit(path, delim)
  let branch = {}

  if (segArr.length === 0) {
    return state
  }

  if (segArr.length === 1) {
    let seg = segArr[0]
    branch[seg] = state[seg]
    return branch
  } else {
    let seg = segArr.shift()
    branch[seg] = state[seg]
    let next = branch

    try {
      segArr.reduce((p, seg, i) => {
        if (i + 1 < segArr.length) {
          // middle
        } else {
          // end case
          return { ...p, [p[seg]]: newData }
        }
      }, branch)
    } catch (err) {
      console.error({ path, newData, state })
    }
    return next || null
  }
}

// const testObj = { a: 1, b: 2, c: { d: 4, e: { f: 6, g: [{ h: 8 }, { i: 10 }, { j: 11 }] } } }
// let a = (path = 'a') => (newData) => (testObj) => {
//   testObj[path] = newData
//   return { ...testObj[path] }
// }

// let c_d = (path = 'c.d') => (newData = 'IM NEW') => (testObj) => {
//   testObj[path] = newData
//   return { c: doItAgain(testObj['c']) }
// }

/**
 * Replace Some State Deep Within a Tree.
 *
 * @description This is so bossy
 * @param {string} path -  A period separated set of strings used to index into object and arrays.
 * @param {string} [delim='.'] - Delimiter used to separate the path segments - Note that path segments must all be separated - valid: a.b.[2].c.[0].
 * @see http://github.com|GitHub
 * @example
 * var myState = {a:{b:[{'first':true},{'sec':true}],d:4}}
 * replace('a.b.[0]')({newData:true})(myState)
 *   // > {a:{b:[{newData:true},{'sec':true}]}}
 * @example
 *   var myState1 = {a:{b:[{'first':true},{'sec':true}],d:4}}
 *   var myState2 = {a:{b:[{'first':true},{'sec':true}],d:4}}
 * @returns {function({Object}): function({Object}): {Object}} - The chain of curried functions.
 */
const replace = (path, delim = '.') => (newData) => (state) => {
  // OVERVIEW
  // index all the way into the object
  // change the data - and pop back up the path
  // keeping sibling data until the trunk

  /**
   * Recursing function for objects.
   *
   * @description some deal.
   * @example
   * reaplce4Obj(['a','b'])({state:''})
   * @param {string} segArr - Asd.
   * @param {number} [i=1] - Iteration Count - since the first count is different.
   * @returns {*} Hyperapp render.
   */
  const reaplce4Obj = (segArr, i = 0) => (state) => {
    let seg = segArr[i]
    // base case
    if (segArr.length === 1) {
      let clone = Object.assign({}, state)
      clone[seg] = newData
      return { ...clone[seg] }
    }
    // special first time case
    if (i === 0) {
      //  in the object return a smaller version of the problem
      return { [state[seg]]: v(segArr[0], i + 1) }
    } else {
      // grab sibblings right?
      const changed = Array.isArray(state[seg])
        ? reaplce4Array(segArr.slice(1), 2)(state[seg])
        : reaplce4Obj(segArr.slice(1), 2)(state[seg])
      return { ...state[seg], ...changed }
    }
  }

  const reaplce4Array = (segArr, i = 0) => (state) => {
    let seg = segArr[i]

    // base case
    if (segArr.length === 1) {
      let clone = Object.assign([], state)
      clone[seg] = newData // change the data
      return i === 1 ? [ clone[seg] ] : [ ...clone[seg] ]
    }
    // special first time case
    if (i === 0) {
      //  in the array return a smaller version of the problem
      return [ Array.isArray(state[seg]) ? reaplce4Array(segArr.slice(1), 2)(state[seg]) : reaplce4Obj(segArr.slice(1), 2)(state[seg]) ]
    } else {
      return { [state[seg]]: v(segArr[0], i + 1) }
    }
  }

  const segArr = friendlySplit(path, delim)
  return Array.isArray(state) ? reaplce4Array(segArr)(state) : reaplce4Obj(segArr)(state)
}
const view = reveal
const varry = replace
export default { reveal, replace, view, vary, varry }
// module.exports = { view, vary }
