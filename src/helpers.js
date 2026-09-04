import { computeStateDisplay, computeStateDomain } from 'custom-card-helpers'
import { html } from 'lit'

export function getConfigDefaults (config) {
  return {
    borderRadius: config && config.borderRadius ? config.borderRadius : '12px',
    // Leaving these unset (null) puts the card in fluid mode: it sizes
    // itself from CSS (see :host in styles.js) to fit whatever width/height
    // Home Assistant's layout gives it, instead of a fixed pixel size that
    // overflows on narrow viewports. Set them explicitly to opt back into
    // the old fixed-size behavior.
    faderWidth: config && config.faderWidth ? config.faderWidth : null,
    faderHeight: config && config.faderHeight ? config.faderHeight : null,
    faderInactiveColor: config && config.faderInactiveColor ? config.faderInactiveColor : '#f00',
    faderThumbColor: config && config.faderThumbColor ? config.faderThumbColor : '#ddd',
    faderTrackColor: config && config.faderTrackColor ? config.faderTrackColor : '#ddd',
    faderActiveColor: config && config.faderActiveColor ? config.faderActiveColor : '#22ba00',
    faderTheme: config && config.faderTheme ? config.faderTheme : 'modern',
    updateWhileMoving: config && config.updateWhileMoving ? config.updateWhileMoving : false,
    alwaysShowFaderValue: config && config.alwaysShowFaderValue ? config.alwaysShowFaderValue : false,
    showActiveButton: config && config.showActiveButton !== undefined ? config.showActiveButton : true,
    // The printed dB scale is specific to the 'physical' theme (see
    // isX32Style in mixer-card.js) — this just lets it be turned off there
    // while keeping the rest of the X32-style layout (value-on-top).
    showDbScale: config && config.showDbScale !== undefined ? config.showDbScale : true,
    haCard: config && config.haCard !== undefined ? config.haCard : true,
    description: config && config.description ? config.description : '',
    title: config && config.title ? config.title : '',
    faderKnobImage: config && config.faderKnobImage ? config.faderKnobImage : '',
    orientation: config && config.orientation ? config.orientation : 'vertical'
  }
}

// dB scale matching the look of a Behringer X32/M32 channel strip's
// printed fader scale. `f` is the raw 0-1 fader fraction that produces
// each label's dB reading, derived from the X32's actual fader law —
// confirmed empirically against a live X32 (sweeping
// number.x32_main_fader and reading back its `db` attribute), since the
// mixer doesn't expose the raw<->dB conversion directly. The law is
// piecewise-linear in f:
//   f in [0.5,  1.0 ]: dB = f *  40 - 30   (+10 .. -10 dB)
//   f in [0.25, 0.5 ): dB = f *  80 - 50   (-10 .. -30 dB)
//   f in [0.0625,0.25): dB = f * 160 - 70  (-30 .. -60 dB)
//   f in [0,   0.0625): dB = f * 480 - 90  (-60 .. -90 dB, floor/mute)
// `major` picks the tick-line style: longer for the round-ten marks
// (matching a real X32's silkscreened scale), shorter for the
// half-division marks in between.
export const X32_DB_SCALE_TICKS = [
  { label: '+10', f: 1, major: true },
  { label: '5', f: 0.875, major: false },
  { label: '0', f: 0.75, major: true },
  { label: '-5', f: 0.625, major: false },
  { label: '-10', f: 0.5, major: true },
  { label: '-15', f: 0.4375, major: false },
  { label: '-20', f: 0.375, major: true },
  { label: '-25', f: 0.3125, major: false },
  { label: '-30', f: 0.25, major: true },
  { label: '-40', f: 0.1875, major: true },
  { label: '-50', f: 0.125, major: true },
  { label: '-60', f: 0.0625, major: true },
  { label: '-∞', f: 0, major: true }
]

export function renderDbScale () {
  // A native <input type="range"> thumb is normally positioned with half
  // its own size inset from each end of the track (value 0 renders at
  // thumb-size/2, not at pixel 0) — but the physical theme's range input
  // (see styles.js) deliberately extends its own track by exactly the
  // knob's along-track size and re-centers it, which cancels that inset
  // out entirely. The knob's rendered position is therefore already a
  // plain linear function of value across the whole visible track, so
  // every tick (including the +10/-∞ ends) uses the same one-line formula
  // here, no thumb-size math or end-case special-casing needed.
  return html`
    <div class="fader-db-scale">
      ${X32_DB_SCALE_TICKS.map(tick => {
        const top = `${(1 - tick.f) * 100}%`
        return html`
          <span class="db-tick ${tick.major ? 'major' : 'minor'}" style="top: ${top}">
            <span class="db-tick-label">${tick.label}</span>
            <span class="db-tick-line"></span>
          </span>
        `
      })}
    </div>
  `
}

export function generateHeader (cfg) {
  const header = cfg.title ? html`<h1 class='card-header'><div class='name'>${cfg.title}</div></div>` : ''
  const desc = cfg.description ? html`<p class='mixer-description'>${cfg.description}</p>` : ''
  return html`${header}${desc}`
}

export function getFaderStyle (faderColors, cfg, activeState) {
  let style = `--fader-border-radius: ${cfg.borderRadius}; `
  if (cfg.faderWidth) style += `--fader-width: ${cfg.faderWidth}; `
  if (cfg.faderHeight) style += `--fader-height: ${cfg.faderHeight}; `
  style += `--fader-color: ${activeState === 'on' ? faderColors.active : faderColors.inactive}; `
  style += `--fader-thumb-color: ${faderColors.thumb}; --fader-track-color: ${faderColors.track}; --fader-track-inactive-color: ${faderColors.inactive};`
  if (cfg.faderKnobImage) {
    style += ` --fader-knob-image: url("${cfg.faderKnobImage}");`
  }
  return style
}

export function getFaderColor (faderRow, cfg) {
  return {
    track: faderRow.track_color || cfg.faderTrackColor,
    active: faderRow.active_color || cfg.faderActiveColor,
    inactive: faderRow.inactive_color || cfg.faderInactiveColor,
    thumb: faderRow.thumb_color || cfg.faderThumbColor
  }
}

export function getFaderIcon (faderRow, stateObj, activeState) {
  return activeState === 'on' ? 'mdi:volume-high' : 'mdi:volume-mute'
}

export function getFaderValue (faderRow, stateObj, hass) {
  const maxValue = (typeof faderRow.max === 'number') ? faderRow.max : stateObj.attributes.max || 1
  const minValue = (typeof faderRow.min === 'number') ? faderRow.min : stateObj.attributes.min || 0
  let rawValue = 0
  const domain = computeStateDomain(stateObj)
  if (domain === 'media_player') {
    rawValue = stateObj.attributes.volume_level || 0
  } else {
    rawValue = stateObj.state
  }
  const inputValue = Math.round((rawValue - minValue) / (maxValue - minValue) * 100)
  let displayValue = inputValue + '%'
  if (faderRow.value_entity_id && Object.prototype.hasOwnProperty.call(hass.states, faderRow.value_entity_id)) {
    displayValue = computeStateDisplay(hass.localize, hass.states[faderRow.value_entity_id], hass.language)
  } else if (faderRow.value_attribute && Object.prototype.hasOwnProperty.call(stateObj.attributes, faderRow.value_attribute)) {
    displayValue = stateObj.attributes[faderRow.value_attribute]
  }
  const suffix = faderRow.value_suffix || ''
  if (suffix) {
    displayValue += ` ${suffix}`
  }
  return { displayValue, inputValue }
}
