import * as React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import {
  Box,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { TextField, Select } from "formik-material-ui";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 230
  },
  button: {
    backgroundColor: "#41C9EB",
    color: "white",
    padding: "12px 48px",

    "&:hover": {
      backgroundColor: "#11d1Ea"
    }
  },
  inputButton: {
    width: "48px",
    height: "48px",
    fontWeight: 700,
    fontSize: "inherit"
  }
}));

const LoanMain: React.FC = () => {
  const [initialValues] = useState({
    procedure: "A",
    start: new Date(),
    term: "",
    amount: "",
    rate: ""
  });

  const classes = useStyles();
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (!inputLabel.current) return;
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const { state, dispatch } = useContext(LoanContext);

  if (!state || !dispatch) return null;

  return (
    <Box>
      <h1>Loan Calculator</h1>
      <MainWrapper>
        <Form>
          <FormField>
            <Box>
              <Field
                name="amount"
                variant="outlined"
                label={t("loanAmount")}
                fullWidth
                thousandSeparator
                decimalScale={2}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.inputButton}
                        aria-label="toggle term currency"
                        onClick={() =>
                          dispatch({
                            type: LoanActionTypes.SET_ACTIVE_CURRENCY
                          })
                        }
                      >
                        {state.currencies[0]}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box>
              <Field
                name="term"
                component={TextField}
                variant="outlined"
                label={t("loanTerm")}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {t("monthAbbreviation")}
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </FormField>
          <FormField>
            <Box>
              <Field
                name="start"
                component={FormikDatePicker}
                variant="outlined"
                label={t("startDate")}
                fullWidth
                disabled={isSubmitting}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>
            <Box>
              <Field
                name="rate"
                component={TextField}
                variant="outlined"
                label={t("interestRate")}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  )
                }}
              />
            </Box>
          </FormField>
          <FormField>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                {t("loanType")}
              </InputLabel>
              <Field
                name="procedure"
                component={Select}
                input={
                  <OutlinedInput labelWidth={labelWidth} name="procedure" />
                }
              >
                <MenuItem value="A">{t("evenTotalType")}</MenuItem>
                <MenuItem value="D">{t("evenPrincipalType")}</MenuItem>
              </Field>
            </FormControl>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.round}
                    disabled={isSubmitting}
                    onChange={() =>
                      dispatch({
                        type: LoanActionTypes.SET_ROUND,
                        payload: !state.round
                      })
                    }
                    value="round"
                    color="primary"
                  />
                }
                label={t("round")}
              />
            </Box>
          </FormField>
          <CalculateButtonWrapper>
            <Button
              variant="contained"
              className={classes.button}
              disabled={isSubmitting}
              type="submit"
            >
              {t("calculate")}
            </Button>
          </CalculateButtonWrapper>
        </Form>
        )} />
      </MainWrapper>
    </Box>
  );
};

const MainWrapper = styled.div`
  margin-top: 1.5em;

  @media (min-width: 1024px) {
    margin-top: 2em;
  }
`;

const FormField = styled.div`
  display: block;
  margin-bottom: 1em;

  @media (min-width: 1024px) {
    display: flex;
  }

  & > div {
    width: 100%;
  }

  & > div:nth-of-type(1) {
    @media (min-width: 1024px) {
      margin-right: 8px;
    }
  }

  & > div:nth-of-type(2) {
    margin-top: 1em;

    @media (min-width: 1024px) {
      margin-left: 8px;
      margin-top: 0;
    }
  }
`;

const CalculateButtonWrapper = styled.div`
  margin-top: 1em;

  @media (min-width: 1024px) {
    margin-top: 2em;
  }
`;

const CalculationModalWrapper = styled.div`
  padding: 1.5em 1em;
  width: 80vw;
  height: auto;
  background: white;
  text-align: center;
  border-radius: 4px;
`;

export default LoanMain;
