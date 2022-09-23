# Fundamentals

グリッドコンポーネントは、rows プロパティで指定されたデータを表示します。また、columns プロパティを指定して、グリッドがどの行フィールドに対して列を作成するかを定義する必要があります。

Grid は、基本的なデータ可視化のために以下のプラグインが必要です。

- [`Table`](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/)
  > データテーブルをレンダリングします。
- [`TableHeaderRow`](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-header-row/)
  > テーブルのヘッダ行を描画します。

TableHeaderRow プラグインは、Table プラグインに続く必要があります。詳しくは、[プラグインの順序](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/plugin-overview#plugin-order)の記事をご覧ください。

```jsx
import React from "react";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import { useState } from "react";
import { generateRows, globalSalesValues } from "./demo/generator";

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
```

## 外観のカスタマイズ

グリッドの視覚化プラグインは、グリッド要素の外観をカスタマイズするための豊富な API を提供します。最も一般的なカスタマイズタスクの例を以下に説明します。
Table プラグインでは、プラグインの tableComponent、headComponent、bodyComponent、containerComponent プロパティを使用して、テーブル、テーブルヘッド、テーブルボディの外観をカスタマイズすることが可能です。次の例では、tableComponent を使用して、「ストライプ」テーブルを作成する方法を示しました。

```jsx
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
```

注）他のプラグイン（TableHeaderRow, TableEditRow, TableFilterRow, TableGroupRow, TableRowDetail）も同じ API を使用して、UI 要素の外観をカスタマイズすることができます。

### セル（Cells）

Table プラグインでは、cellComponent プロパティを使用して、テーブルセルの外観をカスタマイズすることもできます。たとえば、次の例のように、条件付きセルフォーマットを実装することができます。

```jsx
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
```

### 列（Rows）

Table プラグインの rowComponent プロパティは、以下のデモのように、onClick や onContextMenu などの行イベントを処理することが可能です。

```jsx
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
```

独自の外観をゼロから作成したり、グリッドの Table.Row コンポーネントが提供するデフォルトの外観設定を変更したりすることができます。詳しくは、[プラグインコンポーネント](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table#plugin-components)をご覧ください。
