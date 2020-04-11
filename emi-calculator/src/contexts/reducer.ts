import { ILoanState } from "../types/state";
import { LoanCurrencies } from "../types/form";
import { LoanActions, LoanActionTypes } from "./actions";

export const initialState: ILoanState = {
  currencies: [
    LoanCurrencies.NRP,
    LoanCurrencies.POUND,
    LoanCurrencies.DOLLAR,
    LoanCurrencies.EURO
  ],
  loading: false
};

const reducer = (state: ILoanState, action: LoanActions): ILoanState => {
  switch (action.type) {
    case LoanActionTypes.REQUEST_CALCULATION:
        return {
            ...state,
            loading: true,
        } 
    case LoanActionTypes.SET_CALCULATION:
      return {
        ...state,
        calculation: action.payload,
        loading: false,
      };
    case LoanActionTypes.SET_CALCULATION_ERROR:
        return {
            ...state,
            calculation: undefined,
            loading: false,
            error: action.payload
        }
    case LoanActionTypes.SET_FORM_VALUES:
      return {
        ...state,
        values: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
