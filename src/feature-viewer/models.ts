export enum TestResult {
  PASSED = "passed",
  FAILED = "failed",
  NOT_IMPLEMENTED = "not_implemented"
}

export interface Step {
  keyword: string;
  text: string;
  table?: {
    header: string[];
    rows: string[][];
  };
  result?: TestResult;
}

export interface Background {
  keyword: string;
  name?: string;
  steps: Step[];
  result?: TestResult;
}

export interface Scenario {
  keyword: string;
  name: string;
  description?: string;
  tags?: string[];
  steps: Step[];
  result?: TestResult;
}

export interface ScenarioOutline {
  keyword: string;
  name: string;
  description?: string;
  tags?: string[];
  steps: Step[];
  examples: {
    keyword: string;
    name?: string;
    tableHeader: string[];
    tableBody: string[][];
  };
  result?: TestResult;
}

export interface Feature {
  keyword: string;
  name: string;
  description?: string;
  language: string;
  tags?: string[];
  background?: Background;
  scenarios: (Scenario | ScenarioOutline)[];
  result?: TestResult;
  resultFile?: string;
}