// const { view, vary } = require('./monicle.js')
import Lens from './monocle.js'

const testObj = { a: 1, b: 2, c: { d: 4, e: { f: 6, g: [{ h: 8 }, { i: 10 }, { j: 11 }] } } }

console.log(Lens.reveal('c.e.g.[1].i')(testObj))
