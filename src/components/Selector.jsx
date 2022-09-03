import React from "react";


const Selector = ({select,handleSelect}) => {
  return (
    <div>
      <select
        className="form-select"
        value={select}
        onChange={handleSelect}
      >
        <option value="selectOrder">Selecciona una opcion</option>
        <option value="AZname">Order by name : A-Z</option>
        <option value="AZespecie">Order by Especie: A-Z</option>
      </select>
    </div>
  );
};

export default Selector;
