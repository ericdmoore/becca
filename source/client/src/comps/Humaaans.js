import { h } from 'hyperapp'
// import cc from 'classcat'
import lobby from '../../static/art-scenes/lobby/lobby.svg'
import title from '../../static/art-scenes/lobby/title.svg'

import PhoneLean from '../../static/art-scenes/leaning-outta-the-phone/lean-outta-phone.svg'
import words from '../../static/art-scenes/leaning-outta-the-phone/words.svg'

import(/* webpackPrefetch: true */ './RequestAcct.js')

const Desktop = ({ Class }) => () => {
  const cssStyle = () => {
    return `
    @media screen and (max-width: 815px) {
          .scoot-front{
              order:-1;
          }
      }`
  }

  return (
    <div class={Class}>
      <style>{cssStyle()}</style>
      <div class="splash-hero d-flex" style="flex-wrap: wrap; justify-content: center;">
        <img width={400} src={words}/>
        <img class='scoot-front' width={400} src={PhoneLean}/>
      </div>
    </div>
  )
}

const Mobile = ({ Class }) => () => {
  return (
    <div class={Class}>
      <div class="d-flex" style='flex-direction: column;'>
        <img src={title}/>
        <img src={lobby}/>
      </div>
    </div>
  )
}

export const Humaaans = () => () => {
  const css = () => {
    return `
    @media screen and (max-width: 815px) {
      .m {display: block;}
      .l {display: none;}
    }
    @media screen and (min-width: 816px) {
      .m {display: none;}
      .l {display: block;}
    }
    `
  }
  return (
    <div>
      <style>{css()}</style>
      <Mobile Class="m"/>
      <Desktop Class="l"/>
      <div class="btn-group btn-group-block">
        <button style='margin:5px 0px;' class="btn btn-primary btn-lg">Login</button>
        <button style='margin:5px 0px;' class="btn btn-lg">Request Account</button>
        <button style='margin:5px 0px;' class="btn btn-lg">More Info</button>
      </div>
      <div style='margin:20px 0px;'></div>
    </div>
  )
}
