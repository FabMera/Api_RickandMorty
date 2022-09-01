import React from "react";

const Paginado = ({ prev, next, previo, Siguiente }) => {
    
  const handlePrevPage = () => {
    previo();
  };
  const handleNextPage = () => {
    Siguiente();
  };
  //prev y next son propiedades del objeto API paginacion.
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {prev ? (
          <li className="page-item">
            <button onClick={handlePrevPage} className="page-link">
              Prev
            </button>
          </li>
        ) : null}
        {next ? (
          <li className="page-item">
            <button onClick={handleNextPage} className="page-link">
              Next
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Paginado;
