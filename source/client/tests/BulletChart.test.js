import { selectedBreaks } from '../src/utils/BulletChart.helper.js'

// breaks
const ez = [ 10, 12, 16, 22 ]
const ez10s = [ 10, 20, 30, 40, 50, 60 ]
const b1 = [ 10, 12, 16, 20, 30, 40, 50 ]
const b3 = [ 10, 11, 12, 13, 14, 15, 16, 20, 22, 26, 27, 30, 40, 42 ]

const g = ({ name, breaks, spacing, expected }) => {
  // let ret = {}
  // ret[name] = [selected(breaks, spacing), expected]
  return { [`${name} Spacing--${spacing}`]: [selectedBreaks(breaks, spacing), expected] }
}

export default {

  'Select Labels for Idx': {
    ...g({
      name: '001. ezBreaks',
      spacing: 3,
      breaks: ez,
      expected: [10, 16, 22] }),
    ...g({
      name: '002. ezBreaks',
      spacing: 5,
      breaks: ez,
      expected: [ 10, 16, 22 ] }),
    ...g({
      name: '003. ezTen',
      spacing: 6,
      breaks: ez10s,
      expected: [ 10, 20, 30, 40, 50, 60 ] }),
    ...g({
      name: '004. ezTen - Defaullt=8 but set',
      spacing: null,
      breaks: ez10s,
      expected: [ 10, 20, 30, 40, 50, 60 ] }),
    ...g({
      name: '005. ezTen',
      spacing: 10,
      breaks: ez10s,
      expected: [ 10, 20, 30, 40, 50, 60 ] }),
    ...g({
      name: '006. ezTen',
      spacing: 12,
      breaks: ez10s,
      expected: [ 10, 30, 50 ] }),
    ...g({
      name: '007. ezTen',
      spacing: 15,
      breaks: ez10s,
      expected: [ 10, 30, 50 ] }),
    ...g({
      name: '008. ezTen',
      spacing: 22,
      breaks: ez10s,
      expected: [ 10, 40 ] }),
    ...g({
      name: '009. bOne',
      spacing: 3,
      breaks: b1,
      expected: [ 10, 16, 20, 30, 40, 50 ] }),
    ...g({
      name: '010: bOne',
      spacing: 5,
      breaks: b1,
      expected: [ 10, 16, 30, 40, 50 ] }),
    ...g({
      name: '011: bOne',
      spacing: 10,
      breaks: b1,
      expected: [ 10, 20, 30, 40, 50 ] }),
    ...g({
      name: '012: bThree',
      spacing: 3,
      breaks: b3,
      expected: [10, 13, 16, 20, 26, 30, 40] }),
    ...g({
      name: '013: bThree',
      spacing: 5,
      breaks: b3,
      expected: [10, 15, 20, 26, 40] }),
    ...g({
      name: '014: bThree',
      spacing: 10,
      breaks: b3,
      expected: [ 10, 20, 30, 40 ]
    })
  },
  'Topic': {
    testName: [0, 0]
  }

}
