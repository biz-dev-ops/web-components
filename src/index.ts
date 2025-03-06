if (process.env.NODE_ENV !== "production") {
    import("@biz-dev-ops/md-docs/assets/style/page/style.css");
    import("../assets/style/custom-theme.css");
}

// export * from all your web components here
export * from './bpmn-viewer'
export * from './business-model-canvas'
export * from './business-reference-architecture'
export * from './dmn-viewer'
export * from './model-viewer'
export * from './command-viewer'
export * from './event-viewer'
export * from './query-viewer'
export * from './task-viewer'


console.log('sup fool')
