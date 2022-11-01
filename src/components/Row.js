import React from "react";
import './css/CalculatorBody.css';

function Row(props){
  const currentRowId = props.id;

  function updateValue(event){
    const currentRow = {
      id: currentRowId,
      sign: props.sign,
      value: parseInt(event.target.value),
      enabled: props.enabled
    };
    props.updateRow(currentRow);
  }

  function updateSign(event){
    const sign = event.target.value;
    const currentRow = {
      id: currentRowId,
      sign: sign,
      value: props.value,
      enabled: props.enabled
    };
    props.updateRow(currentRow);
  }

  function updateEnabled(){
    const isEnabled = !props.enabled;
    const currentRow = {
      id: currentRowId,
      sign: props.sign,
      value: props.value,
      enabled: isEnabled
    };
    props.updateRow(currentRow);
  }

   function onDeleteRow(){
    props.removeRow(currentRowId);
  }

  return (
    <div>
      <li className="list" >

        <select className="signlist" onChange={updateSign} value={props.sign}>
          <option value='plus'>+</option>
          <option value='minus'>-</option>
        </select>

        <input className="inputtext" min="0" step="1" type="number" value={props.value} onChange={updateValue}/>

        <button type="button" className="btn btn-danger btn-sm" id="deleteBtn" onClick={onDeleteRow}>Delete</button>

        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" checked={props.enabled} onChange={updateEnabled}/>
        </div>
      </li>
    </div>
  )
}

export default Row