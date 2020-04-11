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

export interface IStateError {
    message: string;
    error?: Error;
}

export interface ILoanState extends Readonly<{
    currencies: string[],
    calculation?: ICalculation,
    values?: IFormData
    loading: boolean;
    error: IStateError;
}>{}