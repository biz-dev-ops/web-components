import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { ScenarioOutlineComponent } from "../../../src/feature-viewer/scenario-outline";
import { ScenarioOutline } from "../../../src/feature-viewer/models";

test.describe("feature-scenario-outline", async () => {
  const sampleOutline: ScenarioOutline = {
    keyword: "Scenario Outline",
    name: "Login with different credentials for <username>",
    description: "Test login functionality with various credentials",
    tags: ["@login", "@security"],
    steps: [
      {
        keyword: "Given",
        text: "the user is on the login page"
      },
      {
        keyword: "When",
        text: "the user enters username '<username>' and password '<password>'"
      },
      {
        keyword: "Then",
        text: "the user should be logged in as '<username>'"
      }
    ],
    examples: {
      keyword: "Examples",
      tableHeader: ["username", "password"],
      tableBody: [
        ["john_doe", "secure123"],
        ["jane_smith", "pass456"],
        ["admin", "admin123"]
      ]
    }
  };

  test("expands scenario outline into multiple scenarios", async ({ mount }) => {
    const component = await mount(ScenarioOutlineComponent, {
      props: {
        outline: sampleOutline
      }
    });

    await expect(component).toContainText("Scenario Outline: Login with different credentials for <username> (3)");

    // Check that all scenarios are rendered
    const scenarios = component.locator("feature-scenario");
    await expect(scenarios).toHaveCount(3);

    // Check first scenario
    const firstScenario = scenarios.first();
    await expect(firstScenario).toContainText("Scenario: Login with different credentials for john_doe");
    await expect(firstScenario).toContainText("Given");
    await expect(firstScenario).toContainText("the user is on the login page");
    await expect(firstScenario).toContainText("When");
    await expect(firstScenario).toContainText("the user enters username 'john_doe' and password 'secure123'");
    await expect(firstScenario).toContainText("Then");
    await expect(firstScenario).toContainText("the user should be logged in as 'john_doe'");

    // Check second scenario
    const secondScenario = scenarios.nth(1);
    await expect(secondScenario).toContainText("Scenario: Login with different credentials for jane_smith");
    await expect(secondScenario).toContainText("When");
    await expect(secondScenario).toContainText("the user enters username 'jane_smith' and password 'pass456'");
    await expect(secondScenario).toContainText("Then");
    await expect(secondScenario).toContainText("the user should be logged in as 'jane_smith'");

    // Check third scenario
    const thirdScenario = scenarios.last();
    await expect(thirdScenario).toContainText("Scenario: Login with different credentials for admin");
    await expect(thirdScenario).toContainText("When");
    await expect(thirdScenario).toContainText("the user enters username 'admin' and password 'admin123'");
    await expect(thirdScenario).toContainText("Then");
    await expect(thirdScenario).toContainText("the user should be logged in as 'admin'");
  });

  test("preserves tags across expanded scenarios", async ({ mount }) => {
    const component = await mount(ScenarioOutlineComponent, {
      props: {
        outline: sampleOutline
      }
    });

    const scenarios = component.locator("feature-scenario");
    await expect(scenarios).toHaveCount(3);

    // Check that each scenario has the tags
    for (let i = 0; i < 3; i++) {
      const scenario = scenarios.nth(i);
      await expect(scenario).toContainText("@login");
      await expect(scenario).toContainText("@security");
    }
  });

  test("handles scenario outline without description", async ({ mount }) => {
    const simpleOutline: ScenarioOutline = {
      keyword: "Scenario Outline",
      name: "Simple Outline for <value>",
      steps: [
        {
          keyword: "Given",
          text: "a simple step with '<value>'"
        }
      ],
      examples: {
        keyword: "Examples",
        tableHeader: ["value"],
        tableBody: [["test1"], ["test2"]]
      }
    };

    const component = await mount(ScenarioOutlineComponent, {
      props: {
        outline: simpleOutline
      }
    });

    const scenarios = component.locator("feature-scenario");
    await expect(scenarios).toHaveCount(2);

    // Check first scenario
    const firstScenario = scenarios.first();
    await expect(firstScenario).toContainText("Scenario: Simple Outline for test1");
    await expect(firstScenario).toContainText("Given");
    await expect(firstScenario).toContainText("a simple step with 'test1'");

    // Check second scenario
    const secondScenario = scenarios.last();
    await expect(secondScenario).toContainText("Scenario: Simple Outline for test2");
    await expect(secondScenario).toContainText("Given");
    await expect(secondScenario).toContainText("a simple step with 'test2'");
  });
});