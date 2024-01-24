# Business reference architecture for [md-docs](https://github.com/biz-dev-ops/md-docs-cli)

HTML5 web component which renders a business reference architecture.

## Usage

- Add `business-reference-architecture.js` to the webpage
- Add the `<business-reference-architecture></business-reference-architecture>` to the page

The group title has a default value, but can be overwritten with a custom value.

Font icon support for:

- [Material icons, add mat- before the icon name.](https://fonts.google.com/icons)
- [Font awesome icons, add fa- before the icon name.](https://fontawesome.com/)
- [Phosphor icons, add ph- before the icon name.](https://phosphoricons.com/)

## Attributes

### model-json

An HTML escaped version of the business reference architecture model.

### model

The business reference architecture model, must be set via JavaScript.

## Examples

### HTML

```html
<business-reference-architecture model-json="{ &quot;key &quot;: &quot;value &quot; }"></business-reference-architectur>
```

### HTML and JavaScript

```html
<business-reference-architecture id="business-reference-architecture"></business-reference-architectur>

<script>
    document.getElementById('business-reference-architecture').model = [
        sections
    ];
<script>
```
