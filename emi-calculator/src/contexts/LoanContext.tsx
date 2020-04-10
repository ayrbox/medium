import React, {
    FC,
    createContext,
    useReducer,
    Dispatch,
    ReactElement,
} from 'react';

import { ILoanState } from '../types/state';
import { LoanActions, LoanActionTypes } from '../types/actions';
import { LoanCurrencies } from '../types/form';

const reducer = (state: ILoanState, action: LoanActions): ILoanState => {
    switch(action.type) {
        case LoanActionTypes.SET_CALCULATION: 
            return {
                ...state, 
                calcuation: action.payload,
            }
        case LoanActionTypes.SET_FORM_VALUES:
            return {
                ...state,
                values: action.payload,
            }
        default:
            return state;
    }
}

const initialState: ILoanState = {
    currencies: [
        LoanCurrencies.NRE,
        LoanCurrencies.POUND,
        LoanCurrencies.DOLLAR,
        LoanCurrencies.EURO
    ],
    loading: false,
}

interface LoanContextProps {
    state: ILoanState,
    dispatch: Dispatch<LoanActions>; 
}

export const LoanContext = createContext<Partial<LoanContextProps>>({});

interface LoanContextProviderProps {
    children: ReactElement | ReactElement[];
}

const LoanContextProvider: FC<LoanContextProviderProps> = ({
    children,
}: LoanContextProviderProps): ReactElement => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <LoanContext.Provider value={{
            state,
            dispatch,
        }}>
            {children}
        </LoanContext.Provider>
    );
}

export default LoanContextProvider; 