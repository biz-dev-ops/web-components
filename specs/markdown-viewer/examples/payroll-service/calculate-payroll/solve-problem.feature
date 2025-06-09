Feature: Solve problem

  As a payroll administrator
  I want to resolve or escalate payroll calculation issues
  So that employee payments are accurate and timely

  Scenario Outline: Successfully resolving a payroll problem
    Given a payroll problem with "Payroll Problem Description" for "<EmployeeName>" (ID: <EmployeeId>)
    When the payroll administrator resolves the problem with resolution details "Resolved the data inconsistency by correcting employee record."
    Then the payroll problem is marked as resolved
    And the payroll process can be resumed

    Examples:
      | EmployeeName | EmployeeId                           |
      | John Doe     | 123e4567-e89b-12d3-a456-426614174000 |
      | Jane Smith   | 123e4567-e89b-12d3-a456-426614174001 |

  Scenario: Escalating an unsolvable payroll problem
    Given a payroll problem with "Critical system error preventing calculation" for "Alice Brown" (ID: 123e4567-e89b-12d3-a456-426614174002)
    When the payroll administrator escalates the problem with reason "Requires database expert intervention."
    Then the payroll problem is marked as escalated
    And an alert is sent to the relevant support team

  Scenario: Marking a payroll problem as unsolvable
    Given a payroll problem with "Irrecoverable data corruption" for "Bob Johnson" (ID: 123e4567-e89b-12d3-a456-426614174003)
    When the payroll administrator marks the problem as unsolvable with reason "Data cannot be recovered, manual intervention required outside system."
    Then the payroll problem is marked as unsolvable
    And the payroll process for the affected period is halted
    And a critical failure notification is sent