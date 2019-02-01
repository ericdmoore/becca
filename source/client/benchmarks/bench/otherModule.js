const Benchmark = require('benchmark')
// const _ = require('lodash-es')
const R = require('rambda')
const Ramda = require('ramda')

const holder = { a: { b: 2 } }
const a = [ 'a', 'b' ]

const suite = new Benchmark.Suite('path options from otherModule')

suite.add(
  'Rambda.path',
  () => { R.path(a, holder) }
).add(
  'Ramda',
  () => { Ramda.path(a, holder) }
)

// .add(
//   'Lodash.get',
//   () => { _.get(holder, a) }
// )
module.exports = suite
