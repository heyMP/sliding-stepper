export class SlidingStepperInstance {
  constructor(target, args) {
    const { step, min, value, max } = args;

    this.el = target;
    this.step = step !== undefined ? step : 1;
    this.min = min !== undefined ? min : -9;
    this.value = value !== undefined ? value : 0;
    this.max = max !== undefined ? max : 99;
    this.valuePos = 0;
    this.values = [];
    this.posData = ['off-left', 'prev', 'cur', 'next', 'off-right'];

    this.init();
    this.changeValue();

    if (this.el) {
      this.el.addEventListener('click', this.changeValue.bind(this));
      this.el.addEventListener('keydown', this.changeValue.bind(this));
    }
  }
  init() {
    // ensure step is a number above 0, or suffer an infinite loop later
    if (this.step < 1 || isNaN(this.step)) this.step = 1;

    // handle a value being outside bounds
    if (this.value < this.min) this.value = this.min;
    else if (this.value > this.max) this.value = this.max;

    // ensure min is less than max, or make it same as max
    if (this.min > this.max) this.min = this.max;

    // load values before initial…
    for (let l = this.value; l >= this.min; l -= this.step)
      this.values.unshift(l);
    this.values.unshift(this.min);

    // …then those after it
    for (let r = this.value; r <= this.max; r += this.step)
      this.values.push(r);
    this.values.push(this.max);

    // kill the dupes
    this.values = [...new Set(this.values)];

    // initial value
    this.valuePos = this.values.indexOf(this.value);
  }
  changeValue(e) {
    // get the direction
    let dir = null;

    if (e) {
      const { key, target } = e;

      if (key) {
        if (key === 'ArrowUp' || key === 'ArrowRight') dir = 'up';
        else if (key === 'ArrowDown' || key === 'ArrowLeft') dir = 'down';
      } else {
        dir = target.getAttribute('data-dir');
      }
    }

    // reset the animation
    const cl = this.el ? this.el.classList : null;

    if (cl) {
      cl.remove('stepper--move-left', 'stepper--move-right');
      void this.el.offsetWidth;
    }

    // increment or decrement, apply the animation
    if (dir === 'up' && this.valuePos < this.values.length - 1) {
      ++this.valuePos;
      cl.add('stepper--move-left');
    } else if (dir === 'down' && this.valuePos > 0) {
      --this.valuePos;
      cl.add('stepper--move-right');
    }

    this.value = this.values[this.valuePos];
    this.el.value = this.value;

    // update the display
    if (this.el) {
      this.posData.forEach((p, i) => {
        const pos = this.el.querySelector(`[data-pos="${p}"]`);

        if (pos) {
          const relIndex = this.valuePos + (i - 2);
          const value = this.values[relIndex];

          pos.innerText = value !== undefined ? value : '';
        }
      });
    }
  }
}