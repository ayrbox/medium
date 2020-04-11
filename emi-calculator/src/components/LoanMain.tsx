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
import { Formik, Field, Form } from "formik";
import { object, date, number, string } from "yup";
import { TextField, Select } from "formik-material-ui";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

import { LoanContext } from "../contexts/LoanContext";
import FormikDatePicker from "./FormikDatePicker";
import FormikNumberFormat from "./FormikNumberFormat";
import { IFormData } from '../types/form';

const schema = object<IFormData>().shape({
  procedure: string()
    .matches(/(A|D)/)
    .required("Required Field"),
  start: date()
    .required("Required Field")
    .typeError("Pick or enter a correct date"),
  terms: number()
    .positive("Enter positive integer number")
    .required("Required Field")
    .integer("Enter positive integer number")
    .typeError("Enter positive integer number"),
  amount: number()
    .positive("Enter positive number")
    .required("Required Field")
    .typeError("Enter positive number"),
  rate: number()
    .positive("Enter positive number")
    .required("Required Field")
    .typeError("Enter positive number")
});

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

const LoanMain: React.FC = (): React.ReactElement | null => {
  const [initialValues] = useState({
    procedure: "A",
    start: new Date(),
    terms: "60",
    amount: "324000",
    rate: "2.0"
  });

  const classes = useStyles();
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (!inputLabel.current) return;
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const { state, actions } = useContext(LoanContext);

  if (!state || !actions) return null;


  const { loading } = state;

  return (
    <Box>
      <MainWrapper>
        <h1>Loan Calculator</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            actions.calculateLoan(schema.cast(values));
          }}
          validationSchema={schema}
        >{() => (
            <Form>
              <FormField>
                <Box>
                  <Field
                    name="amount"
                    component={FormikNumberFormat}
                    variant="outlined"
                    label="Load Amount"
                    fullWidth
                    thousandSeparator
                    decimalScale={2}
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className={classes.inputButton}
                            aria-label="toggle term currency"
                            onClick={() => {
                              console.log("Dod you just try to click me");
                            }}
                          >
                            £
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Box>
                  <Field
                    name="terms"
                    component={TextField}
                    variant="outlined"
                    label="Loan Term"
                    fullWidth
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">months</InputAdornment>
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
                    label="First Payment Date"
                    fullWidth
                    disabled={loading}
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
                    label="Intereset Rate"
                    fullWidth
                    disabled={loading}
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
                    Payment schedule type
                  </InputLabel>
                  <Field
                    name="procedure"
                    component={Select}
                    disabled={loading}
                    input={
                      <OutlinedInput labelWidth={labelWidth} name="procedure" />
                    }
                  >
                    <MenuItem value="A">Even Total</MenuItem>
                    <MenuItem value="D">Even Principle</MenuItem>
                  </Field>
                </FormControl>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        disabled={loading}
                        onChange={() => {
                          console.log("Round check is changed");
                        }}
                        value="round"
                        color="primary"
                      />
                    }
                    label="Round"
                  />
                </Box>
              </FormField>
              <CalculateButtonWrapper>
                <Button
                  variant="contained"
                  className={classes.button}
                  disabled={loading}
                  type="submit"
                >
                  Calculate
                </Button>
              </CalculateButtonWrapper>
            </Form>
          )}
        </Formik>
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

export default LoanMain;
