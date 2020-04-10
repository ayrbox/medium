import * as React from 'react';
import { useContext } from 'react';
import { LoanContext } from '../contexts/LoanContext'

const TestComponent: React.FC = (): React.ReactElement | null => {
    const { state, dispatch } = useContext(LoanContext);
    if(!state || !dispatch) return null;
    console.log('Currencies', state.currencies);
    return (
        <pre>
          {JSON.stringify(state, null, 2)}
        </pre>
    );
}


export default TestComponent;