import React from "react";

const Personajes = ({ characters = [] }) => {
  //item = cada uno de los personajes que va en la tarjeta

  return (
    <div className="row justify-content-center">
      {characters.map((item, index) => (
        <div key={index} className="col mb-4" style={{ maxWidth: "18rem" }}>
          <div className="card border-info">
            {item.status === "Alive" ? (
              <span className="badge bg-success">{item.status}</span>
            ) : (
              <span className="badge bg-danger">{item.status}</span>
            )}
            <img src={item.image} alt="" />
            <div className="card-body">
              <h5 className="card-tittle">{item.name}</h5>
              <hr />
              <p>Especie: {item.species}</p>
              <p>Ubicacion: {item.location.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Personajes;
