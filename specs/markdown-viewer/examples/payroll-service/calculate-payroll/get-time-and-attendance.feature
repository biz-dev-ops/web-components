Feature: Get Time and Attendance Data

  As a payroll system,
  I need to retrieve accurate time and attendance data for employees within a specified pay period,
  So that payroll can be calculated correctly.

  Scenario: Successfully retrieve time and attendance data for a specific employee
    Given the employee with ID "1234567890" has time and attendance records for the period "2024-01-01" to "2024-01-31"
    When the system requests time and attendance data for employee ID "1234567890" with start date "2024-01-01" and end date "2024-01-31"
    Then the system should return an array of time and attendance records for that employee
    And each record should contain a "date"
    And each record should contain "hours" information (regular, overtime, or leave)
    And each record should contain a "status"

  Scenario: Successfully retrieve time and attendance data with different statuses
    Given the employee with ID "9876543210" has submitted, approved, and rejected time and attendance records for "2024-02-01" to "2024-02-29"
    When the system requests time and attendance data for employee ID "9876543210" with start date "2024-02-01" and end date "2024-02-29"
    Then the system should return an array of time and attendance records
    And the array should include records with status "submitted"
    And the array should include records with status "approved"
    And the array should include records with status "rejected"

  Scenario: Handle case where no time and attendance data exists for the specified period
    Given the employee with ID "5555555555" has no time and attendance records for the period "2024-03-01" to "2024-03-31"
    When the system requests time and attendance data for employee ID "5555555555" with start date "2024-03-01" and end date "2024-03-31"
    Then the system should return an empty array of time and attendance records

  Scenario: Handle invalid employee ID format
    When the system requests time and attendance data for employee ID "invalid-id" with start date "2024-04-01" and end date "2024-04-30"
    Then the system should indicate that the request is invalid due to the employee ID format

  Scenario: Handle invalid date format for start date
    When the system requests time and attendance data for employee ID "1112223333" with start date "20240501" and end date "2024-05-31"
    Then the system should indicate that the request is invalid due to the start date format

  Scenario: Handle invalid date format for end date
    When the system requests time and attendance data for employee ID "4445556666" with start date "2024-06-01" and end date "20240630"
    Then the system should indicate that the request is invalid due to the end date format

  Scenario: Handle employee not found
    Given the employee with ID "9999999999" does not exist in the system
    When the system requests time and attendance data for employee ID "9999999999" with start date "2024-07-01" and end date "2024-07-31"
    Then the system should return an error indicating "employee not found"
