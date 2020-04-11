import { ICalculation } from '../types/state';
import { calulate }  from './mockCalculation';
import { IFormData } from 'src/types/form';

const API_URL = '/api';

export const calculateLoan = (values: IFormData): Promise<ICalculation> => {
  return new Promise<ICalculation>((resolve) => {
    setTimeout(() => {
      const calculations = calulate(values);
      resolve(calculations)
    }, 500);
  });
} ;
  

export const calculateLoanRealApiCall = (values = {}): Promise<ICalculation> =>
  fetch(`${API_URL}/loan`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then(response => response.json());
