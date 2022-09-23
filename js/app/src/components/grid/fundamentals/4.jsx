import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import { generateRows, globalSalesValues } from "../demo/generator";

const styles = {
  banking: {
    backgroundColor: "#f5f5f5",
  },
  health: {
    backgroundColor: "#a2e2a4",
  },
  telecom: {
    backgroundColor: "#b3e5fc",
  },
  energy: {
    backgroundColor: "#ffcdd2",
  },
  insurance: {
    backgroundColor: "#f0f4c3",
  },
};

const TableRow = ({ row, ...restProps }) => (
  <Table.Row
    {...restProps}
    // eslint-disable-next-line no-alert
    onClick={() => alert(JSON.stringify(row))}
    style={{
      cursor: "pointer",
      ...styles[row.sector.toLowerCase()],
    }}
  />
);

export default function Fundamental4() {
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
        <Table rowComponent={TableRow}></Table>
        <TableHeaderRow></TableHeaderRow>
      </Grid>
    </Paper>
  );
}
