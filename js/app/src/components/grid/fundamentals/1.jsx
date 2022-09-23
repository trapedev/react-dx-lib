import React from "react";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import { useState } from "react";
import { generateRows, globalSalesValues } from "../demo/generator";

export default function Fundamental1() {
  const [colums] = useState([
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
    <Paper elevation={3}>
      <Grid rows={rows} columns={colums}>
        <Table></Table>
        <TableHeaderRow></TableHeaderRow>
      </Grid>
    </Paper>
  );
}
