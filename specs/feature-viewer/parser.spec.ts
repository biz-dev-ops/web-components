import { test, expect } from "@sand4rt/experimental-ct-web";
import { FeatureParser } from "../../src/feature-viewer/parser";
import { ScenarioOutline } from "../../src/feature-viewer/models";

test.describe("FeatureParser", () => {

  test("should parse a basic feature file", () => {
    const featureText = `
Feature: User Profile Management
  As a user
  I want to manage my profile information
  So that I can keep my account up to date

  Background:
    Given I am logged in
    And I am on the profile page

  Scenario: Update profile information
    When I click the "Edit Profile" button
    And I update my name to "John Doe"
    And I click the "Save" button
    Then I should see a success message
`;

    const result = FeatureParser.parse(featureText);

    expect(result.keyword).toBe("Feature");
    expect(result.name).toBe("User Profile Management");
    expect(result.description).toBe("As a user\n  I want to manage my profile information\n  So that I can keep my account up to date");
    expect(result.language).toBe("en");
    expect(result.tags).toEqual([]);

    // Check background
    expect(result.background).toBeDefined();
    expect(result.background?.keyword).toBe("Background");
    expect(result.background?.name).toBe("");
    expect(result.background?.steps).toHaveLength(2);
    expect(result.background?.steps[0].keyword).toBe("Given");
    expect(result.background?.steps[0].text).toBe("I am logged in");
    expect(result.background?.steps[1].keyword).toBe("And");
    expect(result.background?.steps[1].text).toBe("I am on the profile page");

    // Check scenario
    expect(result.scenarios).toHaveLength(1);
    expect(result.scenarios[0].keyword).toBe("Scenario");
    expect(result.scenarios[0].name).toBe("Update profile information");
    expect(result.scenarios[0].description).toBe("");
    expect(result.scenarios[0].tags).toEqual([]);
    expect(result.scenarios[0].steps).toHaveLength(4);
  });

  test("should parse a feature file with tags", () => {
    const featureText = `
@feature @important
Feature: User Profile Management

  @smoke @regression
  Scenario: Update profile information
    When I click the "Edit Profile" button
    And I update my name to "John Doe"
    And I click the "Save" button
    Then I should see a success message
`;

    const result = FeatureParser.parse(featureText);

    expect(result.tags).toEqual(["@feature", "@important"]);
    expect(result.scenarios[0].tags).toEqual(["@smoke", "@regression"]);
  });

  test("should parse a feature file with scenario outline", () => {
    const featureText = `
Feature: User Profile Management

  Scenario Outline: Update profile with different data
    When I update my name to "<name>"
    And I update my email to "<email>"
    Then I should see a success message

    Examples:
      | name      | email                    |
      | Jane Doe  | jane.doe@example.com     |
      | Bob Smith | bob.smith@example.com    |
`;

    const result = FeatureParser.parse(featureText);

    expect(result.scenarios).toHaveLength(1);
    const scenario = result.scenarios[0] as ScenarioOutline;
    expect(scenario.keyword).toBe("Scenario Outline");
    expect(scenario.name).toBe("Update profile with different data");
    expect(scenario.steps).toHaveLength(3);

    // Check examples table
    expect(scenario.examples).toBeDefined();
    expect(scenario.examples?.keyword).toBe("Examples");
    expect(scenario.examples?.name).toBe("");
    expect(scenario.examples?.tableHeader).toEqual(["name", "email"]);
    expect(scenario.examples?.tableBody).toEqual([
      ["Jane Doe", "jane.doe@example.com"],
      ["Bob Smith", "bob.smith@example.com"]
    ]);
  });

  test("should parse a feature file with data table", () => {
    const featureText = `
Feature: User Profile Management

  Scenario: Update profile with data table
    Given I have the following user data:
      | field   | value           |
      | name    | John Doe        |
      | email   | john@example.com|
      | phone   | 123-456-7890    |
    When I update my profile
    Then I should see a success message
`;

    const result = FeatureParser.parse(featureText);

    const step = result.scenarios[0].steps[0];
    expect(step.keyword).toBe("Given");
    expect(step.text).toBe("I have the following user data:");
    expect(step.table).toBeDefined();
    expect(step.table?.header).toEqual(["field", "value"]);
    expect(step.table?.rows).toEqual([
      ["name", "John Doe"],
      ["email", "john@example.com"],
      ["phone", "123-456-7890"]
    ]);
  });

  test("should throw error for invalid feature file", () => {
    const invalidFeatureText = `
Invalid Feature Text
This is not a valid Gherkin feature file
`;

    expect(() => FeatureParser.parse(invalidFeatureText)).toThrow();
  });

  test("should throw error for empty feature file", () => {
    expect(() => FeatureParser.parse("")).toThrow();
  });
});