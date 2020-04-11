import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
import addMonths from "date-fns/addMonths";
import format from "date-fns/format";
import {
  Modal,
  Backdrop,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box
} from "@material-ui/core";
import { LoanContext } from "../contexts/LoanContext";

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  })
);

const ScheduleModal: React.FC = () => {
  const classes = useStyles();

  const { state, actions } = useContext(LoanContext);

  if (!state || !actions) return null;

  const { scheduleModalIsOpen, calculation, values } = state;

  if(!calculation || !values) return null;

  const handleClose = () => {
    actions.toggleScheduleModal(false);
  };

  const { start } = values;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={scheduleModalIsOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={scheduleModalIsOpen}>
        <Box>
            <Box maxHeight="90vh" width="80vw" overflow="scroll">
              <Paper>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Payment Date</TableCell>
                      <TableCell align="right">Total payments</TableCell>
                      <TableCell align="right">Interest</TableCell>
                      <TableCell align="right">Principle</TableCell>
                      <TableCell align="right">Unpaid balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {calculation.paymentSchedule.map(({
                      balance,
                      payment,
                      interest,
                      principle,
                    }, scheduleIdx) => (
                      <TableRow key={balance}>
                        <TableCell component="th" scope="row">
                          {format(addMonths(start, scheduleIdx), "dd.MM.yyyy")}
                        </TableCell>
                        <TableCell align="right">
                          {payment}
                        </TableCell>
                        <TableCell align="right">
                          {interest}
                        </TableCell>
                        <TableCell align="right">
                          {principle}
                        </TableCell>
                        <TableCell align="right">
                          {balance}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ScheduleModal;
