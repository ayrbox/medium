import React, {
    FC,
    createContext,
    useReducer,
    Dispatch,
    ReactElement,
} from 'react';

import { ILoanState } from '../types/state';

import reducer, { initialState }  from './reducer';
import { calculateLoanDispatcher, Actions } from './actionDispatchers';

interface LoanContextProps {
    state: ILoanState,
    actions: Actions,
}

export const LoanContext = createContext<Partial<LoanContextProps>>({});

interface LoanContextProviderProps {
    children: ReactElement | ReactElement[];
}

const LoanContextProvider: FC<LoanContextProviderProps> = ({
    children,
}: LoanContextProviderProps): ReactElement => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // actions function that page/component can evoke
    const actions: Actions = {
        calculateLoan: calculateLoanDispatcher(dispatch),
    }

    return (
        <LoanContext.Provider value={{
            state,
            actions,
        }}>
            {children}
        </LoanContext.Provider>
    );
}

export default LoanContextProvider; 