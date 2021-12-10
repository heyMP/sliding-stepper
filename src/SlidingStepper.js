import { html, css, LitElement } from 'lit';
import { SlidingStepperInstance } from './SlidingStepperInstance.js'

export class SlidingStepper extends LitElement {
  static get styles() {
    return css`
      :host {
        --_hue: var(--sliding-stepper-hue, var(--hue, 223));
        --_bg: var(--sliding-stepper-bg, var(--bg, hsl(var(--_hue), 10%, 90%)));
        --_fg: var(--sliding-stepper-fg, var(--fg, hsl(var(--_hue), 10%, 10%)));
        font-size: calc(20px + (30 - 20) * (100vw - 320px) / (1280 - 320));
        font: 1em/1.5 Inter, sans-serif;
      }
      * {
        border: 0;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .stepper {
        background-color: var(--_fg);
        border-radius: 1em;
        box-shadow: 0 0.75em 1em hsla(0, 0%, 0%, 0.2);
        color: var(--_bg);
        font-weight: bold;
        overflow: hidden;
        padding: 0.75em 0.375em;
        position: relative;
        width: 6em;
        height: 3em;
        transition: background-color 0.3s, color 0.3s,
          transform 0.15s ease-in-out;
        -webkit-appearance: none;
        appearance: none;
        -webkit-tap-highlight-color: #0000;
      }
      .stepper:active {
        transform: scale(0.95);
        transition-delay: 0s, 0s, 0.15s;
      }
      .stepper__btn-area,
      .stepper__btn-area:before,
      .stepper__btn-click,
      .stepper__value {
        position: absolute;
      }
      .stepper__btn-area,
      .stepper__btn-area:before,
      .stepper__btn-click {
        display: block;
        top: 0;
        left: 0;
      }
      .stepper__btn-area {
        width: 2em;
        height: 3em;
      }
      .stepper__btn-area + .stepper__btn-area {
        right: 0;
        left: auto;
      }
      .stepper__btn-area:before {
        border-radius: 50%;
        box-shadow: 0 0 0 0 var(--_bg) inset;
        content: '';
        opacity: 0;
        pointer-events: none;
        top: 0.5em;
        width: 2em;
        height: 2em;
        transform: scale(2.5);
        transition: all 0.4s ease-out;
      }
      .stepper__btn-area:not(:disabled):active:before {
        box-shadow: 0 0 0 1em var(--_bg) inset;
        opacity: 0.25;
        transform: scale(1);
        transition: opacity 0.2s ease-out, transform 0.2s ease-out;
      }
      .stepper__btn-click {
        width: 100%;
        height: 100%;
      }
      .stepper__value {
        animation-duration: 0.3s;
        animation-timing-function: ease-in-out;
        display: inline-block;
        font-size: 1.5em;
        line-height: 1;
        top: calc(50% - 0.75rem);
        left: calc(50% - 1rem);
        text-align: center;
        width: 2rem;
        height: 1.5rem;
        -webkit-user-select: none;
        user-select: none;
      }
      .stepper__value[data-pos='off-left'],
      .stepper__value[data-pos='prev'],
      .stepper__value[data-pos='next'],
      .stepper__value[data-pos='off-right'] {
        opacity: 0.5;
      }
      .stepper__value[data-pos='off-left'] {
        transform: translateX(-2.67em) scale(0.5);
      }
      .stepper__value[data-pos='prev'] {
        transform: translateX(-1.33em) scale(0.5);
      }
      .stepper__value[data-pos='cur'] {
        transform: translateX(0);
      }
      .stepper__value[data-pos='next'] {
        transform: translateX(1.33em) scale(0.5);
      }
      .stepper__value[data-pos='off-right'] {
        transform: translateX(2.67em) scale(0.5);
      }
      .stepper--move-left .stepper__value[data-pos='off-left'] {
        animation-name: moveOffLeft;
      }
      .stepper--move-left .stepper__value[data-pos='prev'] {
        animation-name: middleToLeft;
      }
      .stepper--move-left .stepper__value[data-pos='cur'] {
        animation-name: rightToMiddle;
      }
      .stepper--move-left .stepper__value[data-pos='next'] {
        animation-name: comeInRight;
      }
      .stepper--move-right .stepper__value[data-pos='prev'] {
        animation-name: comeInLeft;
      }
      .stepper--move-right .stepper__value[data-pos='cur'] {
        animation-name: leftToMiddle;
      }
      .stepper--move-right .stepper__value[data-pos='next'] {
        animation-name: middleToRight;
      }
      .stepper--move-right .stepper__value[data-pos='off-right'] {
        animation-name: moveOffRight;
      }

      /* Dark theme */
      @media (prefers-color-scheme: dark) {
        :host {
          --_bg: hsl(var(--_hue), 10%, 20%);
          --_fg: hsl(var(--_hue), 10%, 90%);
        }
      }

      /* Animations */
      @keyframes comeInRight {
        from {
          transform: translateX(2.67em) scale(0.5);
        }
        to {
          transform: translateX(1.33em) scale(0.5);
        }
      }
      @keyframes rightToMiddle {
        from {
          opacity: 0.5;
          transform: translateX(1.33em) scale(0.5);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
      @keyframes middleToLeft {
        from {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        to {
          opacity: 0.5;
          transform: translateX(-1.33em) scale(0.5);
        }
      }
      @keyframes moveOffLeft {
        from {
          transform: translateX(-1.33em) scale(0.5);
        }
        to {
          transform: translateX(-2.67em) scale(0.5);
        }
      }
      @keyframes comeInLeft {
        from {
          transform: translateX(-2.67em) scale(0.5);
        }
        to {
          transform: translateX(-1.33em) scale(0.5);
        }
      }
      @keyframes leftToMiddle {
        from {
          opacity: 0.5;
          transform: translateX(-1.33em) scale(0.5);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
      @keyframes middleToRight {
        from {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        to {
          opacity: 0.5;
          transform: translateX(1.33em) scale(0.5);
        }
      }
      @keyframes moveOffRight {
        from {
          transform: translateX(1.33em) scale(0.5);
        }
        to {
          transform: translateX(2.67em) scale(0.5);
        }
      }
    `;
  }

  static get properties() {
    return {
      step: { type: Number },
      min: { type: Number },
      max: { type: Number },
      value: { type: Number },
    };
  }

  constructor() {
    super();
    this.step = 1;
    this.min = 0;
    this.max = 10;
    this.value = 0;
  }

  firstUpdated() {
    new SlidingStepperInstance(this.shadowRoot.querySelector('.stepper'), {
      step: this.step,
      min: this.min,
      max: this.max,
      value: this.value,
    });
  }

  render() {
    return html`
      <button class="stepper" type="button" value="0">
        <span class="stepper__value" data-pos="off-left" aria-hidden="true"
          >-2</span
        >
        <span class="stepper__value" data-pos="prev" aria-hidden="true"
          >-1</span
        >
        <span class="stepper__value" data-pos="cur">0</span>
        <span class="stepper__value" data-pos="next" aria-hidden="true">1</span>
        <span class="stepper__value" data-pos="off-right" aria-hidden="true"
          >2</span
        >
        <span class="stepper__btn-area">
          <span class="stepper__btn-click" data-dir="down"></span>
        </span>
        <span class="stepper__btn-area">
          <span class="stepper__btn-click" data-dir="up"></span>
        </span>
      </button>
    `;
  }
}
