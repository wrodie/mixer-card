import { css } from 'lit'

export const mixerCardStyles = css`
    :host {
        display: block;
        width: max-content;
        min-width: 100%;
        max-width: 100%;
        box-sizing: border-box;
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
        margin: 20px;
    }
    .fader-holder {
      display: flex;
      
      width: 100%;
      overflow-x: auto; /* Enables the scrollbar */
      -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */      
    }
    .fader {
        padding: 6px 10px;
    }
    .fader-value {
        margin-top: 10px;
        text-align: center;
    }
    .fader-name {
        margin-top: 30px;
        text-align: center;
        display: block;
        font-weight: 300;
        text-align: center;
        font-size:14px;
        text-transform: capitalize;
    }
    .range-holder {
        height: var(--fader-height);
        width: var(--fader-width);
        position:relative;
        display: block;
        margin-right: auto;
        margin-left: auto;
    }
    .range-holder input[type="range"] {
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
    /* Theme Physical */
    .fader-theme-physical .range-holder input[type="range"] {
        top: 50%;
        width: var(--fader-height);
        height: 5px;
        background-color: var(--fader-track-color);
    }
    .fader-theme-physical .range-holder input[type="range"].fader-inactive {
        background-color: var(--fader-track-inactive-color);
    }
    .fader-theme-physical .range-holder input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height:40px;
        width:85px;
        cursor: pointer;
        transition: box-shadow 0.2s ease-in-out;
        background-image: url("/hacsfiles/mixer-card/fader.svg");
        background-size: cover;
        border-radius: 7px;
    }
    .fader-unavailable, .button-disabled {
        opacity: 20%;
        pointer-events: none;
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
    .active-button {
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
`
