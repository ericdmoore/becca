import { h } from 'hyperapp'
import PhoneLean from '../../static/art-scenes/leaning-outta-the-phone/lean-outta-phone.svg'
import words from '../../static/art-scenes/leaning-outta-the-phone/words.svg'

const cssStyle = () => {
  return `
  @media screen and (max-width: 815px) {
        .scoot-front{
            order: -1;
        }
    }`
}

export const ArtSplash1 = () => () => {
  return (
    <div>
      <style>{cssStyle()}</style>
      <div class="splash-hero d-flex" style="flex-wrap: wrap; justify-content: center;">
        <img width={400} src={words}/>
        <img class='scoot-front' width={400} src={PhoneLean}/>
      </div>
    </div>
  )
}
