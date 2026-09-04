import { css } from 'lit'

export const mixerCardStyles = css`
    :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
        /* Fluid fader dimensions: used whenever a fader/card config doesn't
           set an explicit faderWidth/faderHeight (see getConfigDefaults).
           Deliberately fixed, not vw/vh-based: this card can end up in a
           section column far narrower than the browser viewport (HA's
           sections view splits the page into several such columns), and
           viewport units have no way to know that — they size against the
           whole window, not the space actually given to the card, which
           reintroduces the original overflow/wrap bug one level up. A
           modest fixed default plus .fader-holder's flex-wrap is what
           actually makes this responsive: faders wrap onto a new row once
           the card's *own* width runs out, regardless of viewport size. */
        --fader-width: 84px;
        --fader-height: 220px;
    }

    h4 {
        color: #00F;
        display: block;
        font-weight: 300;
        margin-bottom: 30px;
        text-align: center;
        font-size:20px;
        margin-top:0;
        text-transform: capitalize;
    }
    h4.brightness:after {
      content: attr(data-value);
      padding-left: 1px;
    }
    .mixer-card {
        /* padding (not margin) matches ha-card's own .card-content
           convention, so this card lines up with sibling cards without
           needing a card_mod offset hack. */
        padding: 16px;
        box-sizing: border-box;
    }
    .fader-holder {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      width: 100%;
      overflow-x: auto; /* Fallback if a single row still can't fit */
      -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    }


    .active-button span {
      pointer-events: none;
    }
    .active-button ha-icon {
      pointer-events: none;
    }
    p.mixer-description {
        margin: 16px;
        margin-top: 0px;
    }
    .fader-unavailable, .button-disabled {
        opacity: 20%;
        pointer-events: none;
    }

    /* Orientation  - Vertical */

    .fader-orientation-vertical .fader {
        padding: 6px 10px;
        /* Fixed to the slider's own thickness rather than sized from the
           name/value text below it — otherwise a longer fader name (e.g.
           "Office Speaker") silently widens the whole column, and a couple
           of those can be just enough to tip flex-wrap into wrapping faders
           that would otherwise fit side by side. Text wraps within this
           width instead (see .fader-name/.fader-value below). */
        width: var(--fader-width);
        flex: 0 0 auto;
        box-sizing: content-box;
    }
    .fader-orientation-vertical .fader-value {
        margin-top: 10px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fader-orientation-vertical .fader-name {
        margin-top: 30px;
        text-align: center;
        display: block;
        font-weight: 300;
        text-align: center;
        font-size:14px;
        text-transform: capitalize;
        /* Truncate rather than wrap/grow: a longer name (e.g. "Office
           Speaker") should never widen the fader column — that's the
           slider's job to define (--fader-width), not the label's. This
           matches how HA's own cards handle overflowing text (tile, entity
           rows, etc: ellipsis, not reflow). */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .fader-orientation-vertical .active-button {
        margin:20px;
        margin-top: 30px;
        line-height:20px;
        border: 1px solid #bbb;
        box-shadow: 1px 1px 1px #bbb;
        display:block;
        padding: 5px;
        cursor:pointer;
        vertical-align: center;
        text-align: center;
        border-radius: 5px;
    }
    .fader-orientation-vertical .range-holder {
        height: var(--fader-height);
        width: var(--fader-width);
        position:relative;
        display: block;
        margin-right: auto;
        margin-left: auto;
    }

    .fader-orientation-vertical .range-holder input[type="range"] {
        margin: 0;
        outline: 0;
        border: 0;
        -webkit-transform:rotate(270deg);
        -moz-transform:rotate(270deg);
        -o-transform:rotate(270deg);
        -ms-transform:rotate(270deg);
        transform:rotate(270deg);
        position: absolute;
        top: calc(50% - (var(--fader-width) / 2));
        right: calc(50% - (var(--fader-height) / 2));
        background-color: var(--fader-track-color);
        transition: box-shadow 0.2s ease-in-out;
        -webkit-appearance: none;
        appearance: none;
        border-radius: var(--fader-border-radius, 12px);
    }

    /* Orientation  - Horizontal */

    .fader-orientation-horizontal .fader-holder {
        display: contents;
    }
    .fader-orientation-horizontal .fader {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0;
        margin-bottom: 0px;
        gap: 15px;
    }
    .fader-orientation-horizontal .fader-holder,
    .fader-orientation-horizontal .fader-data {
        display: contents;
    }
    .fader-orientation-horizontal .fader-value {
        text-align: center;
        display:inline-block;
        order: 3;
        min-width: 50px;
    }
    .fader-orientation-horizontal .fader-name {
        display:inline-block;
        text-align: center;
        font-weight: 300;
        text-align: left;
        font-size:14px;
        text-transform: capitalize;
        order: 4;
    }
    .fader-orientation-horizontal .active-button-holder {
        display:inline-block;
        order: 1;
    }
    .fader-orientation-horizontal .active-button {
        line-height:20px;
        border: 1px solid #bbb;
        box-shadow: 1px 1px 1px #bbb;
        display: inline-block;
        padding: 5px;
        cursor:pointer;
        vertical-align: center;
        text-align: center;
        border-radius: 5px;
    }

    .fader-orientation-horizontal .range-holder {
        order: 2;
        height: var(--fader-width);
        /* Fill whatever width the row has left, rather than a fixed
           --fader-height, so horizontal faders track the card's actual
           width instead of overflowing/underflowing it. */
        flex: 1 1 auto;
        width: auto;
        min-width: 80px;
        position:relative;
        display: flex;
        align-items: center;
        margin: 0;
    }

    .fader-orientation-horizontal .range-holder input[type="range"] {
        margin: 0;
        outline: 0;
        border: 0;
        top: 50%;
        position: absolute;
        transform: translateY(-50%);
        left: 0;
        width: 100%;
        height: var(--fader-width);
        background-color: var(--fader-track-color);
        transition: box-shadow 0.2s ease-in-out;
        -webkit-appearance: none;
        appearance: none;
        border-radius: var(--fader-border-radius, 12px);
    }

    /* Theme Physical */
    /* The knob-width track extension below (so the knob's center can reach
       the true top/bottom extremes) makes the knob itself overshoot the
       nominal track by half its own along-track size at full travel —
       clipping that with overflow:hidden just cuts the knob in half at the
       extremes, which reads as a rendering bug, not a housing edge. Instead
       give the knob room to be fully visible there: push the range-holder-
       wrap (or bare range-holder when the dB scale is hidden, see
       mixer-card.js) away from the value/name text above and below by
       exactly that overshoot amount, on both sides of the direct-child
       selector since which element is the actual direct child differs
       depending on whether the scale renders. */
    .fader-orientation-vertical .fader-theme-physical .fader > .range-holder,
    .fader-orientation-vertical .fader-theme-physical .fader > .range-holder-wrap {
        margin-top: calc(var(--fader-width) * 0.283335);
        margin-bottom: calc(var(--fader-width) * 0.283335);
    }
    .fader-theme-physical .range-holder input[type="range"] {
        top: 50%;
        /* An unstyled range input always insets its thumb's travel by half
           the thumb's own along-track size from each end of its track —
           so at raw value 0/1 the knob stops short of the true top/bottom
           extremes (and of where the dB scale's +10/-∞ labels sit, see
           renderDbScale in helpers.js). Extending the track by exactly the
           knob's own width (matching the ratio used for the knob itself
           below) and re-centering via the right offset cancels that inset
           out entirely, so the knob's center lines up with the scale's
           edges at full travel -- verified against real X32 reference
           screenshots showing exactly that alignment.
           (Vertical orientation only -- horizontal's own width:100% rule
           further down wins on specificity and is unaffected.) */
        width: calc(var(--fader-height) + (var(--fader-width) * 0.56667));
        right: calc(50% - ((var(--fader-height) + (var(--fader-width) * 0.56667)) / 2));
        height: 5px;
        background-color: var(--fader-track-color);
    }
    .fader-theme-physical .range-holder input[type="range"].fader-inactive {
        background-color: var(--fader-track-inactive-color);
    }
    .fader-theme-physical .range-holder input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        /* Scaled from --fader-width (thickness) rather than a fixed 40x85px,
           so the knob shrinks/grows with the track instead of overflowing
           it at small fluid sizes. Ratio matches the old fixed values
           exactly at the legacy 150px default, so background-size: cover
           crops the SVG the same way as before at any scale. */
        height: calc(var(--fader-width) * 0.26667);
        width: calc(var(--fader-width) * 0.56667);
        cursor: pointer;
        transition: box-shadow 0.2s ease-in-out;
        background-image: var(--fader-knob-image, url("/hacsfiles/mixer-card/fader.svg"));
        background-size: cover;
        border-radius: 7px;
    }

    /* Theme Modern */
    .fader-theme-modern .range-holder input[type="range"] {
        width: var(--fader-height);
        height: var(--fader-width);
        -webkit-appearance: none;
        background-color: var(--fader-track-color);
        overflow: hidden;
    }
    .fader-theme-modern .range-holder input[type="range"]::-webkit-slider-runnable-track {
        height: var(--fader-width);
        -webkit-appearance: none;
        background-color: var(--fader-track-color);
        margin-top: -1px;
        transition: box-shadow 0.2s ease-in-out;
    }
    .fader-theme-modern .range-holder input[type="range"]::-webkit-slider-thumb {
        width: 25px;
        border-right:10px solid var(--fader-color);
        border-left:10px solid var(--fader-color);
        border-top:20px solid var(--fader-color);
        border-bottom:20px solid var(--fader-color);
        -webkit-appearance: none;
        height: 80px;
        cursor: pointer;
        background: #fff;
        box-shadow: -350px 0 0 350px var(--fader-color), inset 0 0 0 80px var(--fader-thumb-color);
        border-radius: 0;
        transition: box-shadow 0.2s ease-in-out;
        position: relative;
        top: calc((var(--fader-width) - 80px) / 2);
    }

    /* Both themes above set an explicit width on the range input (driven
       by --fader-height, meant as the vertical-orientation "length" after
       rotation). In horizontal orientation that same input is never
       rotated, so pin its width back to 100% of the flexed range-holder
       (higher specificity than the theme rules so it wins regardless of
       theme). */
    .fader-orientation-horizontal .fader-theme-modern .range-holder input[type="range"],
    .fader-orientation-horizontal .fader-theme-physical .range-holder input[type="range"] {
        width: 100%;
    }

    /* X32-style layout (physical theme, vertical orientation only — see
       isX32Style in mixer-card.js). Value readout above the fader instead
       of below, plus a printed dB scale to its left. */
    .fader-value-top {
        margin-top: 0;
        margin-bottom: 8px;
    }
    .range-holder-wrap {
        display: flex;
        align-items: stretch;
        /* No gap: the scale's own tick lines (below) bridge the space to
           the slider, so it reads as connected rather than floating. */
        gap: 0;
    }
    /* The scale sits beside the slider, so the fader column needs to be
       wider than just the slider's own thickness to fit both — but only
       when the scale is actually rendered (showDbScale: false drops the
       .has-db-scale class along with the scale markup itself, see
       renderFader in mixer-card.js). */
    .fader-orientation-vertical .fader.has-db-scale {
        width: calc(var(--fader-width) + 26px);
    }
    /* .fader-value-top/.fader-name center themselves across the *whole*
       fader box by default, which now includes the scale's 22px + 4px gap
       to the left — so their centered text skews visibly left of the
       slider itself. Push the centering context right by exactly that
       width so it lines up with the slider, not the scale+slider box. */
    .fader-orientation-vertical .fader.has-db-scale .fader-value-top,
    .fader-orientation-vertical .fader.has-db-scale .fader-name {
        margin-left: 26px;
    }
    .fader-db-scale {
        position: relative;
        /* Was 22px + a 4px gap to the slider; the gap moved to 0 above, so
           this absorbs it — same total footprint, just tighter to the
           fader (see .fader's own +26px width allowance below). */
        width: 26px;
        flex: 0 0 auto;
        font-size: 9px;
        line-height: 1;
        color: var(--secondary-text-color, #888);
    }
    .fader-db-scale .db-tick {
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 3px;
    }
    .fader-db-scale .db-tick-line {
        flex: 0 0 auto;
        height: 1px;
        background: currentColor;
        width: 3px;
    }
    .fader-db-scale .db-tick.major .db-tick-line {
        width: 6px;
    }
`
