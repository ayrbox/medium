import { IFormData } from '../types/form';
import { ICalculation, ScheduleData } from '../types/state';

function calculateEvenTotal(i: IFormData): ICalculation {
  const monthlyInterestRate = i.rate / 12 / 100;

  const payment = i.amount * (monthlyInterestRate + monthlyInterestRate/(Math.pow((1+monthlyInterestRate), (i.terms))-1));

	const schedule = calculateEvenTotalSchedule(i, monthlyInterestRate, payment);
  const totalInterest = calculateTotalFees(schedule);
  return {
    totalInterest,
    totalPayments: payment,
    paymentSchedule: schedule,
  };
}

function calculateEvenPrincipal(i: IFormData): ICalculation {
	const schedule = calculateEvenPrincipalSchedule(i);
  const totalInterest = calculateTotalFees(schedule);
  return {
    paymentSchedule: schedule,
    totalInterest,
    totalPayments: (i.amount + totalInterest),
  }
}

function calculateEvenTotalSchedule(input: IFormData, monthlyInterestRate: number, payment: number): ScheduleData[]  {
  let amount = input.amount;
  const scheduleData: ScheduleData[] = [];
	for (let i = 0; i < input.terms; i += 1) {
		const interest = amount * monthlyInterestRate;
		const principle = payment - interest;
    const balance = amount - principle;

    scheduleData.push({
      interest,
      principle,
      balance,
      payment,
    });
    amount = balance
  }
  
	return scheduleData; 
}

function calculateEvenPrincipalSchedule(input: IFormData): ScheduleData[] {
  let amount = input.amount;
  const scheduleData: ScheduleData[] = [];

  const principle = amount / input.terms;
	for (let i = 0; i < input.terms; i++) {
		const interest = amount * input.rate / (100 * 12);
		const payment = principle + interest;
    const balance = amount - principle;
    scheduleData.push({
      interest,
      principle,
      balance,
      payment,
    })
    amount = balance
  }

  return scheduleData;
}

function calculateTotalFees(s: ScheduleData[]): number {
  return s.reduce((total, { interest }) => total + interest, 0);
}

export function calulate(i: IFormData): ICalculation {
	if (i.payments === 'EMI') {
    return calculateEvenTotal(i)
	} else {
		return calculateEvenPrincipal(i)
  }
}

