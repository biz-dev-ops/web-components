# Business model canvas for [md-docs](https://github.com/biz-dev-ops/md-docs-cli)

HTML5 web component which renders a business model canvas.

## Usage

- Add `business-model-canvas.js` to the webpage
- Add the `<business-model-canvas></business-model-canvas>` to the page

## Attributes

### model-json

An HTML escaped version of the business model canvas model.

### model

The business model canvas model, must be set via JavaScript.

## Examples

### HTML

```html
<business-model-canvas model-json="{ &quot;key &quot;: &quot;value &quot; }" />
```

### HTML and JavaScript

```html
<business-model-canvas id="business-model-canvas" model-json=" { ...json }"></business-model-canvas>

<script>
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
<script>
```
