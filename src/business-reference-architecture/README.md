# Business reference architecture for [md-docs](https://github.com/biz-dev-ops/md-docs-cli)

HTML5 web component which renders a business reference architecture.

## Usage

- Add `business-reference-architecture.js` to the webpage
- Add the `<business-reference-architecture></business-reference-architecture>` to the page

The group title has a default value, but can be overwritten with a custom value.

Font icon support for:

- [Material icons, add mat- before the icon name.](https://fonts.google.com/icons)

## Attributes

### src

The url of the business reference architecture yaml file.

### model-json

An HTML escaped version of the business reference architecture model.

### model

The  business reference architecture model, must be set via JavaScript.

## Examples

### src attribute

```html
<business-reference-architecture src="./model.yml"></business-reference-architecture>
```

### model-json attribute

```html
<business-reference-architecture data-json="[ ...section ]"></business-reference-architecture>
```

### Javascript

```html
<business-reference-architecture id="viewer"></business-reference-architecture>

<script>
    const viewer = document.getElementById("viewer");

    viewer.src = "./model.yml";

    viewer.model = [...section];
<script>
```
