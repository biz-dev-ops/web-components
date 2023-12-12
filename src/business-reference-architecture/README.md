# Business reference architecture for [md-docs](https://github.com/biz-dev-ops/md-docs-cli)

HTML5 web component which renders a business reference architecture.

## Usage

- Add `business-reference-architecture.js` to the webpage
- Add the `<business-reference-architecture></business-reference-architecture>` to the page

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
    document.getElementById('business-reference-architecture').model = {
    	endUsers: {
            title: "end users",
            items: [{
                icon: "test",
                title: "test",
                link: "../../test/index.html"
            }]
        },
        channels: [{
            icon: "test",
            title: "test",
            link: "../../test/index.html"
        }],
        vallueStreams: [ "..." ],
        businessCapabilities: [ "..." ],
        principles: [ "..." ]
    }
<script>
```
