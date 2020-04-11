import * as React from "react";
import { useContext } from "react";

import styled from "@emotion/styled";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LoanContext } from "../contexts/LoanContext";

// import Loader from './Loader';
// import { LoanActionTypes } from '../types';
import LoanCalculation from './LoanCalculation';

const useStyles = makeStyles(() => ({
  button: {
    padding: "8px 12px",
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",

    "&:hover": {
      color: "#ededed",
      border: "1px solid #ededed"
    }
  }
}));

const AsideMain: React.FC = (): React.ReactElement | null => {
  const classes = useStyles();

  const { state, actions } = useContext(LoanContext);

  if (!state || !actions) return null;

  if (state.loading) {
    return (
      <LoaderWrapper>
        <p>Loading...</p>
      </LoaderWrapper>
    );
  };

  return( 
    <Box>
      <h1>Calculations</h1>
      <Box lineHeight="1.8em" fontSize="0.5em" textAlign="justify">
        <strong>Even total payments</strong>
        The even total payment schedule is comprised of a decreasing interest
        payment and an increasing principal payment. The decrease in the size of
        the interest payment is matched by an increase in the size of the
        principal payment so that the size of the total loan payment remains
        constant over the life of the loan
        <br />
        <br />
        <strong>Even principal payments</strong>
        With the even principal payment schedule, the size of the principal
        payment is the same for every payment. It is computed by dividing the
        amount of the original loan by the number of payments.
      </Box>
      <hr />
      <Box>
        <LoanCalculation />
        <Box mt="2em">
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() =>{
              console.log('show something')
            } }>
              Payment Schedule
          </Button>
        </Box>
      </Box>

    </Box>
  );
};

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default AsideMain;
