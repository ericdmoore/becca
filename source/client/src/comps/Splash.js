import { h } from 'hyperapp'

/**
 * @module comps/Splash
 * @author Eric Moore
 * @description
 * - Request an Account
 * - After Approval, confirm your email
 * - From there you never have to login if you don't want to
 * - you might just use your email app and:
 *      - Send emails to your class mates and bcc: `becca@beccamail.org`
 *      - When you do this, Becca makes notes on your behalf in the churchDB
 * - You Contact and care for your class - with no more signing in to things that never really worked great on our phone to begin with
 * - Need to send an email blast ot your class?
 *      - Email your whole class, and just add `becca@beccamail.org` to your bcc list
 *      - Becca makes one note for every email listed
 *      - If you have the email for someone not in the church system, Becca will send you an email saying could not add note for email: < so and so >
 * - If you do login to beccamail.org
 *      - you can send a text, or call someone - just by pressing the "text" or "call" icons
 *      - when you press the button - Becca notes that YOU < called > Person:So and So at < The Time >
 *          - Becca assumes you are a busy person who is just trying to contact a few people, and not worrying about if the chruchDB needs to know about the details.
 *      - Sometimes you WANT the churhcDB to know the deails of a conversaion
 *          - In those cases, send a "recorded message" - meaning - write the message from Becca, and hit send.
 *          - Hitting send will throw all the text into your messages app.
 */

export const Splash = () => () => {
  return (<div>

    {/* <div class="parallax">
      <div class="parallax-top-left" tabindex="1"></div>
      <div class="parallax-top-right" tabindex="2"></div>
      <div class="parallax-bottom-left" tabindex="3"></div>
      <div class="parallax-bottom-right" tabindex="4"></div>
      <div class="parallax-content">
        <div class="parallax-front">
          <h2>You Contact People. <br></br>Becca Takes notes.</h2>
        </div>
        <div class="parallax-back">
          <img src="//picturepan2.github.io/spectre/img/osx-el-capitan.jpg" class="img-responsive rounded"/>
        </div>
      </div>
    </div> */}

    <div class="timeline">
      <div class="timeline-item" id="timeline-example-1">
        <div class="timeline-left"><a class="timeline-icon tooltip" href="#timeline-example-1" data-tooltip="March 2016"></a></div>
        <div class="timeline-content">
          <div class="tile">
            <div class="tile-content">
              <p class="tile-subtitle">March 2016</p>
              <p class="tile-title">Initial commit</p>
            </div>
          </div>
        </div>
      </div>
      <div class="timeline-item" id="timeline-example-2">
        <div class="timeline-left"><a class="timeline-icon icon-lg tooltip" href="#timeline-example-2" data-tooltip="February 2017"><i class="icon icon-check"></i></a></div>
        <div class="timeline-content">
          <div class="tile">
            <div class="tile-content">
              <p class="tile-subtitle">February 2017</p>
              <p class="tile-title">New Documents experience</p>
              <p class="tile-title"><a href="components.html#bars">Bars</a>: represent the progress of a task</p>
              <p class="tile-title"><a href="components.html#steps">Steps</a>: progress indicators of a sequence of task steps</p>
              <p class="tile-title"><a href="components.html#tiles">Tiles</a>: repeatable or embeddable information blocks</p>
            </div>
            <div class="tile-action">
              <button class="btn">View</button>
            </div>
          </div>
        </div>
      </div>
      <div class="timeline-item" id="timeline-example-3">
        <div class="timeline-left"><a class="timeline-icon icon-lg tooltip" href="#timeline-example-3" data-tooltip="March 2017"><i class="icon icon-check"></i></a></div>
        <div class="timeline-content">
          <div class="tile">
            <div class="tile-content">
              <p class="tile-subtitle">March 2017</p>
              <p class="tile-title"><a href="elements.html#icons">Icons</a>: single-element, responsive and pure CSS icons</p>
              <p class="tile-title"><a href="components.html#popovers">Popovers</a>: small overlay content containers</p>
              <p class="tile-title"><a href="experimentals.html#calendars">Calendars</a>: date or date range picker and events display</p>
              <p class="tile-title"><a href="experimentals.html#carousels">Carousels</a>: slideshows for cycling images</p>
            </div>
            <div class="tile-action">
              <button class="btn">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div class="carousel">

      <input class="carousel-locator" id="slide-1" type="radio" name="carousel-radio" hidden="" checked=""/>
      <input class="carousel-locator" id="slide-2" type="radio" name="carousel-radio" hidden=""/>
      <input class="carousel-locator" id="slide-3" type="radio" name="carousel-radio" hidden=""/>
      <input class="carousel-locator" id="slide-4" type="radio" name="carousel-radio" hidden=""/>

      <div class="carousel-container">
        <figure class="carousel-item">
          <label class="item-prev btn btn-action btn-lg" for="slide-4"><i class="icon icon-arrow-left"></i></label>
          <label class="item-next btn btn-action btn-lg" for="slide-2"><i class="icon icon-arrow-right"></i></label>
          <img class="img-responsive rounded" src="//picturepan2.github.io/spectre/img/osx-yosemite.jpg" alt="macOS Yosemite Wallpaper"/>
        </figure>
        <figure class="carousel-item">
          <label class="item-prev btn btn-action btn-lg" for="slide-1"><i class="icon icon-arrow-left"></i></label>
          <label class="item-next btn btn-action btn-lg" for="slide-3"><i class="icon icon-arrow-right"></i></label>
          <img class="img-responsive rounded" src="//picturepan2.github.io/spectre/img/osx-yosemite-2.jpg" alt="macOS Yosemite Wallpaper"/>
        </figure>
        <figure class="carousel-item">
          <label class="item-prev btn btn-action btn-lg" for="slide-2"><i class="icon icon-arrow-left"></i></label>
          <label class="item-next btn btn-action btn-lg" for="slide-4"><i class="icon icon-arrow-right"></i></label>
          <img class="img-responsive rounded" src="//picturepan2.github.io/spectre/img/osx-el-capitan.jpg" alt="macOS El Capitan Wallpaper"/>
        </figure>
        <figure class="carousel-item">
          <label class="item-prev btn btn-action btn-lg" for="slide-3"><i class="icon icon-arrow-left"></i></label>
          <label class="item-next btn btn-action btn-lg" for="slide-1"><i class="icon icon-arrow-right"></i></label>
          <img class="img-responsive rounded" src="//picturepan2.github.io/spectre/img/osx-el-capitan-2.jpg" alt="macOS El Capitan Wallpaper"/>
        </figure>
      </div>

      <div class="carousel-nav">
        <label class="nav-item text-hide c-hand" for="slide-1">1</label>
        <label class="nav-item text-hide c-hand" for="slide-2">2</label>
        <label class="nav-item text-hide c-hand" for="slide-3">3</label>
        <label class="nav-item text-hide c-hand" for="slide-4">4</label>
      </div>

    </div>  */}
    {/* ^ closes carousel div */}
  </div>)
}
