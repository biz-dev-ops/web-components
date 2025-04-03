
import { GherkinDocument, Scenario, Background, Step, IdGenerator } from "@cucumber/messages";
import { AstBuilder, GherkinClassicTokenMatcher, Parser } from "@cucumber/gherkin";
import { Feature as FeatureInterface, Background as BackgroundInterface, Scenario as ScenarioInterface, ScenarioOutline, Step as StepInterface } from "./models";

const gherkinParser = new Parser(
  new AstBuilder(IdGenerator.incrementing()),
  new GherkinClassicTokenMatcher()
);

export class FeatureParser {

  public static parse(feature: string): FeatureInterface {
    const document = gherkinParser.parse(feature);
    return this.parseDocument(document);
  }

  private static parseStep(step: Step): StepInterface {
    return {
      keyword: step.keyword.trim(),
      text: step.text.trim(),
      table: step.dataTable ? {
        header: step.dataTable.rows[0].cells.map(cell => cell.value),
        rows: step.dataTable.rows.slice(1).map(row => row.cells.map(cell => cell.value))
      } : undefined
    };
  }

  private static parseBackground(background: Background): BackgroundInterface {
    return {
      keyword: background.keyword.trim(),
      name: background.name?.trim(),
      steps: background.steps.map(step => this.parseStep(step))
    };
  }

  private static parseScenario(scenario: Scenario): ScenarioInterface {
    return {
      keyword: scenario.keyword.trim(),
      name: scenario.name.trim(),
      description: scenario.description?.trim(),
      tags: scenario.tags?.map(tag => tag.name.trim()),
      steps: scenario.steps.map(step => this.parseStep(step))
    };
  }

  private static parseScenarioOutline(scenario: Scenario): ScenarioOutline {
    const examples = scenario.examples[0];
    return {
      keyword: scenario.keyword.trim(),
      name: scenario.name.trim(),
      description: scenario.description?.trim(),
      tags: scenario.tags?.map(tag => tag.name.trim()),
      steps: scenario.steps.map(step => this.parseStep(step)),
      examples: {
        keyword: examples.keyword.trim(),
        name: examples.name?.trim(),
        tableHeader: examples.tableHeader?.cells.map(cell => cell.value) ?? [],
        tableBody: examples.tableBody.map(row => row.cells.map(cell => cell.value))
      }
    };
  }

  private static parseDocument(gherkinDocument: GherkinDocument): FeatureInterface {
    const feature = gherkinDocument.feature;
    if (!feature) {
      throw new Error("No feature found in Gherkin document");
    }

    const scenarios: (ScenarioInterface | ScenarioOutline)[] = [];
    let background: BackgroundInterface | undefined;

    for (const child of feature.children) {
      if (child.background) {
        background = this.parseBackground(child.background);
      }
      else if (child.scenario) {
        if (child.scenario.examples.length > 0) {
          scenarios.push(this.parseScenarioOutline(child.scenario));
        }
        else {
          scenarios.push(this.parseScenario(child.scenario));
        }
      }
    }

    return {
      keyword: feature.keyword.trim(),
      name: feature.name.trim(),
      description: feature.description?.trim(),
      language: feature.language.trim(),
      tags: feature.tags?.map(tag => tag.name.trim()),
      background,
      scenarios
    };
  }
}