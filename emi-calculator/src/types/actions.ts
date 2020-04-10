import { ICalculation } from "./state";
import { IFormData } from "./form";

export enum LoanActionTypes {
    SET_CALCULATION = 'SET_CALCULATION',
    SET_FORM_VALUES = 'SET_FORM_VALUES',
}

interface IAction { 
    readonly type: string;
}

class LoanSetFormValues implements IAction {
    readonly type = LoanActionTypes.SET_FORM_VALUES;
    constructor(public payload: IFormData) { }
}

class LoanSetCalcuation implements IAction {
    readonly type = LoanActionTypes.SET_CALCULATION;
    constructor(public payload: ICalculation) { }
}


export type LoanActions = 
    | LoanSetFormValues
    | LoanSetCalcuation;