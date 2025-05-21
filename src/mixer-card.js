/* jshint esversion: 8 */

import {LitElement, html, css} from 'lit';
import {
  computeStateDisplay,
  computeStateDomain,
  computeDomain
} from 'custom-card-helpers';

class MixerCard extends LitElement {
  constructor() {
    super();
  }
  static get properties() {
    return {
      hass: {},
      config: {},
      active: {}
    };
  }
  render() {
    const borderRadius = this.config.borderRadius ? this.config.borderRadius : '12px';
    const faderWidth = this.config.faderWidth ? this.config.faderWidth : "150px";
    const faderHeight = this.config.faderHeight ? this.config.faderHeight : "400px";
    const faderThumbColor = "faderThumbColor" in this.config ? this.config.faderThumbColor : "#ddd";
    this.faderTrackColor = "faderTrackColor" in this.config ? this.config.faderTrackColor : "#ddd";
    this.faderActiveColor = "faderActiveColor" in this.config ? this.config.faderActiveColor : "#22ba00";
    const faderInactiveColor = "faderInactiveColor" in this.config ? this.config.faderInactiveColor : "#f00";
    const faderTheme = "faderTheme" in this.config ? this.config.faderTheme : "modern";
    const updateWhileMoving = "updateWhileMoving" in this.config ? this.config.updateWhileMoving : false;
    const alwaysShowFaderValue = "alwaysShowFaderValue" in this.config ? this.config.alwaysShowFaderValue : false;
    const haCard = "haCard" in this.config ? this.config.haCard: true;
    const description = this.config ? this.config.description : "";
    const title = this.config ? this.config.title : "";

    const faderTemplates = [];
    this.faderColors = {};
    for (let fader_index = 0; fader_index < this.config.faders.length; fader_index++) {
        let fader_row = this.config.faders[fader_index];
        const stateObj = this.hass.states[fader_row.entity_id];
        if (!stateObj) {
            return null;
        }

        const unavailable = stateObj.state === "unavailable";
        const domain = computeStateDomain(stateObj);
        const max_value = stateObj.attributes.max;
        const min_value = stateObj.attributes.min;

        if(!(['number', 'media_player', 'input_number'].includes(domain))) {
            continue;
        }
        const fader_name = fader_row.name || this._entity_property(fader_row.entity_id, '-name');
        const invert_active = fader_row.invert_active || false;
        let fader_value_raw = 0;
        let activeState = fader_row.active_entity_id ? this._entity_property(fader_row.active_entity_id, 'state') : 'on';
        if(invert_active) {
          activeState = activeState === 'on' ? 'off' : 'on';
        }
        if(domain === "media_player") {
            fader_value_raw = this._entity_property(fader_row.entity_id, '-volume') || 0;
            activeState = this._entity_property(fader_row.entity_id, '-muted') ? 'off' : 'on';
        } else {
            fader_value_raw = stateObj.state;
        }
        const icon = activeState === 'on' ? 'mdi:volume-high' : 'mdi:volume-mute';
        const fader_value = Math.round((fader_value_raw-min_value) / (max_value-min_value) * 100 ) + '%';
        let fader_value_state = fader_row.value_entity_id ? this.hass.states[fader_row.value_entity_id] : null;
        const active_entity = fader_row.active_entity_id || (domain === "media_player" ? fader_row.entity_id : "");

        const fader_track_color = fader_row.track_color || this.faderTrackColor;
        const fader_active_color = fader_row.active_color || this.faderActiveColor;
        const fader_inactive_color = fader_row.inactive_color || faderInactiveColor;
        const fader_thumb_color = fader_row.thumb_color || faderThumbColor;
        this.faderColors[`fader_range_${fader_row.entity_id}`] = {
            track_color: fader_track_color,
            active_color: fader_active_color,
            inactive_color: fader_inactive_color,
            thumb_color: fader_thumb_color,
        };

        const activeButton = active_entity
            ? html`
             <div class = "active-button" ${unavailable ? " disabled " : ""} @click="${e => this._toggleActive(e)}" data-entity="${active_entity}" data-current-state="${activeState}">
                <span class="color" style="color:${activeState === 'on' ? fader_active_color : fader_inactive_color};"><ha-icon icon="${icon}" /></span>
             </div>
        `
            : html `&nbsp;`;

        if (updateWhileMoving) {
            faderTemplates.push(html`
                <div class = "fader" id = "fader_${fader_row.entity_id}">
                  <div class="range-holder" style="--fader-height: ${faderHeight};--fader-width: ${faderWidth};">
                      <input type="range" class = "${activeState === 'off' ? "fader-inactive" : "fader-active"} ${unavailable ? "fader-unavailable" : ""}" id = "fader_range_${fader_row.entity_id}" style="--fader-width: ${faderWidth};--fader-height: ${faderHeight}; --fader-border-radius: ${borderRadius};--fader-color:${activeState === 'on' ? fader_active_color : fader_inactive_color};--fader-thumb-color:${fader_thumb_color};--fader-track-color:${fader_track_color};--fader-track-inactive-color:${fader_inactive_color};" .value="${Math.round((fader_value_raw-min_value) / (max_value-min_value) * 100 )}" @input=${e => this._setFaderLevel(stateObj, e.target.value)}>
                  </div>
                  <div class = "fader-name">${fader_name}</div>
                  <div class = "fader-value">${(activeState === 'on') || alwaysShowFaderValue ? (fader_value_state ? computeStateDisplay(this.hass.localize, fader_value_state, this.hass.language) : fader_value) : html`<br>`}</div>
                  <div class = "active-button-holder ${unavailable ? "button-disabled" : ""}">${activeButton}</div>
                </div>
            `);
        }
        else {
            faderTemplates.push(html`
                <div class = "fader" id = "fader_${fader_row.entity_id}">
                  <div class="range-holder" style="--fader-height: ${faderHeight};--fader-width: ${faderWidth};">
                      <input type="range" class = "${activeState === 'off' ? "fader-inactive" : "fader-active"} ${unavailable ? "fader-unavailable" : ""}" id = "fader_range_${fader_row.entity_id}" style="--fader-width: ${faderWidth};--fader-height: ${faderHeight}; --fader-border-radius: ${borderRadius};--fader-color:${activeState === 'on' ? fader_active_color : fader_inactive_color};--fader-thumb-color:${fader_thumb_color};--fader-track-color:${fader_track_color};--fader-track-inactive-color:${fader_inactive_color};" .value="${Math.round((fader_value_raw-min_value) / (max_value-min_value) * 100 )}" @change=${e => this._setFaderLevel(stateObj, e.target.value)}>
                  </div>
                  <div class = "fader-name">${fader_name}</div>
                  <div class = "fader-value">${(activeState === 'on') || alwaysShowFaderValue ? (fader_value_state ? computeStateDisplay(this.hass.localize, fader_value_state, this.hass.language) : fader_value) : html`<br>`} dB</div>
                  <div class = "active-button-holder ${unavailable ? "button-disabled" : ""}">${activeButton}</div>
                </div>
            `);
        }
    }
    let headers_title = title ? html`<h1 class="card-header"><div class = "name">${title}</div></div>` : "";
    let headers_description = description ? html`<p class = "mixer-description">${description}</p>` : "";
    const card = html`
     ${headers_title}
     ${headers_description}
      <div>
        <div class="mixer-card" >
            <div class="fader-holder fader-theme-${faderTheme}" >
                ${faderTemplates}
            </div>
        </div>
      </div>
    `;
    if(!haCard) {
      return card;
    }
    return html`<ha-card>${card} </ha-card>`;

  }

  _entity_property(entity, property) {
    const state = this.hass.states[entity];
    if (!state) {
        return '';
    }

    switch (property) {
      case '-name':
        return state.attributes.friendly_name;
      case '-volume':
        return state.attributes.volume_level;
      case '-muted':
        return state.attributes.is_volume_muted;
      default:
        return state[property];
    }
  }

  _setFaderLevel(state, value) {
    let domain = computeStateDomain(state);
    if(domain === "media_player") {
        this.hass.callService("media_player", "volume_set", {
          entity_id: state.entity_id,
          volume_level: value / 100
        });
    }
    else {
        let max_value = state.attributes.max;
        let min_value = state.attributes.min || 0;
        this.hass.callService(domain, "set_value", {
          entity_id: state.entity_id,
          value: value / 100 * (max_value-min_value) + min_value
        });
    }
  }

  _previewLevel(entity_id, value) {
    const el = this.shadowRoot.getElementById(entity_id);
    if(el && !el.className.includes('fader-inactive')) {
        el.style.background = `linear-gradient(to right, ${this.faderColors[entity_id].active_color} ${value}%, ${this.faderColors[entity_id].track_color} ${value}%)`;
    }
  }

  _toggleActive(e) {
    const { entity, currentState } = e.target.dataset;
    if (!entity) {
        return;
    }

    const domain = computeDomain(entity);
    const serviceData = { entity_id: entity };

    if (domain === 'media_player') {
      serviceData.is_volume_muted = currentState === 'on';
      this.hass.callService('media_player', 'volume_mute', serviceData);
    } else {
      this.hass.callService('switch', 'toggle', serviceData);
    }

    this.update_track_color();
  }

  async update_track_color() {
    const children = this.shadowRoot.querySelectorAll('.fader input[type="range"]');
    await Promise.all(Array.from(children).map((c) => c.updateComplete));
    Array.from(children).map((c) => this._previewLevel(c.id, c.value));
  }  

  async firstUpdated() {
      await this.update_track_color();
  }

  async updated() {
      await this.update_track_color();
  }
    

  setConfig(config) {
    if (!config.faders) {
      throw new Error("You need to define faders");
    }
    this.config = config;
  }
  getCardSize() {
    return this.config.entities.length + 1;
  }
  static get styles() {
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
    `;
  }
}
customElements.define('custom-mixer-card', MixerCard);

