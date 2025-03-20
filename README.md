# @biz-dev-ops/web-components

A collection of web components for displaying and interacting with various business models and diagrams.

[![test](https://github.com/biz-dev-ops/web-components/actions/workflows/pr_commit.yaml/badge.svg)](https://github.com/biz-dev-ops/web-components/actions/workflows/pr_commit.yaml)
[![release](https://github.com/biz-dev-ops/web-components/actions/workflows/pr_merged.yml/badge.svg)](https://github.com/biz-dev-ops/web-components/actions/workflows/pr_merged.yml)
[![npm](https://img.shields.io/npm/v/@biz-dev-ops/web-components.svg)](https://npmjs.org/package/@biz-dev-ops/web-components)
[![npm](https://img.shields.io/npm/dm/@biz-dev-ops/web-components.svg)](https://npmjs.org/package/@biz-dev-ops/web-components)

## Installation

```bash
npm install @biz-dev-ops/web-components
```

## Components

### BPMN Viewer
A component for viewing and interacting with BPMN diagrams.

```html
<bpmn-viewer src="path/to/diagram.bpmn"></bpmn-viewer>
```

Features:
- Zoom in/out controls
- Simulator mode
- Interactive elements
- Custom event handling

### Business Model Canvas
A component for displaying and editing business model canvases.

```html
<business-model-canvas></business-model-canvas>
```

### Business Reference Architecture
A component for visualizing business reference architectures.

```html
<business-reference-architecture></business-reference-architecture>
```

### Command Viewer
A component for displaying command structures.

```html
<command-viewer></command-viewer>
```

### DMN Viewer
A component for viewing Decision Model and Notation (DMN) diagrams.

```html
<dmn-viewer></dmn-viewer>
```

### Event Viewer
A component for visualizing event structures and flows.

```html
<event-viewer></event-viewer>
```

### Markdown Viewer
A component for rendering markdown content.

```html
<markdown-viewer src="path/to/content.md"></markdown-viewer>
```

### Mermaid Viewer
A component for rendering Mermaid diagrams.

```html
<mermaid-viewer src="path/to/diagram.mmd"></mermaid-viewer>
```

### Model Viewer
A component for displaying various business models.

```html
<model-viewer></model-viewer>
```

### Query Viewer
A component for visualizing query structures.

```html
<query-viewer></query-viewer>
```

### Task Viewer
A component for displaying and managing tasks.

```html
<task-viewer></task-viewer>
```

## Development

### Requirements
- git
- npm

### Local Development
```bash
git clone git@github.com:biz-dev-ops/web-components.git
cd web-components
npm install
npm run develop
```

### Testing
```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
