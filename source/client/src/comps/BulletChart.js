/**
 * Actions for dealing with authentication and user credentials
 * @author: Eric Moore <eric@beccamail.org>
 * @module comps/BulletChart
 */

// @roadmap:
//
// functional: explore other constraints like a : "must show" set and then the "optional" set
//    so that the UI can prefer actual &  target and supress only the breaks
//
// presentation: show the actual as an inline value on the bar?
//
// presentation: create a white overlay on the actual to compare to a "current forecast"
//    so that operators would know if they were ahead of / or behind schedule.
//    perhaps ship with various forcasters?
//    linear
//    inversse cubic/logit
//
// bug?: numbers in the ~98% of the largest get chopped off
//

/* eslint-disable no-unused-vars */
import { h } from '../../node_modules/hyperapp'
import { Link, Route, Switch, Redirect, location } from '@hyperapp/router' //eslint-disable-line
/* eslint-enable no-unused-vars */

import { selectedBreaks } from '../utils/BulletChart.helper.js'

const Bullet = ({
  actual, target, max, breaks, forecast, forecastCfg,
  fontSize = 12, actualColor = '#818181', targetColor = '#5B5B5B', colorGradient = '#C591FF',
  _width = 400, _height = 50, _title = null, _desc = null }) => () => {
  //
  const largest = Math.max(actual, target, max, Math.max(...breaks)) * 1.0
  const scale = 1.0 * _width / largest
  // const _forecast = forecast || 0.8 * target
  const _forecastCfg = Object.assign({ name: 'linear' }, forecastCfg)
  const setW = (w) => {
    return Math.round(w * scale, 2)
  }

  const BulletTitle = ({ title }) => {
    if (title) {
      return (<title>{title}</title>)
    } else { return '' }
  }

  const BulletDesc = ({ desc }) => {
    return desc ? (<desc>{desc}</desc>) : ''
  }

  const ForecastBox = ({ value, forecastInput, forecastConfig }) => {
    /**
     *  value or functionConfig must be filled in
     *  if both available `value` wins
     *
     *  options::
     *  forecastConfig = { name: 'linear', low?:0 , max?: 100 }
     *  forecastConfig = { name: 's-curve', midRange?: largest/2, max?: target, kGrowth?: 1 }
     *  forecastConfig = { name: 'hurry', peak?:target, maxRange?: largest }
     *  forecastConfig = { name: 'diy', g: (myParam=2, otherParam=1, anyThingElse='s')=> value => value / myParam * otherParam }
     *  if there is any config error the component will fallback to a linear function
     *
     *  with the generated forecasting function
     *  we will then pass in the forecastInput
     *  Example: use a linear forecast.
     *    low would be the date time for the start of our period... say the first of this month
     *    max would be the datetime for the end of the period... like the 31st of this month. (aka - the first of the next monthh minus a minute )
     *    currentVal would be the datetime for today.
     *
     *  this same pattern is the intended usaage pattern for the built in forecasting fns
     *  give us the domain bounds - where you are presently in the domain space - and we will pump that through to the range
     *
     *
     */

    let g; let f = null
    const _default = Object.assign

    switch (forecastConfig.name) {
      case 'linear':
        g = ({ low, max }) => current => Math.round((current - low) * (max - low) / max)
        f = g(_default({ low: 0, max: largest }, forecastConfig))
        break
      case 's-curve':
        g = ({ midRange, max, kGrowth }) => current => Math.round(max / (1 + Math.exp(-1 * kGrowth * (current - midRange))))
        f = g(_default({ midRange: target / 2, max: target, kGrowth: 1 }, forecastConfig))
        break
      case 'hurry':
        g = ({ max, maxRange }) => current => Math.round(max - Math.exp(Math.log(max) - (5 / maxRange) * current))
        f = g(_default({ peak: target, maxRange: largest }, forecastConfig))
        break
      case 'diy':
        g = forecastConfig.g
        f = g()
        break
      default:
        console.warn(`the name: ${forecastConfig.name} - is not found in the supported list of forecasting functions`)
        g = ({ low, max }) => current => Math.round((current - low) * (max - low) / max)
        f = g(_default({ low: 0, max: largest }, forecastConfig))
    }

    if (value) {
      // console.log(f(value))
      return (<rect id="forecast"
        fill="#FFFFFF" stroke="#838383"
        x="0" y={_height * 0.44}
        height={_height * 0.12} width={setW(value)}></rect>)
    }
    if (forecastInput) {
      // console.log(f(value))
      return (<rect id="forecast"
        fill="#FFFFFF" stroke="#838383"
        x="0" y={_height * 0.44}
        height={_height * 0.12} width={setW(f(forecastInput))}></rect>)
    }
  }

  const spaceoutLabels = ({ breaks, actual, target, max, spacing }) => {
    const largest = Math.max(actual, target, max, ...breaks)
    const _spacing = spacing || 22 * largest / _width

    const whiteList = selectedBreaks([actual, target, max].concat(breaks), _spacing)

    // console.log({ largest, breaks, actual, target, max, _spacing })
    // console.log({ whiteList })
    // const already = new Set()

    return (doIprint) => {
      // console.log({ doIprint })

      if (whiteList.includes(doIprint)) {
        // already.add(value)
        return doIprint.toString()
      } else {
        return ''
      }
    }
  }

  const safePrint = spaceoutLabels({ breaks, target, actual, max, spacing: (largest * 23 / _width) })

  return (
    <svg
      width={`${_width}px`}
      height={`${_height + 20}px`}
      viewBox={`0 0 ${_width} ${_height + 20}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsxlink="http://www.w3.org/1999/xlink">

      { /* Add 20 to height for space to print ticks */ }
      <BulletTitle title={_title}/>
      <BulletDesc desc={_desc}/>

      <g stroke="none" fill="none" fill-rule="evenodd">
        <g id="bullet">

          <g id="BulletShape">
            <rect id="max" fill-opacity="0.4" fill="#C591FF" x="0" y="0" height={_height} width={setW(max)}></rect>
            {breaks.sort((a, b) => b - a)
              .map((v, i, a) =>
                <rect id={`q${a.length - i}`}
                  fill-opacity="0.4" fill={colorGradient} x="0" y="0"
                  height={_height} width={setW(v)}></rect>
              )}
            <ForecastBox value={forecast} forecastConfig={ _forecastCfg } _height={_height}/>
            <rect id="actual" fill={actualColor} x="0" y={_height * 0.28} height={_height * 0.42} width={setW(actual)}></rect>
            <rect id="target" fill={targetColor} y={_height * 0.1} width="4" height={_height * 0.80} x={setW(target)}></rect>
          </g>

          <g id="Ticks" transform={`translate( ${setW(breaks.sort((a, b) => a - b)[0])}, ${_height - 2})`}>
            {breaks.sort((a, b) => a - b).map((v, i, a) =>
              i === 0
                ? <g id={`tick-${i}`}>
                  <text id="lowest" font-family="Arial" font-size={fontSize} font-weight="normal" fill="#000000">
                    <tspan x="0" y="16">{safePrint(v)}</tspan>
                  </text>
                  <path d="M0.5,0 L0.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
                </g>
                : <g id={`tick-${i}`} transform={`translate(${setW(v) - setW(a[0])} , 0)`}>
                  <text id="lowest" font-family="Arial" font-size={fontSize} font-weight="normal" fill="#000000">
                    <tspan x="0" y="16">{safePrint(v)}</tspan>
                  </text>
                  <path d="M0.5,0 L0.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
                </g>
            )}

            <g id="ActTick" transform={`translate(${setW(actual) - setW(breaks.sort((a, b) => a - b)[0])}, 0)`}>
              <text id="80" font-family="Arial" font-size={fontSize} font-weight="normal" fill="#000000">
                <tspan x="0" y="16">{safePrint(actual)}</tspan>
              </text>
              <path d="M0.5,0 L0.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
            </g>

            <g id="TgtTick" transform={`translate(${setW(target) - setW(breaks.sort((a, b) => a - b)[0])}, 0)`}>
              <text id="90" font-family="Arial" font-size={fontSize} font-weight="normal" fill="#000000">
                <tspan x="0" y="16">{safePrint(target)}</tspan>
              </text>
              <path d="M0.5,0 L0.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>)
}

const BulletStatic = () => () => {
  return (
    <svg width="385px" height="64px" viewBox="0 0 385 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink">
      <title>typical</title>
      <desc>Created with Sketch.</desc>
      <g stroke="none" fill="none" fill-rule="evenodd">
        <g id="typical">
          <g id="NormBullet">
            <rect id="max" fill-opacity="0.4" fill="#C591FF" x="0" y="0" width="385" height="49"></rect>
            <rect id="q3" fill-opacity="0.4" fill="#C591FF" x="0" y="0" width="263" height="49"></rect>
            <rect id="q2" fill-opacity="0.4" fill="#C591FF" x="0" y="0" width="223" height="49"></rect>
            <rect id="lowest" fill-opacity="0.45" fill="#C591FF" x="0" y="0" width="175" height="49"></rect>
            <rect id="actual" fill="#818181" x="0" y="14" width="331" height="21"></rect>
            <rect id="target" fill="#5B5B5B" x="353" y="6" width="4" height="37"></rect>
          </g>

          <g id="Ticks" transform="translate(148, 47)">
            <g id="1stTick">
              <text id="lowest" font-family="Arial" font-size="12" font-weight="normal" fill="#000000">
                <tspan x="0" y="16">lowest</tspan>
              </text>
              <path d="M26.5,-6.66133815e-15 L26.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
            </g>

            <g id="2ndTick" transform="translate(54, 0)">
              <text id="next1" font-family="Arial" font-size="12" font-weight="normal" fill="#000000">
                <tspan x="0" y="16">next1</tspan>
              </text>
              <path d="M20.5,-6.66133815e-15 L20.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
            </g>

            <g id="3rdTick" transform="translate(109, 0)">
              <text id="next2" font-family="Arial" font-size="12" font-weight="normal" fill="#000000">
                <tspan x="0" y="16">next2</tspan>
              </text>
              <path d="M5.5,-6.66133815e-15 L5.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
            </g>

            <g id="ActTick" transform="translate(178, 0)">
              <text id="80" font-family="Arial" font-size="12" font-weight="normal" fill="#000000">
                <tspan x="0" y="16">80</tspan>
              </text>
              <path d="M4.5,-6.66133815e-15 L4.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
            </g>

            <g id="TgtTick" transform="translate(206, 0)">
              <text id="90" font-family="Arial" font-size="12" font-weight="normal" fill="#000000">
                <tspan x="0" y="16">90</tspan>
              </text>
              <path d="M1.5,-6.66133815e-15 L1.5,6.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
            </g>

          </g>
        </g>
      </g>
    </svg>)
}

// modules.export = { Bullet }
export { Bullet, BulletStatic }
