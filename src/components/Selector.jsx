import React from "react";

const Selector = () => {
  return (
    <div>
      <select className="form-select">
        <option value="selectOrder">Selecciona una opcion</option>
        <option value="1">Order by name : A-Z</option>
        <option value="2">Order by Especie: A-Z</option>
      </select>
    </div>
  );
};

export default Selector;
