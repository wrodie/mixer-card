import { computeStateDisplay, computeStateDomain } from 'custom-card-helpers'
import { html } from 'lit'

export function getConfigDefaults (config) {
  return {
    borderRadius: config && config.borderRadius ? config.borderRadius : '12px',
    faderWidth: config && config.faderWidth ? config.faderWidth : '150px',
    faderHeight: config && config.faderHeight ? config.faderHeight : '400px',
    faderInactiveColor: config && config.faderInactiveColor ? config.faderInactiveColor : '#f00',
    faderThumbColor: config && config.faderThumbColor ? config.faderThumbColor : '#ddd',
    faderTrackColor: config && config.faderTrackColor ? config.faderTrackColor : '#ddd',
    faderActiveColor: config && config.faderActiveColor ? config.faderActiveColor : '#22ba00',
    faderTheme: config && config.faderTheme ? config.faderTheme : 'modern',
    updateWhileMoving: config && config.updateWhileMoving ? config.updateWhileMoving : false,
    alwaysShowFaderValue: config && config.alwaysShowFaderValue ? config.alwaysShowFaderValue : false,
    haCard: config && config.haCard !== undefined ? config.haCard : true,
    description: config && config.description ? config.description : '',
    title: config && config.title ? config.title : ''
  }
}

export function generateHeader (cfg) {
  const header = cfg.title ? html`<h1 class='card-header'><div class='name'>${cfg.title}</div></div>` : ''
  const desc = cfg.description ? html`<p class='mixer-description'>${cfg.description}</p>` : ''
  return html`${header}${desc}`
}

export function getFaderStyle (faderColors, cfg, activeState) {
  let style = `--fader-width: ${cfg.faderWidth}; --fader-height: ${cfg.faderHeight}; --fader-border-radius: ${cfg.borderRadius}; `
  style += `--fader-color: ${activeState === 'on' ? faderColors.active : faderColors.inactive}; `
  style += `--fader-thumb-color: ${faderColors.thumb}; --fader-track-color: ${faderColors.track}; --fader-track-inactive-color: ${faderColors.inactive};`
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
