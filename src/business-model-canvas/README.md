# Business model canvas for [md-docs](https://github.com/biz-dev-ops/md-docs-cli)

HTML5 web component which renders a business model canvas.

## Usage

- Add `business-model-canvas.js` to the webpage
- Add the `<business-model-canvas></business-model-canvas>` to the page

## Attributes

### src

The url of the business canvas model yaml file.

### model-json

An HTML escaped version of the business model canvas model.

### model

The business model canvas model, must be set via JavaScript.

## Examples

### src attribute

```html
<business-model-canvas src="./model.yml" />
```

### model-json attribute

```html
<business-model-canvas id="business-model-canvas" data-json=" { ...json }"></business-model-canvas>
```

### Javascript

```javascript
  document.getElementById('business-model-canvas').model = {
    keyPartnerships: [ "..." ],
      keyActivities: [ "..." ],
      keyResources: [ "..." ],
      valuePropositions: [ "..." ],
      customerRelationships: [ "..." ],
      channels: [ "..." ],
      customerSegments: [ "..." ],
      costStructure: [ "..." ],
      revenueStreams: [ "..." ]
  }
```
