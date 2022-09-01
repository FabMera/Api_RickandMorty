import React from "react";

const Personajes = ({ characters =[] }) => {
  //item = cada uno de los personajes que va en la tarjeta
  return (
    <div className="row">
      {characters.map((item, index) => (
        <div key={index} className="col mb-4" style={{maxWidth:"18rem;"}} >
          <div className="card border-info">
            <img src={ item.image } alt=""  />
            <div className="card-body">
              <h5 className="card-tittle">{item.name}</h5>
              <hr />
              <p>Especie: {item.species}</p>
              <p>Ubicacion: {item.location.name}</p>
              <p>Tipo: {item.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Personajes;
