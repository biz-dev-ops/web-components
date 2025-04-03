Feature: {{folder.name}}

  As a payroll administrator,
  I want the system to correctly calculate employee payroll,
  So that employees are paid accurately and on time, and the business remains compliant.

  Scenario: Basic Payroll Calculation
    Given employee data is available
    And time and attendance data is available for the pay period
    When the payroll calculation process is initiated
    Then the system should determine the gross pay for each employee
    And the system should calculate all applicable deductions for each employee
    And the system should determine the net pay for each employee

  Scenario: Handling Salaried Employees
    Given salaried employee data is available
    And the pay period is defined
    When the payroll calculation process is initiated
    Then the system should calculate the pro-rated gross pay for salaried employees based on the pay period

  Scenario: Handling Hourly Employees
    Given hourly employee data is available
    And time and attendance data with regular and overtime hours is available
    And overtime rules are defined
    When the payroll calculation process is initiated
    Then the system should calculate gross pay based on regular hours and the regular rate
    And the system should calculate overtime pay based on overtime hours and the defined overtime rate

  Scenario: Applying Mandatory Deductions
    Given employee tax information is available
    And relevant tax laws and rates are configured
    When the payroll calculation process is initiated
    Then the system should calculate and apply federal income tax deductions
    And the system should calculate and apply state income tax deductions (if applicable)
    And the system should calculate and apply social security and medicare deductions (if applicable)

  Scenario: Applying Voluntary Deductions
    Given employee benefit elections are available
    And benefit deduction rules are configured
    When the payroll calculation process is initiated
    Then the system should calculate and apply deductions for elected benefits (e.g., health insurance, retirement)

  Scenario: Generating Payroll Results
    When the payroll calculation process is initiated
    Then the system should generate a record of the calculated gross pay, deductions, and net pay for each employee
