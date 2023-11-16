import {LitElement, html, css} from 'lit';
import {
  computeStateDisplay,
  computeStateDomain
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
    const haCard = "haCard" in this.config ? this.config.haCard: true;

    const faderTemplates = [];
    for (const fader_index in this.config.faders) {
        let fader_row = this.config.faders[fader_index]
        let stateObj = this.hass.states[fader_row.entity_id]
        let domain = computeStateDomain(stateObj)
        if(domain != 'number') {
            continue
        }
        const fader_name = fader_row['name'] 
            || this._entity_property(fader_row.entity_id, this.hass.states, '-name')
        const activeState = fader_row.active_entity_id ? this._entity_property(fader_row.active_entity_id, this.hass.states, 'state') : 'on';
        const icon = activeState === 'on' ? 'mdi:volume-high' : 'mdi:volume-mute'
        const fader_value = Math.round(stateObj.state * 100) + '%';
        let fader_value_state = fader_row.value_entity_id ? this.hass.states[fader_row.value_entity_id] : null
        const activeButton = fader_row.active_entity_id
            ? html`
             <div class = "active-button" @click="${e => this._toggleActive(e)}" data-entity="${fader_row.active_entity_id}" data-current-state="${activeState}">
                <span class="color" style="color:${activeState === 'on' ? this.faderActiveColor : faderInactiveColor};"><ha-icon icon="${icon}" /></span>
             </div>
        `
            : html `&nbsp;`
        faderTemplates.push(html`
            <div class = "fader" id = "fader_${fader_row.entity_id}">
              <div class="range-holder" style="--fader-height: ${faderHeight};--fader-width: ${faderWidth};">
                  <input type="range" class = "${activeState === 'off' ? "fader-inactive" : "fader-active"}" id = "fader_range_${fader_row.entity_id}" style="--fader-width: ${faderWidth};--fader-height: ${faderHeight}; --fader-border-radius: ${borderRadius};--fader-color:${activeState === 'on' ? this.faderActiveColor : faderInactiveColor};--fader-thumb-color:${faderThumbColor};--fader-track-color:${this.faderTrackColor};--fader-track-inactive-color:${faderInactiveColor};" .value="${Math.round(stateObj.state * 100)}" @change=${e => this._setFaderLevel(stateObj, e.target.value)}>
              </div>
              <div class = "fader-name">${fader_name}</div>
              <div class = "fader-value">${activeState === 'on' ? (fader_value_state ? computeStateDisplay(this.hass.localize, fader_value_state, this.hass.language) : fader_value) : html`<br>`}</div>
              <div class = "active-button-holder">${activeButton}</div>
            </div>
        `);
    }
    const card = html`
      <div>
        <div class="mixer-card" >
            <div class="fader-holder fader-theme-${faderTheme}" >
                ${faderTemplates}
            </div>
        </div>
      </div>
    `;
    if(!haCard) {
      return card
    }
    return html`<ha-card>${card} </ha-card>`;

  }

  _entity_property(entity, hass_state, property) {
    if(hass_state[entity]) {
        if(property === '-name')    {
            return hass_state[entity]['attributes']['friendly_name']
        }
        return hass_state[entity][property]
    }
    return ""
  }

  _setFaderLevel(state, value) {
    this.hass.callService("number", "set_value", {
      entity_id: state.entity_id,
      value: value / 100
    });
  }

  _previewLevel(entity_id, value) {
    const el = this.shadowRoot.getElementById(entity_id);
    if(el && !el.className.includes('fader-inactive')) {
        el.style.background = `linear-gradient(to right, ${this.faderActiveColor} ${value}%, ${this.faderTrackColor} ${value}%)`;
    }
  }

  _toggleActive(e) {
    if (e.target.dataset && e.target.dataset.entity) {
      this.hass.callService("switch", "toggle", {
          entity_id: e.target.dataset.entity,
      });
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
            margin-right: 20px;
        }
        .fader-value {
            margin-top: 10px;
            text-align: center;
        }
        .fader-name {
            margin-top: 30px;
            text-align: center;
            color: #000;
            display: block;
            font-weight: 300;
            text-align: center;
            font-size:18px;
            text-transform: capitalize;
        }
        .range-holder {
            height: var(--fader-height);
            width: var(--fader-width);
            position:relative;
            display: block;
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
            background-image: url("http://localhost:8123/local/fader.svg");
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

    `;
  }
}
customElements.define('custom-mixer-card', MixerCard);

