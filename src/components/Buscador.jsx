import React from "react";

const Buscador = ({ search, handleInput }) => {
  return (
    <form className="d-flex mb-3">
      <input
        value={search}
        onChange={handleInput}
        type="text"
        placeholder="Search..."
        className="form-control me-2"
      />
      <button className="btn btn-warning text-white" type="submit">
        Search
      </button>
    </form>
  );
};

export default Buscador;
