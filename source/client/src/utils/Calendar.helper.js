/*
   CALENDAR GEN ( headerConfig, formatter, date = now() )
   - returns {meta} -> object describes the underlying genrated data
   - returns a nextHeader() ->  where the sequence is based on my preference/input
   - returns a nextDate(formatter?) ->  ALL values { v:_(formatted)_ month:2, day: 'Monday', CalCol:0 }
   - returns a nextDatePrevMonth(formatter?) -> filtered for only PREV { v:_(formatted)_ month:2, day: 'Monday', CalCol:0 }
   - returns a nextDateThisMonth(formatter?) -> filtered for only CURR {v:_(formatted)_ month:3}, day:'Tuesday', CalCol:1 }
   - returns a nextDateNextMonth(formatter?) -> filtered for only NEXT {v:_(formatted)_ month:4}, day:'Sunday', CalCol:7 }

   Idea:: Page Lifecycle
   - start with local state = month/date info
   - overwrite state via API data
   updates the state with decorated dates with appts, tooltips, acticities

   local state starts as [example for (April 15, 2019)]
   - [{m:3 d:31} , {m:4, d:1} ... {m:4, d:30}, {m:5, d:1}, {m:5, d:2}, {m:5, d:3}, {m:5, d:4}] // length = 35
*/

// this should likely use built js date handling - but I am lazy today.
// this is just so more readable to me today
// it is bad for interationalization, for payload,

// @ref: https://date-fns.org/v1.30.1/docs/eachDay
//
// take in a date
// determmine mode - length | dow
// length is more explicty and take prioity
// length will also include dow in the length range if possible
//
// go backwards past MonthStart, - till you hit the right start DoW, or the right amonuth of days
// then go forward going past the MonthEnd - till you hit the right DoW, or the right amount of days
// get the date-range
// return the date range mapped through the decorator

// const chalk = require('chalk')

import { range, move } from 'ramda/es'
// import { startOfDay } from 'date-fns/start_of_day'
// import { addDays } from 'date-fns/add_days'
// import { lastDayOfMonth } from 'date-fns/last_day_of_month'
// import { getDay } from 'date-fns/get_day'
// import { eachDay } from 'date-fns/each_day'
import { addDays, eachDayOfInterval, getDay, lastDayOfMonth, startOfDay } from 'date-fns/esm'

export const CalendarData = (_args) => {
  // NOTES::
  // + API
  //   - dowStart is required - might as well default it to zero
  //   - SHOULD ask user if they want to force  a clean week start?
  //   - seems like you should always start the week on `dowStart` give it more thought than the 3 of 10 I just gave it.
  // thus the mode.dow should be flagged by something else

  // let { dowStart, length, today } = { dowStart: null, length: null, today: new Date(), ..._args } // acorn/rollup does not like the ... spread operator `magic-string`
  let { dowStart, length, today } = Object.assign({ dowStart: null, length: null, today: new Date() }, _args)
  const date = new Date(today)

  const months = [
    { m: 'Jan', mm: 'Janurary' }, { m: 'Feb', mm: 'Feburary' }, { m: 'Mar', mm: 'March' },
    { m: 'Apr', mm: 'April' }, { m: 'May', mm: 'May' }, { m: 'Jun', mm: 'June' },
    { m: 'Jul', mm: 'July' }, { m: 'Aug', mm: 'August' }, { m: 'Sep', mm: 'September' },
    { m: 'Oct', mm: 'October' }, { m: 'Nov', mm: 'November' }, { m: 'Dec', mm: 'December' }
  ]
  const daysOfWeek = [ 'Sun', 'Mon',
    'Tues', 'Wed', 'Thur', 'Fri',
    'Sat' ]

  const rotate = (times, _arr) => {
    return times === 0 ? _arr
      : range(0, times).reduce((p) => {
        return move(0, -1, p)
      }, _arr)
  }

  function negIdxArray (arr) {
    return new Proxy(arr, {
      get: function (_, index) {
        index = parseInt(index)
        return index < 0 ? arr[arr.length + index] : arr[index]
      }
    })
  }
  const dow = negIdxArray([0, 1, 2, 3, 4, 5, 6])

  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
  const monthEnd = lastDayOfMonth(monthStart)

  // set the mode based on inputs
  let mode = { length: false, dow: false, defaults: false }
  mode['length'] = length && 'before' in length && 'after' in length && Number.isSafeInteger(length.before) && Number.isSafeInteger(length.after)
  mode['dow'] = Number.isSafeInteger(dowStart) && dowStart >= 0 && dowStart <= 6
  mode['defaults'] = !_args

  // set start and end range based on the mode
  let start; let end = null
  if (mode.defaults) {
    // s = JSON.stringify( SOME_VAR_HERE, null, 2)
    // console.log(chalk.orange('using defaults'))
    dowStart = 0
    start = addDays(monthStart, dowStart - getDay(monthStart)) // 0-6 ; 0 is Sunday
    end = addDays(monthEnd, Math.abs(getDay(monthEnd) - dow[dowStart - 1]))
  } else {
    if (mode.length && !mode.dow) {
      dowStart = 0
      start = addDays(date, -length.before)
      end = addDays(date, length.after)
    }
    if (mode.dow && !mode.length) {
      start = addDays(monthStart, dowStart - getDay(monthStart)) // 0-6 ; 0 is Sunday
      end = addDays(monthEnd, Math.abs(getDay(monthEnd) - dow[dowStart - 1]))
    }
    if (mode.dow && mode.length) {
      const lenStart = addDays(date, -length.before)
      const lenEnd = addDays(date, length.after)
      start = addDays(lenStart, dowStart - getDay(lenStart)) // 0-6 ; 0 is Sunday
      end = addDays(lenEnd, Math.abs(getDay(lenEnd) - dow[dowStart - 1]))
    }
    if (!mode.dow && !mode.length) {
      // gave garbage input
      // could throw an error???
      //   console.log(chalk.red.bold('About to return [] - HOPE Thats what you wanted'))
      //   log.white({ dowStart, length, mode })
      //   console.log(chalk.red.bold('returning [] - HOPE Thats what you wanted'))
      //
      // throw new Error('Invalid Inputs');
      return { days: [], header: {} }
    }
  }

  //   log.white({ dowStart, length, date: date.toString(), today: today.toString(), mode, start: start.toString(), end: end.toString() })

  const { m, mm } = months[date.getMonth()]
  const header = { m, mm, y: date.getFullYear(), daysOfWeek: rotate(dowStart, daysOfWeek) }

  const days = eachDayOfInterval({ start, end }).map(v => {
    const { m, mm } = months[v.getMonth()]
    const d = v.getDate()
    const y = v.getFullYear()

    // handles two wrap around cases - then default to the usual case
    const monthIdx = date.getMonth() === 0 && v.getMonth() === 11
      ? -1
      : (date.getMonth() === 11 && v.getMonth() === 0)
        ? 1
        : v.getMonth() - date.getMonth()

    // console.log({ y, m, d, mm, v: startOfDay(v).getTime(), date: startOfDay(date).getTime() })
    return {
      y,
      m,
      mm,
      d,
      monthIdx,
      _m: v.getMonth(),
      today: startOfDay(v).getTime() === startOfDay(date).getTime()
    }
  })

  return { header, days }
}
