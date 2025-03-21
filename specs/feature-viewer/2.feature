Feature: Manage User Profile
  As a user
  I want to manage my profile information
  So that I can keep my account up to date

  Background:
    Given I am logged in
    And I am on the profile page

  @smoke @regression
  Scenario: Update profile information
    When I click the "Edit Profile" button
    And I update my name to "John Doe"
    And I update my email to "john.doe@example.com"
    And I click the "Save" button
    Then I should see a success message
    And my profile should be updated with the new information

  @regression
  Scenario Outline: Update profile with different data
    When I click the "Edit Profile" button
    And I update my name to "<name>"
    And I update my email to "<email>"
    And I click the "Save" button
    Then I should see a success message
    And my profile should be updated with the new information

    Examples:
      | name      | email                    |
      | Jane Doe  | jane.doe@example.com     |
      | Bob Smith | bob.smith@example.com    |

  @smoke
  Scenario: Upload profile picture
    When I click the "Upload Picture" button
    And I select a valid image file
    And I click the "Upload" button
    Then I should see a success message
    And my profile picture should be updated 