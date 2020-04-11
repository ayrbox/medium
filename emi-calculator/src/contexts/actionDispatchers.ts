import { Dispatch } from 'react';
import { calculateLoan } from '../api';

import { LoanActionTypes, LoanActions } from './actions';
import { IFormData } from '../types/form';

export const calculateLoanDispatcher = (dispatch : Dispatch<LoanActions>) => (values : IFormData) => {
  dispatch({
    type: LoanActionTypes.REQUEST_CALCULATION,
  });

  dispatch({
    type: LoanActionTypes.SET_FORM_VALUES,
    payload: values,
  });

  calculateLoan(values)
    .then(data => {
      dispatch({
        type: LoanActionTypes.SET_CALCULATION,
        payload: data,
      });
    })
    .catch(err => {
      dispatch({
        type: LoanActionTypes.SET_CALCULATION_ERROR,
        payload: {
          message: 'Calculation error',
          details: err,
        }
      })
    });
}

export const toggleScheduleModalDispatcher = (dispatch: Dispatch<LoanActions>) => (showState: boolean) => {
  dispatch({
    type: LoanActionTypes.TOGGLE_SCHEDULES_MODAL,
    payload: showState,
  });
}

// Action object type that pages see
// If possible this should be automatic type cast
export type Actions = {
  calculateLoan: (values: IFormData) => void;
  toggleScheduleModal: (showState: boolean) => void;
}
