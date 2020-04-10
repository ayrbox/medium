import { IFormData } from "./form";

export type ScheduleData = {
    interest: number;
    principle: number;
    payment: number;
    balance: number;
} 

export interface ICalculation {
    totalInterest: number;
    totalPayments: number;
    paymentSchedule: ScheduleData[];
}

export interface ILoanState extends Readonly<{
    currencies: string[],
    calcuation?: ICalculation,
    values?: IFormData
    loading: boolean;
}>{}