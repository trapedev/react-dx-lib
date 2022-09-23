import React from "react";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import { useState } from "react";
import { generateRows, globalSalesValues } from "../demo/generator";
import { alpha, styled } from "@mui/material/styles";

const PREFIX = "Demo";
const classes = {
  tableStriped: `${PREFIX}-tableStriped`,
};
const StyledTable = styled(Table.Table)(({ theme }) => ({
  [`&.${classes.tableStriped}`]: {
    "& tbody tr:nth-of-type(odd)": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
  },
}));

const TableComponent = (props) => (
  <StyledTable {...props} className={classes.tableStriped} />
);

export default function Fundamental2() {
  const [columns] = useState([
    { name: "region", title: "Region" },
    { name: "sector", title: "Sector" },
    { name: "customer", title: "Customer" },
    { name: "product", title: "Product" },
    { name: "amount", title: "Sale Amount" },
  ]);
  const [rows] = useState(
    generateRows({ columnValues: globalSalesValues, length: 8 })
  );

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <Table tableComponent={TableComponent}></Table>
        <TableHeaderRow></TableHeaderRow>
      </Grid>
    </Paper>
  );
}
