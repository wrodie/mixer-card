/* jshint esversion: 8 */

import { LitElement, html, css } from 'lit'
import {
  computeStateDisplay,
  computeStateDomain,
  computeDomain
} from 'custom-card-helpers'

function getConfigDefaults(config) {
  return {
    borderRadius: config?.borderRadius || '12px',
    faderWidth: config?.faderWidth || '150px',
    faderHeight: config?.faderHeight || '400px',
    faderInactiveColor: config?.faderInactiveColor || '#f00',
    faderThumbColor: config?.faderThumbColor || '#ddd',
    faderTrackColor: config?.faderTrackColor || '#ddd',
    faderActiveColor: config?.faderActiveColor || '#22ba00',
    faderTheme: config?.faderTheme || 'modern',
    updateWhileMoving: config?.updateWhileMoving || false,
    alwaysShowFaderValue: config?.alwaysShowFaderValue || false,
    haCard: config?.haCard !== false,
    description: config?.description || '',
    title: config?.title || ''
  }
}

function generateHeader(cfg) {
  const header = cfg.title ? html`<h1 class='card-header'><div class='name'>${cfg.title}</div></div>` : ''
  const desc = cfg.description ? html`<p class='mixer-description'>${cfg.description}</p>` : ''
  return html`${header}${desc}`
}

function getFaderColor(faderRow, cfg) {
  return {
    track: faderRow.track_color || cfg.faderTrackColor,
    active: faderRow.active_color || cfg.faderActiveColor,
    inactive: faderRow.inactive_color || cfg.faderInactiveColor,
    thumb: faderRow.thumb_color || cfg.faderThumbColor
  }
}

function getFaderIcon(faderRow, stateObj, activeState) {
  return activeState === 'on' ? 'mdi:volume-high' : 'mdi:volume-mute'
}

function getFaderValue(faderRow, stateObj, hass, minValue, maxValue) {
  let faderValueRaw = 0
  const domain = computeStateDomain(stateObj)
  if (domain === 'media_player') {
    faderValueRaw = stateObj.attributes.volume_level || 0
  } else {
    faderValueRaw = stateObj.state
  }
  let faderValue = Math.round((faderValueRaw - minValue) / (maxValue - minValue) * 100) + '%'
  if (faderRow.value_entity_id && Object.prototype.hasOwnProperty.call(hass.states, faderRow.value_entity_id)) {
    faderValue = computeStateDisplay(hass.localize, hass.states[faderRow.value_entity_id], hass.language)
  } else if (faderRow.value_attribute && Object.prototype.hasOwnProperty.call(stateObj.attributes, faderRow.value_attribute)) {
    faderValue = stateObj.attributes[faderRow.value_attribute]
  }
  const suffix = faderRow.value_suffix || ''
  if (suffix) {
    faderValue += ` ${suffix}`
  }
  return faderValue
}

class MixerCard extends LitElement {
  get relativeFaderPointerEvents () {
    return this._relativeFaderActive ? 'auto' : 'none'
  }

  constructor () {
    super()
    // For relative fader tracking
    this._relativeFaderActive = false
    this._relativeFaderStartY = 0
    this._relativeFaderStartValue = 0
    this._relativeFaderMin = 0
    this._relativeFaderMax = 100
    this._relativeFaderStateObj = null
    this._relativeFaderInput = null
    this._relativeFaderSensitivity = 0.2 // percent per pixel
    this._onRelativeFaderMove = this._onRelativeFaderMove.bind(this)
    this._onRelativeFaderUp = this._onRelativeFaderUp.bind(this)
  }

  static get properties () {
    return {
      hass: {},
      config: {},
      active: {}
    }
  }

  render () {
    const cfg = getConfigDefaults(this.config)

    const faderTemplates = []
    this.faderColors = {}
    if (!this.config?.faders || !Array.isArray(this.config.faders)) {
      throw new Error('Invalid configuration: "faders" must be an array.')
    }
    for (let faderIndex = 0; faderIndex < this.config.faders.length; faderIndex++) {
      const faderRow = this.config.faders[faderIndex]
      const stateObj = this.hass.states[faderRow.entity_id]
      if (!stateObj) {
        console.warn(`Entity ${faderRow.entity_id} not found in Home Assistant.`)
        continue
      }

      const unavailable = stateObj.state === 'unavailable'
      const domain = computeStateDomain(stateObj)
      const maxValue = (typeof faderRow.max === 'number') ? faderRow.max : stateObj.attributes.max || 1
      const minValue = (typeof faderRow.min === 'number') ? faderRow.min : stateObj.attributes.min || 0

      if (!['number', 'media_player', 'input_number'].includes(domain)) {
        continue
      }
      const faderName = faderRow.name || this._entity_property(faderRow.entity_id, '-name')
      const invertActive = faderRow.invert_active || false
      let faderValueRaw = 0
      let activeState = faderRow.active_entity_id ? this._entity_property(faderRow.active_entity_id, 'state') : 'on'
      if (invertActive) {
        activeState = activeState === 'on' ? 'off' : 'on'
      }
      if (domain === 'media_player') {
        faderValueRaw = this._entity_property(faderRow.entity_id, '-volume') || 0
        activeState = this._entity_property(faderRow.entity_id, '-muted') ? 'off' : 'on'
      } else {
        faderValueRaw = stateObj.state
      }
      const icon = getFaderIcon(faderRow, stateObj, activeState)
      let faderValue = getFaderValue(faderRow, stateObj, this.hass, minValue, maxValue)
      const activeEntity = faderRow.active_entity_id || (domain === 'media_player' ? faderRow.entity_id : '')
      const faderColors = getFaderColor(faderRow, cfg)
      const faderTrackColor = faderColors.track
      const faderActiveColor = faderColors.active
      const faderInactiveColor = faderColors.inactive
      const faderThumbColor = faderColors.thumb
      this.faderColors[`fader_range_${faderRow.entity_id}`] = {
        track_color: faderTrackColor,
        active_color: faderActiveColor,
        inactive_color: faderInactiveColor,
        thumb_color: faderThumbColor
      }

      const activeButton = this._renderActiveButton(activeEntity, activeState, unavailable, faderActiveColor, faderInactiveColor, icon)
      const inputClasses = `${activeState === 'off' ? 'fader-inactive' : 'fader-active'}${unavailable ? ' fader-unavailable' : ''}`
      const inputId = `fader_range_${faderRow.entity_id}`

      let inputStyle = `--fader-width: ${cfg.faderWidth}; --fader-height: ${cfg.faderHeight}; --fader-border-radius: ${cfg.borderRadius}; `
      inputStyle += `--fader-color: ${activeState === 'on' ? faderActiveColor : faderInactiveColor}; `
      inputStyle += `--fader-thumb-color: ${faderThumbColor}; --fader-track-color: ${faderTrackColor}; --fader-track-inactive-color: ${faderInactiveColor};`

      const inputValue = Math.round((faderValueRaw - minValue) / (maxValue - minValue) * 100)

      let rangeInput
      if (this.config?.relativeFader) {
        // Build style string for range input in relative fader mode (no pointer-events)
        let rangeInputStyle
        if (cfg.faderTheme === 'physical') {
          rangeInputStyle = `${inputStyle.replace(/;+\s*$/, '')}; width:var(--fader-height); height:5px;`
        } else {
          rangeInputStyle = `${inputStyle.replace(/;+\s*$/, '')}; width:var(--fader-height); height:var(--fader-width);`
        }
        rangeInput = html`
          <input type='range'
            class='${inputClasses}'
            id='${inputId}'
            style='${rangeInputStyle}'
            value='${inputValue}'
            @mousedown=${e => this._onRelativeFaderDown(e, stateObj, minValue, maxValue)}
            @touchstart=${e => this._onRelativeFaderDown(e, stateObj, minValue, maxValue)}>
        `
      } else if (updateWhileMoving) {
        rangeInput = html`<input type='range' class='${inputClasses}' id='${inputId}' style='${inputStyle}' value='${inputValue}' @input=${e => this._setFaderLevel(stateObj, e.target.value)}>`
      } else {
        rangeInput = html`<input type='range' class='${inputClasses}' id='${inputId}' style='${inputStyle}' .value='${inputValue}' @change=${e => this._setFaderLevel(stateObj, e.target.value)}>`
      }

      faderTemplates.push(html`
        <div class='fader' id='fader_${faderRow.entity_id}'>
          <div class='range-holder' style='--fader-height: ${cfg.faderHeight};--fader-width: ${cfg.faderWidth};'>
            ${rangeInput}
          </div>
          <div class='fader-name'>${faderName}</div>
          <div class='fader-value'>${(activeState === 'on') || alwaysShowFaderValue ? faderValue : html`<br>`}</div>
          <div class='active-button-holder ${unavailable ? 'button-disabled' : ''}'>${activeButton}</div>
        </div>
      `)
    }

    const headerSection = generateHeader(cfg.title, cfg.description)
    const card = html`
      ${headerSection}
      <div>
        <div class='mixer-card'>
          <div class='fader-holder fader-theme-${cfg.faderTheme}'>
            ${faderTemplates}
          </div>
        </div>
      </div>
    `
    if (!cfg.haCard) {
      return card
    }
    return html`<ha-card>${card}</ha-card>`
  }

  _onRelativeFaderDown (e, stateObj, min, max) {
    e.preventDefault()
    // Support both mouse and touch
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    this._relativeFaderActive = true
    this.requestUpdate()
    this._relativeFaderStartY = clientY
    this._relativeFaderStateObj = stateObj
    this._relativeFaderMin = min
    this._relativeFaderMax = max
    // Get input element
    this._relativeFaderInput = e.target
    this._relativeFaderStartValue = Number(e.target.value)
    window.addEventListener('mousemove', this._onRelativeFaderMove)
    window.addEventListener('touchmove', this._onRelativeFaderMove)
    window.addEventListener('mouseup', this._onRelativeFaderUp)
    window.addEventListener('touchend', this._onRelativeFaderUp)
  }

  _onRelativeFaderMove (e) {
    if (!this._relativeFaderActive) return
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const deltaY = this._relativeFaderStartY - clientY // up is increase
    let newValue = this._relativeFaderStartValue + deltaY * this._relativeFaderSensitivity
    newValue = Math.max(0, Math.min(100, newValue))
    this._relativeFaderInput.value = newValue
    this._setFaderLevel(this._relativeFaderStateObj, newValue)
  }

  _onRelativeFaderUp (e) {
    if (!this._relativeFaderActive) return
    this._relativeFaderActive = false
    this.requestUpdate()
    window.removeEventListener('mousemove', this._onRelativeFaderMove)
    window.removeEventListener('touchmove', this._onRelativeFaderMove)
    window.removeEventListener('mouseup', this._onRelativeFaderUp)
    window.removeEventListener('touchend', this._onRelativeFaderUp)
    this._relativeFaderStateObj = null
    this._relativeFaderInput = null
  }

  _renderActiveButton (activeEntity, activeState, unavailable, faderActiveColor, faderInactiveColor, icon) {
    return activeEntity
      ? html`
          <div class="active-button" ${unavailable ? 'disabled' : ''}
               @click="${e => this._toggleActive(e)}"
               data-entity="${activeEntity}"
               data-current-state="${activeState}">
            <span class="color" style="color:${activeState === 'on' ? faderActiveColor : faderInactiveColor};">
              <ha-icon icon="${icon}" />
            </span>
          </div>
        `
      : html`&nbsp;`
  }

  _entity_property (entity, property) {
    const state = this.hass.states[entity]
    if (!state) return ''

    switch (property) {
      case '-name':
        return state.attributes.friendly_name
      case '-volume':
        return state.attributes.volume_level
      case '-muted':
        return state.attributes.is_volume_muted
      default:
        return state[property]
    }
  }

  _setFaderLevel (state, value) {
    const domain = computeStateDomain(state)
    const faderRow = (this.config && this.config.faders) ? this.config.faders.find(f => f.entity_id === state.entity_id) : undefined
    const maxValue = (faderRow && typeof faderRow.max === 'number') ? faderRow.max : state.attributes.max || 1
    const minValue = (faderRow && typeof faderRow.min === 'number') ? faderRow.min : state.attributes.min || 0
    if (domain === 'media_player') {
      this.hass.callService('media_player', 'volume_set', {
        entity_id: state.entity_id,
        volume_level: value / 100 * (maxValue - minValue) + minValue
      })
    } else {
      // Support per-fader max value from config if present
      this.hass.callService(domain, 'set_value', {
        entity_id: state.entity_id,
        value: value / 100 * (maxValue - minValue) + minValue
      })
    }
  }

  _previewLevel (entityId, value) {
    const el = this.shadowRoot.getElementById(entityId)
    const colors = this.faderColors[entityId]
    if (el && colors && !el.className.includes('fader-inactive')) {
      el.style.background = `linear-gradient(to right, ${colors.active_color} ${value}%, ${colors.track_color} ${value}%)`
    }
  }

  _toggleActive (e) {
    const { entity, currentState } = e.target.dataset
    if (!entity) return

    const domain = computeDomain(entity)
    const serviceData = { entity_id: entity }
    let service = ''

    if (domain === 'media_player') {
      serviceData.is_volume_muted = currentState === 'on'
      service = 'volume_mute'
    } else {
      service = 'toggle'
    }
    this.hass.callService(domain, service, serviceData)

    this.update_track_color()
  }

  async update_track_color () {
    const children = this.shadowRoot.querySelectorAll('.fader input[type="range"]')
    await Promise.all(Array.from(children).map((c) => c.updateComplete))
    Array.from(children).map((c) => this._previewLevel(c.id, c.value))
  }

  async firstUpdated () {
    await this.update_track_color()
  }

  async updated () {
    await this.update_track_color()
  }

  setConfig (config) {
    if (!config?.faders || !Array.isArray(config.faders)) {
      throw new Error('Invalid configuration: "faders" must be an array.')
    }
    this.config = config
  }

  getCardSize () {
    return this.config.entities.length + 1
  }

  static get styles () {
    return css`

        .fader-holder {
            margin: 20px;
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

        .fader-holder {
          display: flex;
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
  }
}
customElements.define('custom-mixer-card', MixerCard)
