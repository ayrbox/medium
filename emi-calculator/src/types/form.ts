import { FieldProps } from 'formik';

export enum LoanCurrencies {
    POUND = '£',
    EURO = '€',
    DOLLAR = '$',
    NRP = 'NRP'
}

export interface IFormData {
    payments: 'EMI' | 'EPI'
    start: Date;
    terms: number;
    amount: number;
    rate: number;
}

export interface IFormikFieldProps extends FieldProps {
    label?: string;
    InputProps?: object;
    fullWidth?: boolean;
    disabled: boolean;
} 

