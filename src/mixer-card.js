/* jshint esversion: 8 */

import { LitElement, html } from 'lit'
import {
  computeDomain,
  computeStateDomain
} from 'custom-card-helpers'
import {
  getConfigDefaults,
  generateHeader,
  getFaderStyle,
  getFaderColor,
  getFaderIcon,
  getFaderValue,
  renderDbScale
} from './helpers.js'
import { mixerCardStyles } from './styles.js'

class MixerCard extends LitElement {
  constructor () {
    super()
    // For relative fader tracking
    this._relativeFaderActive = false
    this._relativeFaderStates = {} // Stores state for each active relative fader, keyed by entity_id
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

  static get styles () {
    return mixerCardStyles
  }

  render () {
    const cfg = getConfigDefaults(this.config)

    const faderTemplates = []
    this.faderColors = {}
    if (!this.config || !this.config.faders || !Array.isArray(this.config.faders)) {
      throw new Error('Invalid configuration: "faders" must be an array.')
    }
    for (let faderIndex = 0; faderIndex < this.config.faders.length; faderIndex++) {
      const faderRow = this.config.faders[faderIndex]
      const stateObj = this.hass.states[faderRow.entity_id]
      if (!stateObj) {
        console.warn(`Entity ${faderRow.entity_id} not found in Home Assistant.`)
        continue
      }
      faderTemplates.push(this.renderFader(faderRow, stateObj, cfg))
    }
    const headerSection = generateHeader(cfg)
    const card = html`
      ${headerSection}
      <div>
        <div class='mixer-card fader-orientation-${cfg.orientation}'>
          <div class='fader-holder fader-theme-${cfg.faderTheme}'>          
            ${faderTemplates}
          </div>
        </div>
      </div>
    `
    if (!cfg.haCard) {
      return card
    }
    return html`<ha-card class="mixer-card-ha-card">${card}</ha-card>`
  }

  renderFader (faderRow, stateObj, cfg) {
    const unavailable = stateObj.state === 'unavailable'
    const domain = computeStateDomain(stateObj)
    const maxValue = (typeof faderRow.max === 'number') ? faderRow.max : stateObj.attributes.max || 1
    const minValue = (typeof faderRow.min === 'number') ? faderRow.min : stateObj.attributes.min || 0
    if (!['number', 'media_player', 'input_number'].includes(domain)) {
      return null
    }
    const faderName = faderRow.name || this._entity_property(faderRow.entity_id, '-name')
    const invertActive = faderRow.invert_active || false
    let activeState = faderRow.active_entity_id ? this._entity_property(faderRow.active_entity_id, 'state') : 'on'
    if (domain === 'media_player') {
      activeState = this._entity_property(faderRow.entity_id, '-muted') ? 'off' : 'on'
    }
    if (invertActive) {
      activeState = activeState === 'on' ? 'off' : 'on'
    }
    const icon = getFaderIcon(faderRow, stateObj, activeState)
    const { displayValue, inputValue } = getFaderValue(faderRow, stateObj, this.hass)
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
    const showActiveButton = (typeof faderRow.showActiveButton === 'boolean') ? faderRow.showActiveButton : cfg.showActiveButton
    const activeButton = showActiveButton ? this._renderActiveButton(activeEntity, activeState, unavailable, faderActiveColor, faderInactiveColor, icon) : html`&nbsp;`
    const inputClasses = `${activeState === 'off' ? 'fader-inactive' : 'fader-active'}${unavailable ? ' fader-unavailable' : ''}`
    const inputId = `fader_range_${faderRow.entity_id}`
    const inputStyle = getFaderStyle(faderColors, cfg, activeState)
    let rangeInput
    if (this.config && this.config.relativeFader) {
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
          .value='${inputValue}'
          @mousedown=${e => this._onRelativeFaderDown(e, stateObj, minValue, maxValue)}
          @touchstart=${e => this._onRelativeFaderDown(e, stateObj, minValue, maxValue)}>
      `
    } else if (cfg.updateWhileMoving) {
      rangeInput = html`<input type='range' class='${inputClasses}' id='${inputId}' style='${inputStyle}' .value='${inputValue}' @input=${e => this._setFaderLevel(stateObj, e.target.value)}>`
    } else {
      rangeInput = html`<input type='range' class='${inputClasses}' id='${inputId}' style='${inputStyle}' .value='${inputValue}' @change=${e => this._setFaderLevel(stateObj, e.target.value)}>`
    }
    const rangeHolderSizeVars = `${cfg.faderHeight ? `--fader-height: ${cfg.faderHeight};` : ''}${cfg.faderWidth ? `--fader-width: ${cfg.faderWidth};` : ''}`
    const valueTemplate = ((activeState === 'on') || cfg.alwaysShowFaderValue) ? displayValue : html`<br>`
    // X32-style layout (the 'physical' theme's whole point is to resemble
    // a real Behringer console channel strip): value readout above the
    // fader and a printed dB scale beside it, rather than the modern
    // theme's HA-native value-below-the-slider layout. Kept out of
    // horizontal orientation — real X32 hardware has no horizontal
    // faders, and horizontal's DOM already leans on fragile flex `order`
    // tricks (see styles.js) that a new wrapper element would break.
    const isX32Style = cfg.faderTheme === 'physical' && cfg.orientation !== 'horizontal'
    const showDbScale = (typeof faderRow.showDbScale === 'boolean') ? faderRow.showDbScale : cfg.showDbScale
    const showScale = isX32Style && showDbScale
    const rangeSection = showScale
      ? html`
          <div class='range-holder-wrap'>
            ${renderDbScale()}
            <div class='range-holder' style='${rangeHolderSizeVars}'>
              ${rangeInput}
            </div>
          </div>
        `
      : html`
          <div class='range-holder' style='${rangeHolderSizeVars}'>
            ${rangeInput}
          </div>
        `
    return html`
      <div class='fader ${showScale ? 'has-db-scale' : ''}' id='fader_${faderRow.entity_id}'>
        ${isX32Style ? html`<div class='fader-value fader-value-top'>${valueTemplate}</div>` : ''}
        ${rangeSection}
        <div class='fader-data'>
          <div class='fader-name'>${faderName}</div>
          ${!isX32Style ? html`<div class='fader-value'>${valueTemplate}</div>` : ''}
          <div class='active-button-holder ${unavailable ? 'button-disabled' : ''}'>${activeButton}</div>
        </div>
      </div>
    `
  }

  get relativeFaderPointerEvents () {
    return this._relativeFaderActive ? 'auto' : 'none'
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
    this._relativeFaderStates = {} // Stores state for each active relative fader, keyed by entity_id
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
          <div 
              .key="${activeEntity}_${activeState}"
              class="active-button" 
              ?disabled="${unavailable}"
              @click="${e => this._toggleActive(e)}"
              data-entity="${activeEntity}"
              data-current-state="${activeState}">
            <span class="color" style="color:${activeState === 'on' ? faderActiveColor : faderInactiveColor};">
              <ha-icon .icon="${icon}"></ha-icon>
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
    if (el && colors) {
      if (!el.className.includes('fader-inactive')) {
        el.style.background = `linear-gradient(to right, ${colors.active_color} ${value}%, ${colors.track_color} ${value}%)`
      } else {
        el.style.background = ''
      }
    }
  }

  _toggleActive (e) {
    // Prefer currentTarget (the button) but fall back to finding the button from the click target
    const el = (e && e.currentTarget) ? e.currentTarget : (e && e.target && e.target.closest ? e.target.closest('.active-button') : (e && e.target))
    const dataset = el ? el.dataset : {}
    const { entity } = dataset || {}

    if (!entity) return

    const domain = computeDomain(entity)
    const serviceData = { entity_id: entity }
    let service = ''

    if (domain === 'media_player') {
      // Use actual entity muted state, not the displayed (possibly inverted) state
      const isMuted = !!this._entity_property(entity, '-muted')
      serviceData.is_volume_muted = !isMuted
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
    this._setupFaderWidthObserver()
  }

  async updated () {
    await this.update_track_color()
    this._recomputeFaderWidth()
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    if (this._faderWidthObserver) {
      this._faderWidthObserver.disconnect()
      this._faderWidthObserver = null
    }
  }

  _setupFaderWidthObserver () {
    const holder = this.shadowRoot.querySelector('.fader-holder')
    if (!holder) return
    this._faderWidthObserver = new ResizeObserver(() => this._recomputeFaderWidth())
    this._faderWidthObserver.observe(holder)
    this._recomputeFaderWidth()
  }

  // Fluid mode (--fader-width unset in config) picks a fixed thumb-thickness
  // default, which is wrong for ANY specific card width — too cramped on a
  // wide card (wasted space either side), too wide on a narrow one. Rather
  // than guess a better constant, measure the actual space this card was
  // given and size the thumb thickness to fill it (only for vertical
  // orientation — horizontal's range-holder already fills its row via
  // flex, see styles.js). Every downstream calc() (knob size, dB-scale tick
  // positions) already reads --fader-width as a variable, so recomputing it
  // here is enough to keep them all correct with no further changes.
  _recomputeFaderWidth () {
    const cfg = getConfigDefaults(this.config)
    if (cfg.faderWidth || cfg.orientation === 'horizontal') return
    const holder = this.shadowRoot.querySelector('.fader-holder')
    if (!holder) return
    const faderCount = (this.config.faders && this.config.faders.length) ? this.config.faders.length : 1
    // Per-fader showDbScale overrides can't be reflected here (--fader-width
    // is one shared value for the whole card), so this uses only the
    // card-level default — a fader that overrides it away from that default
    // will be very slightly mis-sized, an acceptable edge case.
    const showScale = cfg.faderTheme === 'physical' && cfg.showDbScale
    const gap = 8 // .fader-holder's gap
    const perFaderChrome = 20 + (showScale ? 26 : 0) // .fader padding (10px * 2), plus the dB scale's own width+gap for physical theme
    const availableWidth = holder.clientWidth
    const perFaderTotal = (availableWidth - gap * (faderCount - 1)) / faderCount
    const thickness = Math.floor(perFaderTotal - perFaderChrome)
    const clamped = Math.max(44, Math.min(150, thickness))
    this.style.setProperty('--fader-width', `${clamped}px`)
  }

  setConfig (config) {
    if (!config || !config.faders || !Array.isArray(config.faders)) {
      throw new Error('Invalid configuration: "faders" must be an array.')
    }
    this.config = config
  }

  getCardSize () {
    const cfg = getConfigDefaults(this.config)
    const faderCount = (this.config.faders && this.config.faders.length) ? this.config.faders.length : 1
    if (cfg.orientation === 'horizontal') {
      // Horizontal faders stack one per row, so height scales with count.
      return faderCount + 1
    }
    // Vertical faders sit side-by-side in a single row, so height tracks
    // the fader length, not how many there are. In fluid mode (no explicit
    // faderHeight) there's no literal pixel value to read, so fall back to
    // a size matching the fixed --fader-height default in styles.js.
    const lengthPx = parseInt((cfg.faderHeight || '').toString().replace('px', ''), 10)
    const rows = Number.isFinite(lengthPx) && lengthPx > 0 ? Math.ceil(lengthPx / 50) : 5
    return rows + 1
  }

  getGridOptions () {
    const cfg = getConfigDefaults(this.config)
    if (!cfg.faderWidth && !cfg.faderHeight) {
      // Fluid mode: let the card span whatever width the section gives it
      // instead of guessing a column count from pixel dimensions that no
      // longer exist.
      return {
        columns: 'full',
        rows: 'auto',
        min_columns: 6
      }
    }
    const faderCount = (this.config.faders && this.config.faders.length) ? this.config.faders.length : 1
    const isHorizontal = cfg.orientation === 'horizontal'
    const rawSize = isHorizontal
      ? (cfg.faderHeight || '150')
      : (cfg.faderWidth || '150')
    let faderSize = parseInt(rawSize.toString().replace('px', ''), 10)
    if (!Number.isFinite(faderSize)) faderSize = 150
    if (isHorizontal) {
      faderSize = faderSize + 80 // Add extra width for horizontal layout to account for name/value display
    }
    const totalFaderWidth = faderCount * (faderSize + 20) // Add 20px per fader for spacing

    const columnsNeeded = Math.max(2, Math.min(48, Math.ceil(totalFaderWidth / 30)))

    return {
      columns: columnsNeeded,
      min_columns: 1,
      max_columns: 48
    }
  }
}

customElements.define('custom-mixer-card', MixerCard)
