import React, { useState } from "react";
import Row from './Row';
import './css/CalculatorBody.css';

function Table(){
  const [rows, setRows] = useState([]);
  const result = updateRes();

  function updateRes(){
    const values = rows.filter(row => row.enabled).map(row => row.sign === 'plus' ? row.value: -row.value );  
    var res=0
    for(let i = 0; i<values.length; i++){
      res += parseInt(values[i]);
    }
    return res;
  }

  function calculateId(){
    if (!rows.length) return 0;
    const ids = rows.map(r => r.id);
    return Math.max(...ids) + 1;
  }

  function onAddBtnClick() {
    const newId = calculateId();
    const newRow = {
      key:newId,
      id: newId,
      value: 0,
      sign: 'plus',
      enabled: true
    };
    setRows(rows.concat(newRow));
  }

  function onRemoveAll(){
    setRows([]);
  }

  function onReset(){
    const updatedRows = rows.map(row => ({...row, value: 0}));
    setRows([...updatedRows]);
  }

  function updateRow(rowToUpdate){
    const updatedRows = rows.map(row => {
      if (row.id === rowToUpdate.id) {
        return {...rowToUpdate};
      }
      return row;
    });
    setRows(updatedRows);
  }

  function removeRow (idRowToRemove){
    const updatedRows = rows.filter(row => row.id !== idRowToRemove );
    setRows(updatedRows);
  }

  return (
    <div className="wrapper">
  
      <h1 id="title">React Calculator</h1> 

      <img id="reactlogo" src={require('../assets/logo192.png')} alt="React Logo"></img>

      <div id="controlbuttons">
        <button id="addBtn" className="btn btn-light" onClick={onAddBtnClick}>Add Row</button>
        <button id="removeBtn" className="btn btn-light" onClick={onRemoveAll}>Delete All Rows</button>
        <button id="resetBtn" className="btn btn-light" onClick={onReset}>Reset Values</button>
      </div>

      <ul id="rowlist">
        {rows.map(row => (
          <Row
            key={row.id}
            id={row.id}
            removeRow={removeRow}
            updateRow={updateRow}
            value={row.value}
            sign={row.sign}
            enabled={row.enabled}
          />
        ))}
      </ul>

      <div id="resultContainer"><h4 id="result">Result: {result}  </h4></div>

    </div>
  )
}

export default Table;