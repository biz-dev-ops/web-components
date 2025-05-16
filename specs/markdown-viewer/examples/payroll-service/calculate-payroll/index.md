# Calculate payroll

> Ensures fairness, legal obligation, financial accuracy, and the overall well-being and smooth operation of the business and its workforce. It's a foundational process that underpins the employment relationship and contributes significantly to the success and sustainability of an organization.

Determines how much each employee earns during a specific pay period. It involves factoring in their wages or salary, hours worked (including overtime), and then subtracting applicable deductions (like taxes and benefits) to arrive at their net pay.

Ensures employees are compensated accurately and in compliance with legal requirements.

* [Command](./index.command.schema.yml)
* [Requirements](./index.feature)

## Process

[Process](./index.bpmn)

## Steps

### Get time and attendance data

> Accurate payroll hinges on knowing precisely how much time each employee has worked (or taken as paid leave) during the pay period. Without this data, it's impossible to correctly calculate wages, overtime, and paid time off, leading to errors, employee dissatisfaction, and potential legal issues.

Collects and consolidates information about employee work hours and absences. This data can originate from various sources, including:

* **Time clocks**: Physical or digital systems where employees clock in and out.
* **Timesheets**: Manual or electronic records where employees log their working hours.
* **Leave requests**: Approved requests for vacation, sick leave, or other paid time off.
* **Project management systems**: For tracking time spent on specific tasks or projects.

Ensures that all relevant work and absence information for the pay period is gathered, verified, and prepared for the subsequent steps in the payroll calculation.

* [Query](./get-time-and-attendance.query.schema.yml)
* [Requirements](./get-time-and-attendance.feature)

### Determine gross pay

> Gross pay represents an employee's earnings before any deductions are applied. It's the baseline figure from which all subsequent calculations are made. Accurately determining gross pay ensures employees are credited for all the time they've worked according to their agreed-upon pay rate and any applicable overtime rules. Errors at this stage will cascade through the entire payroll process.

Calculates the total earnings for each employee based on their employment type and the time and attendance data gathered:

* **Hourly Employees**: Gross pay is calculated by multiplying the total number of regular hours worked by their hourly rate. Any overtime hours worked are then multiplied by their overtime rate (typically 1.5 times the regular rate) and added to the regular pay.
* **Salaried Employees**: Gross pay is usually a fixed amount per pay period. This is typically derived by dividing their annual salary by the number of pay periods in a year (e.g., weekly, bi-weekly, monthly). Adjustments might be necessary for partial pay periods (e.g., if an employee starts or leaves mid-period) or for unpaid leave taken.

Translates accurately the recorded work and absence data into a monetary value representing the employee's initial earnings for the pay period.

### Calculate deductions

> Deductions are amounts subtracted from an employee's gross pay to arrive at their net pay. These deductions cover various obligations, both mandatory (like taxes) and voluntary (like benefits). Accurate calculation of deductions is essential for legal compliance, proper administration of employee benefits, and ensuring employees receive the correct net pay. Errors in deductions can lead to legal penalties, incorrect benefit coverage, and employee dissatisfaction.

Identifies and calculates all applicable deductions for each employee for the current pay period. These deductions typically fall into the following categories:

#### Mandatory Deductions

* **Federal Income Tax**: Calculated based on the employee's W-4 form (in the US) and current federal tax tables and regulations.
* **State and Local Income Taxes (if applicable)**: Calculated based on the employee's state and local tax withholding information and relevant tax laws.
* **Social Security and Medicare Taxes (in the US)**: Calculated as a percentage of the employee's gross pay up to certain annual limits.
* **Wage Garnishments**: Legally mandated deductions such as child support, alimony, or debt repayment, calculated according to court orders.

#### Voluntary Deductions

* **Health Insurance Premiums**: The employee's share of the cost for their chosen health insurance plan.
* **Retirement Plan Contributions**: Employee contributions to 401(k), pension plans, or other retirement savings accounts.
* **Life Insurance Premiums**: Deductions for voluntary life insurance coverage.
* **Flexible Spending Account (FSA) Contributions**: Pre-tax deductions for healthcare or dependent care expenses.
* **Union Dues**: Membership fees deducted for employees belonging to a labor union.
* **Other Elected Benefits**: Any other deductions the employee has authorized.

Requires accurate employee information (e.g., tax forms, benefit elections), up-to-date tax laws and rates, and correct application of deduction rules to determine the precise amount to be subtracted from each employee's gross pay.

### Calculate net pay

> Net pay represents the employee's actual "take-home" pay – the amount they will receive after all deductions have been subtracted from their gross earnings. This is the figure employees are most interested in as it directly impacts their personal finances. Accurate calculation of net pay ensures employees receive the correct amount they've earned, fostering trust and fulfilling the fundamental purpose of the payroll process.

A straightforward subtraction: the total amount of all calculated deductions is subtracted from the employee's gross pay.

$$Net Pay = Gross Pay - Total Deductions$$

Consolidates all the preceding calculations to arrive at the final payable amount for each employee for the specific pay period. This is the figure that will be used for issuing payments (via direct deposit or check) and forms the basis of the employee's compensation for that period.

### Process employer contributions

> Employers have their own financial obligations related to their employees' compensation, beyond the wages and salaries paid directly to them. Accurately processing these contributions ensures the employer meets their legal and benefit-related responsibilities, contributing to the overall cost of employment and the well-being of their workforce.

Calculates and accounts for the employer's share of various costs associated with payroll. These contributions typically include:

* **Employer's Share of Social Security and Medicare Taxes**: In many countries (like the US), employers are required to match the employee's contributions to these social insurance programs.
* **Unemployment Taxes**: Employers pay federal and state unemployment taxes, which fund benefits for workers who lose their jobs through no fault of their own.
* **Workers' Compensation Insurance**: Employers pay premiums for insurance that covers medical expenses and lost wages for employees injured on the job. Rates are often based on industry and the employer's safety record.
* **Employer Contributions to Employee Benefits**: This includes the employer's portion of health insurance premiums, matching contributions to retirement plans (like a 401(k) match), contributions to Health Savings Accounts (HSAs), and other employer-sponsored benefits.
* **Other Employer-Paid Taxes or Contributions**: Depending on local regulations, there might be other employer-specific taxes or contributions related to employment.

Applies the correct rates and rules to the relevant wage bases to determine the employer's financial obligations for the pay period. These amounts are then typically recorded in the company's accounting system as part of the overall labor costs. While not directly impacting the employee's net pay, these contributions are a significant part of the total cost of employing individuals.

### Save payroll

> Saving the payroll data creates a permanent, auditable record of all payroll transactions for a specific pay period. This is essential for legal compliance, financial reporting, historical analysis, and the ability to address any future inquiries or discrepancies. Without a reliable saved record, the entire payroll process would lack accountability and traceability.

Securely stores all the calculated payroll information in a designated system or database. This typically includes:

* **Employee-level data**: Gross pay, regular hours, overtime hours, pay rates, all individual deductions (type and amount), net pay, and pay date for each employee.
* **Summary data**: Totals for gross pay, total deductions, total net pay, and all employer contributions for the entire payroll run.
* **Tax information**: Records of calculated and withheld taxes at the employee and aggregate levels.
* **Audit trails**: Logs of when the payroll was processed, by whom, and any changes made.

Automatically committs the data to its permanent storage. It's crucial that this data is stored securely, with appropriate access controls, and is readily retrievable for reporting, compliance audits, and addressing any payroll-related issues that may arise in the future. This saved data forms the foundation for subsequent processes like disbursing payments and generating payroll reports.

### Solve problem

>  Provides a human intervention point to diagnose, resolve, and mitigate these exceptions, aiming to either resume the payroll process successfully or, when resolution is impossible, to gracefully conclude it while signaling a critical failure.

Acts as a crucial safety net and a point of human oversight in the automated payroll process. It acknowledges that unforeseen issues can arise and provides a structured way to address them, minimizing disruptions and ensuring appropriate handling of payroll exceptions. The clear outcomes of this task dictate the subsequent flow of the payroll process, ensuring either a successful completion or a formal recognition of failure.

## Events

### Payroll calculated

> This event signifies that the core calculations for a specific pay period are complete. It acts as a signal to initiate subsequent processes, such as payment disbursement, record-keeping finalization, and potentially notifications to relevant stakeholders. Recognizing this event allows for a structured and sequential flow of the remaining payroll activities.

Indicates the successful completion of the payroll calculations. It implies that:

* Gross pay has been determined for all employees.
* All applicable deductions have been calculated and applied.
* Net pay has been finalized for each employee.
* Employer contributions have been calculated.

The system is now ready to move on to the next stages of the payroll cycle.

### Payroll could not be calculated

> Signals a significant problem that needs immediate attention. It means employees will likely not be paid accurately or on time, leading to potential employee dissatisfaction, legal issues, financial disruptions, and damage to the company's reputation. Identifying and understanding the reasons behind this event is crucial for timely resolution and preventing future occurrences.

Signifies that one or more critical steps in the payroll calculation process have failed or encountered insurmountable errors. This could occur at various stages, such as:

* **Failure to retrieve or validate essential data**: Problems accessing or processing employee data, time and attendance records, or tax information.
* **Errors in calculation logic**: Issues with the formulas or rules used to determine gross pay, deductions, or net pay. This could be due to system bugs, incorrect configurations, or changes in regulations that haven't been implemented.
* **Incomplete or inconsistent dat**a: Missing or conflicting information that the payroll system cannot reconcile.
* **Critical configuration errors**: Incorrect setup of pay rules, tax settings, or deduction parameters.
