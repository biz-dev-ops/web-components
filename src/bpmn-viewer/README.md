# Business reference architecture for [md-docs](https://github.com/biz-dev-ops/md-docs-cli)

HTML5 web component which renders a BPMN file.

## Usage

- Add `bpmn-viewer.js` to the webpage
- Add the `<bpmn-viewer></bpmn-viewer` to the page
  
## Attributes

### src

The url of the BPMNN file.

### data-xml

An HTML escaped version of a process in BPMN xml format.

## Examples

### src attribute

```html
<bpmn-viewer src="./process.bpmn"></bpmn-viewer>
```

### data-xml attribute

```html
<bpmn-viewer data-xml="...xml"></bpmn-viewer>
```

### show process attribute

Attribute to start viewing a sub process which is part of the process.
Use sub process id's, linked togerther by a slash (/), to indicate which nested sub process should be loaded.

```html
<bpmn-viewer show-process="sub_process_a/sub_process_b"></bpmn-viewer>
```

### enable simulator attribute

Attribute to indicate of the token simulator extension should be loaded.

```html
<bpmn-viewer enable-simulator="true"></bpmn-viewer>
```

### disable interaction attribute

Attribute to indicate if nouse interaction with the process is allowed or not.

```html
<bpmn-viewer disable-interaction="true"></bpmn-viewer>
```

### Javascript

```javascript
  const buttons = document.getElementById("buttons");
  const viewer = document.getElementsByTagName("bpmn-viewer")[0];

  viewer.addEventListener("onelementclick", (event) => {
      //Handle event
  });

  buttons.addEventListener("click", function (event) {
      const target = event.target;

      if (target.id === "zoom-in") {
          viewer.zoomIn();
      }

      if (target.id === "zoom-out") {
          viewer.zoomOut();
      }

      if (target.id === "reset-zoom") {
          viewer.zoomReset();
      }

      if (target.id === "change-src") {
        viewer.src = "./_test-data/test_subprocesses.bpmn";
      }

      if (target.id === "toggle-simulator") {
          viewer.enableSimulator = !viewer.enableSimulator;
      }

      if (target.id === "toggle-interaction") {
        viewer.disableInteraction = !viewer.disableInteraction;
      }
  });
</script>
```
