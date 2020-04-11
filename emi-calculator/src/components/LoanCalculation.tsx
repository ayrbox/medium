import * as React from "react";
import { useContext } from "react";
import styled from "@emotion/styled";
import { Box } from "@material-ui/core";
import PieChart from "react-minimal-pie-chart";
import { LoanContext } from "../contexts/LoanContext";
import addMonths from "date-fns/addMonths";
import format from "date-fns/format";
// import { thousandsWithRound, getMonthlyPayment } from '../helpers';

const getFinalPaymentDate = (start: Date, term: number) =>
  format(addMonths(start, term), 'dd.MM.yyyy');

const LoanCalculation: React.FC = () => {
  const { state } = useContext(LoanContext);

  if (!state || !state.values || !state.calculation) return null;

  const { values, calculation } = state;

  return (
    <Box>
      <Box fontSize="0.6em">Monthly Payments</Box>
      <Box mt="0.2em" fontWeight={300}>
        {state.currencies[0]}
        {calculation.paymentSchedule[0].payment}
      </Box>
      <List>
        <ListItem>
          <Box fontSize="1rem">Total Interest Paid</Box>
          <Box fontWeight="500" fontSize="0.6em">
            {state.currencies[0]}
            {calculation.totalInterest}
          </Box>
        </ListItem>
        <ListItem>
          <Box fontSize="1rem">Total Payments</Box>
          <Box fontWeight="500" fontSize="0.6em">
            {state.currencies[0]}
            {calculation.totalPayments}
          </Box>
        </ListItem>
        <ListItem>
          <Box fontSize="1rem">Final Payment Date</Box>
          <Box fontWeight="500" fontSize="0.6em">
            {getFinalPaymentDate(values.start, values.terms)}
          </Box>
        </ListItem>
      </List>
      <Box
        display="flex"
        justifyContent="center"
        mt="2.4em"
        alignItems="center"
        flexDirection="column"
      >
        <Box fontSize="0.6em">Payment Ratio</Box>
        <Box
          mt="0.7em"
          display="flex"
          justifyContent="center"
          width="100%"
          position="relative"
        >
          <PieChart
            data={[
              {
                title: "Total payments",
                value: state.calculation.totalPayments,
                color: "#40C9EA"
              },
              {
                title: "Total Interest",
                value: state.calculation.totalInterest,
                color: "#4572FE"
              },
              {
                title: "Total Principle paid",
                value: 324000, //state.values.amount,
                color: "#8120E2"
              }
            ]}
            animate
            lineWidth={12}
            rounded
            style={{ width: "50%" }}
          />
          <ChartLegend>
            <ChartLegendBlock>
              <ChartLegendDot color="#8120E2" />
              Total principle
            </ChartLegendBlock>
            <ChartLegendBlock>
              <ChartLegendDot color="#4572FE" />
              Total interest
            </ChartLegendBlock>
            <ChartLegendBlock>
              <ChartLegendDot color="#40C9EA" />
              Total payments
            </ChartLegendBlock>
          </ChartLegend>
        </Box>
      </Box>
    </Box>
  );
};

const List = styled.ul`
  margin-top: 1.2em;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0.6em;
  text-align: left;
`;

const ChartLegend = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ChartLegendBlock = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.4em;

  &:nth-of-type(2) {
    margin: 0.7em 0;
  }
`;

const ChartLegendDot = styled.div<{ color: string }>`
  width: 0.9em;
  height: 0.9em;
  margin-right: 0.4em;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

export default LoanCalculation;
