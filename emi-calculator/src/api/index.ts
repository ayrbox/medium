import { ICalculation } from '../types/state';

const API_URL = '/api';

export const calculateLoan = (values: {}): Promise<ICalculation> => {
  return new Promise<ICalculation>((resolve) => {
    setTimeout(() => {
      console.log('Values', values);
      resolve({} as ICalculation);
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
