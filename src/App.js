import "./styles.css";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useInterval } from "./useInterval";

export default function App() {
  let [count, setCount] = useState(0);
  let [delay, setDelay] = useState(1000);
  const [runWorker, setRunWorker] = useState(false);
  const [rowData] = useState([
    {
      make: "Toyota",
      model: [{ msg: "message A" }, { msg: "Message B" }],
      price: 35000
    },
    { make: "Ford", model: [{ msg: "OK" }], price: 32000 },
    { make: "Porsche", model: [], price: 72000 }
  ]);

  const mapper = (m) => {
    return {
      ...m,
      ...{
        model: m.model.reduce((a, c) => `${a}${c.msg}, `, "")
      }
    };
  };

  const handleChange = (event) => {
    setRunWorker(event.target.checked);
    setDelay(event.target.checked ? 1000 : null);
    setCount(event.target.checked ? count : 0);
  };

  const colDefs = [{ field: "make" }, { field: "model" }, { field: "price" }];

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, delay);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={runWorker}
              onChange={handleChange}
              name="runWorker"
              color="primary"
            />
          }
          label={`Check Status ${count}`}
        />
      </FormGroup>
      <AgGridReact
        //        onGridReady={onGridReady}
        columnDefs={colDefs}
        rowData={rowData.map(mapper)}
      ></AgGridReact>
    </div>
  );
}
