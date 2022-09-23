import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";

import { generateRows, globalSalesValues } from "../demo/generator";

const HighlightedCell = ({ value, style, ...restProps }) => (
  <Table.Cell
    {...restProps}
    style={{
      backgroundColor: value < 5000 ? "red" : undefined,
      ...style,
    }}
  >
    <span
      style={{
        color: value < 5000 ? "white" : undefined,
      }}
    >
      {value}
    </span>
  </Table.Cell>
);

const Cell = (props) => {
  const { column } = props;
  if (column.name === "amount") {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

export default function Fundamental3() {
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
        <Table cellComponent={Cell} />
        <TableHeaderRow />
      </Grid>
    </Paper>
  );
}
