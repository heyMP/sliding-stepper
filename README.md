# \<sliding-stepper>

Web Component implementation of Jon Kantner's sliding stepper Codepen. https://codepen.io/jkantner/pen/oNGzBmm

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Demo

[sliding-stepper.vercel.app](https://sliding-stepper.vercel.app)

## Installation

```bash
npm i sliding-stepper
```

## Usage

```html
<script type="module">
  import 'https://unpkg.com/sliding-stepper?module';
</script>

<sliding-stepper></sliding-stepper>

<sliding-stepper min="10" max="20"></sliding-stepper>

<sliding-stepper min="-50" max="50" value="5" step="5"></sliding-stepper>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
