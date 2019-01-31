import { CalendarData } from '../src/utils/Calendar.helper.js'

const chalk = require('chalk')

const _length = ({ name, date, length, expected }) => {
  const result = CalendarData({ today: date, length })
  // console.log({ name, result, length })
  return { [`${name}`]: [result.days, expected] }
}

const _header = ({ name, date, dowStart, expected }) => {
  const result = CalendarData({ today: date, dowStart })
  // console.log({ name, result, dowStart })
  return { [`${name}`]: [result.days, expected] }
}

const _both = ({ name, date, length, dowStart, expected }) => {
  const result = CalendarData({ today: date, length, dowStart })
  return { [`${name}`]: [result.days, expected] }
}

const _defaults = ({ name, expectedShape }) => {
  // console.log(chalk.white(`name:${name}`))
  const result = CalendarData()
  let pass = result ? expectedShape.dateRangeLength.includes(result.days.length) : false
  pass = result ? result.days.filter(v => v[expectedShape.contains.key]).length === expectedShape.contains.count : false
  return { [`${name}`]: [true, pass] }
}

const tests = {
  'Generate A CalendarRange': {
    ..._defaults({
      name: 'Use Only Defaults',
      expectedShape: {
        dateRangeLength: [28, 35, 42],
        contains: { key: 'today', count: 1 },
        today: new Date()
      }
    }),
    ..._length({
      name: 'Simplest Form :: Single Day Date Range-2018/12/14',
      date: new Date(2018, 11, 14),
      length: { before: 0, after: 0 },
      expected: [{ y: 2018, d: 14, m: 'Dec', mm: 'December', _m: 11, monthIdx: 0, today: true }]
    }),
    ..._length({
      name: 'New Years Day 2018 2 before + 4 after',
      date: new Date(2018, 0, 1),
      length: { before: 2, after: 4 },
      expected: [
        { y: 2017, d: 30, m: 'Dec', mm: 'December', _m: 11, monthIdx: -1, today: false },
        { y: 2017, d: 31, m: 'Dec', mm: 'December', _m: 11, monthIdx: -1, today: false },
        { y: 2018, d: 1, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: true },
        { y: 2018, d: 2, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 3, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 4, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 5, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false }
      ]
    }),
    ..._length({
      name: 'Tax Day 2018 W/ -2 & +4',
      date: new Date(2018, 3, 15),
      length: { before: 2, after: 4 },
      expected: [
        { y: 2018, d: 13, m: 'Apr', mm: 'April', _m: 3, monthIdx: 0, today: false },
        { y: 2018, d: 14, m: 'Apr', mm: 'April', _m: 3, monthIdx: 0, today: false },
        { y: 2018, d: 15, m: 'Apr', mm: 'April', _m: 3, monthIdx: 0, today: true },
        { y: 2018, d: 16, m: 'Apr', mm: 'April', _m: 3, monthIdx: 0, today: false },
        { y: 2018, d: 17, m: 'Apr', mm: 'April', _m: 3, monthIdx: 0, today: false },
        { y: 2018, d: 18, m: 'Apr', mm: 'April', _m: 3, monthIdx: 0, today: false },
        { y: 2018, d: 19, m: 'Apr', mm: 'April', _m: 3, monthIdx: 0, today: false }
      ]
    }),
    ..._header({
      name: 'Invalid Day of the Week ',
      date: new Date(2018, 0, 1),
      dowStart: 'Proper input is an Int [0,6]',
      expected: []
    }),
    ..._header({
      name: 'Out of Range Day of the Week Param',
      date: new Date(2018, 0, 1),
      dowStart: '7',
      expected: []
    }),
    ..._both({
      name: 'Use Both length + day of week start',
      date: new Date(2018, 9, 4),
      length: { before: 2, after: 4 },
      dowStart: 0,
      expected: [
        { y: 2018, m: 'Sep', d: 30, mm: 'September', _m: 8, monthIdx: -1, today: false },
        { y: 2018, m: 'Oct', d: 1, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 2, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 3, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 4, mm: 'October', _m: 9, monthIdx: 0, today: true },
        { y: 2018, m: 'Oct', d: 5, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 6, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 7, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 8, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 9, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 10, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 11, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 12, mm: 'October', _m: 9, monthIdx: 0, today: false },
        { y: 2018, m: 'Oct', d: 13, mm: 'October', _m: 9, monthIdx: 0, today: false }
      ]
    }),
    ..._header({
      name: 'Show Jan Month for 2018 on New Years Day',
      date: new Date(2018, 0, 1),
      dowStart: 0,
      expected: [
        { y: 2017, d: 31, m: 'Dec', mm: 'December', _m: 11, monthIdx: -1, today: false },
        { y: 2018, d: 1, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: true },
        { y: 2018, d: 2, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 3, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 4, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 5, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 6, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 7, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 8, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 9, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 10, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 11, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 12, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 13, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 14, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 15, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 16, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 17, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 18, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 19, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 20, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 21, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 22, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 23, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 24, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 25, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 26, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 27, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 28, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 29, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 30, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 31, m: 'Jan', mm: 'Janurary', _m: 0, monthIdx: 0, today: false },
        { y: 2018, d: 1, m: 'Feb', mm: 'Feburary', _m: 1, monthIdx: 1, today: false },
        { y: 2018, d: 2, m: 'Feb', mm: 'Feburary', _m: 1, monthIdx: 1, today: false },
        { y: 2018, d: 3, m: 'Feb', mm: 'Feburary', _m: 1, monthIdx: 1, today: false }
      ]
    })
  }
}

export default tests
