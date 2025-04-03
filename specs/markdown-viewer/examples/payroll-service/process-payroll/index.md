# Process payroll

> Systematically transforms the necessary employee data and time information into accurate pay figures, ready for subsequent steps like generating pay stubs, initiating payments, and fulfilling compliance obligations. It's the engine that drives the financial aspect of employee compensation.

This unction is the central process responsible for determining what each employee should be paid for a given pay period. It orchestrates a series of sub-functions to achieve this.

## Process

[Process](./index.bpmn)

## Steps

### Calculate payroll

> Ensures fairness, legal obligation, financial accuracy, and the overall well-being and smooth operation of the business and its workforce. It's a foundational process that underpins the employment relationship and contributes significantly to the success and sustainability of an organization.

Determines how much each employee earns during a specific pay period. It involves factoring in their wages or salary, hours worked (including overtime), and then subtracting applicable deductions (like taxes and benefits) to arrive at their net pay.

Ensures employees are compensated accurately and in compliance with legal requirements.

### Create payroll stub

> Ensures transparency and understanding for the employee regarding their compensation, while also serving as an official record for both the employee and the employer. This transparency fosters trust and allows employees to verify the accuracy of their pay. Furthermore, pay stubs are often required for various personal financial activities (e.g., loan applications, renting an apartment).

Takes the calculated payroll data for an individual employee (the output from the "Calculate payroll" function) and formats it into a readable and comprehensive electronic document. It is essential for providing employees with a transparent and understandable record of their compensation, fulfilling legal requirements for providing pay information, and supporting good employee relations.

### Initiate payment

> Transforms the calculated net pay into actual funds transferred to the employee. Fulfills the fundamental obligation of the employer to compensate employees for their work. Without this function, the entire payroll process would be an academic exercise, and employees would not receive their earnings. It's the point where the financial transaction occurs, directly impacting the employee's financial well-being.

Takes the finalized net pay amount for an employee (as determined by the "Calculate payroll" function) and triggers the process of disbursing those funds according to the employee's chosen or assigned payment method. It is the critical link that turns payroll calculations into tangible compensation for employees. It requires accuracy, security, and adherence to the chosen payment methods to ensure employees receive their pay correctly and on time.

### Notify employee

> Informs employees that their payroll has been processed and their payment is available. Ensures clear communication, transparency, and a positive employee experience regarding their compensation. Proactive notification reduces uncertainty, allows employees to plan their finances, and provides them with access to their pay details, fostering trust and reducing payroll-related inquiries.

The final outward-facing step in the immediate payroll processing cycle for an individual employee, occurring after their pay has been calculated, their pay stub has been created, and the payment has been initiated. This function is a vital part of a positive payroll experience. It ensures that employees are informed and have access to the details of their compensation, contributing to transparency and reducing the administrative burden of answering basic payroll inquiries. It signifies the completion of the immediate payroll cycle for the employee.