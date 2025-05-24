Feature: User Profile Management

  Background: User is logged in
    Given a user with username "testuser" and password "securepass"
    And the user is logged in

  Scenario: Update user profile information
    Given the user is on the profile page
    When the user updates their first name to "John" and last name to "Doe"
    And the user saves the changes
    Then the profile should display "John Doe"

  Scenario Outline: Update contact information for <contact_type>
    Given the user is on the profile page
    When the user updates their "<contact_type>" to "<contact_value>"
    And the user saves the changes
    Then the profile should display the updated "<contact_type>" as "<contact_value>"

    Examples:
      | contact_type | contact_value       |
      | email        | john.doe@example.com |
      | phone        | 123-456-7890        |

  Scenario: Verify address details
    Given the user profile contains the following address:
      | field       | value          |
      | street      | 123 Main St    |
      | city        | Anytown        |
      | state       | CA             |
      | zip         | 90210          |
    When the user views their profile
    Then the address details should match the given values

  Scenario: Change password
    Given the user is on the password change page
    When the user enters their old password "securepass"
    And the user enters their new password "newsecurepass"
    And the user confirms their new password "newsecurepass"
    And the user submits the password change
    Then the password should be successfully changed 