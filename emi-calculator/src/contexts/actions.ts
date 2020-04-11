import { ICalculation } from "../types/state";
import { IFormData } from "../types/form";

export enum LoanActionTypes {
    REQUEST_CALCULATION = 'REQUEST_CALCULATION',
    SET_CALCULATION = 'SET_CALCULATION',
    SET_CALCULATION_ERROR = 'SET_CALCULATION_ERROR',
    TOGGLE_SCHEDULES_MODAL = 'TOGGLE_SCHEDULES_MODAL',
}

/*
   Type safety for action payload.
   When dispatching or reducing action types, following classes help Typescript
   catch error in type of payload. 
 */
interface IAction { 
    readonly type: string;
}

class LoanSetCalcuation implements IAction {
    readonly type = LoanActionTypes.SET_CALCULATION;
    constructor(public payload: ICalculation) { }
}

class SetCalculationError implements IAction {
    readonly type = LoanActionTypes.SET_CALCULATION_ERROR;
    constructor(public payload: {
        message: string,
        details: Error,
    }) { }
}

class RequestCalculation implements IAction {
    readonly type = LoanActionTypes.REQUEST_CALCULATION;
    constructor(public payload: IFormData) {};
}

class ToggleScheduleModal implements IAction {
    readonly type = LoanActionTypes.TOGGLE_SCHEDULES_MODAL;
    constructor(public payload: boolean ) {}
}
 
export type LoanActions = 
    | LoanSetCalcuation
    | SetCalculationError
    | RequestCalculation
    | ToggleScheduleModal;
