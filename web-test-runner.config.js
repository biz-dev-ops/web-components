const filteredLogs = ["Running in dev mode", "Lit is in dev mode"];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: "out-tsc/**/*.test.js",

  /** Resolve bare module imports */
  nodeResolve: true,

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (
        typeof arg === "string" &&
        filteredLogs.some((l) => arg.includes(l))
      ) {
        return false;
      }
    }
    return true;
  },
});
