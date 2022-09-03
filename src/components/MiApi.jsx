import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Personajes from "./Personajes";
import Paginado from "./Paginado";
import Footer from "./Footer";
import Selector from "./Selector";
import Buscador from "./Buscador";

export const MiApi = () => {
  const [personajes, setPersonajes] = useState([]);
  const [info, setInfo] = useState({}); //estado de las paginas next o prev,se accede mediante info en API.
  const [search, setSearch] = useState(""); //estado de los input
  const [busqueda, setBusqueda] = useState([{}]); //estado para mostrar el resultado
  const [select, setSelect] = useState("");

  const endpoint = "https://rickandmortyapi.com/api/character";

  //definimos la funcion para realizar el get,con parametro
  const showData = (endpoint) => {
    try {
      axios.get(endpoint).then((res) => {
        const animaciones = res.data.results;
        const infoPj = res.data.info;
        setPersonajes(animaciones);
        setInfo(infoPj);
        console.log(infoPj);
        console.log(animaciones);
      });
    } catch (error) {
      console.log("error" + error);
    }
  };

  //----------Funciones para paginado "siguiente y anterior"------------//
  const previo = () => {
    showData(info.prev);
  };
  const Siguiente = () => {
    showData(info.next);
  };
  //---------------------------------------------//
  useEffect(() => {
    showData(endpoint);
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    searchPersonaje(e.target.value);
  };
  //---------------------funcion de busqueda---------------------------------//
  const searchPersonaje = (buscar) => {
    const results = personajes.filter((valor) => {
      if (valor.name.toLowerCase().includes(buscar.toLocaleLowerCase())) {
        return valor;
      }
    });
    setBusqueda(results);
  };
  //---------------------funcion para SORT primera opcion---------------------//
  const compare = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  //-----------------funcion para SORT segunda opcion----------------------//
  const compareEspecie = (a, b) => {
    if (a.species.toLowerCase() < b.species.toLowerCase()) {
      return -1;
    } else if (a.species.toLowerCase() > b.species.toLowerCase()) {
      return 1;
    }
    return 0;
  };
  //---------------funcion de SELECT para ver seleccionar una opcion-----------//
  const renderSelect = (select) => {
    if (select === "AZname") {
      personajes.sort(compare);
    } else if (select === "AZespecie") {
      personajes.sort(compareEspecie);
    }
  };

  //-------------------------------obtengo el valor del select-----------------//
  const handleSelect = (e) => {
    setSelect(e.target.value);
    console.log(e.target.value);
    renderSelect(e.target.value);
  };

  //el estado [personajes] lo usamos como props desde el
  //component Personajes.jsx utilizando el prop
  //({characters}) indicando que su valor es todo lo que contiene el componente

  return (
    <>
      <NavBar title="Rick and Morty" />
      <div className="container mt-4 d-flex flex-row justify-content-around ">
        <Selector select={select} handleSelect={handleSelect} />
        <Buscador search={search} handleInput={handleInput} />
      </div>
      <nav>
        <Paginado
          prev={info.prev}
          next={info.next}
          previo={previo}
          Siguiente={Siguiente}
        />
      </nav>

      <div className="container mt-5">
        {search === "" ? (
          <Personajes characters={personajes} />
        ) : (
          <div className="row justify-content-center ">
            {busqueda.map((item, index) => (
              <div
                key={index}
                className="col-3 mb-4"
                style={{ maxWidth: "18rem" }}
              >
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
        )}
      </div>
      <Paginado
        prev={info.prev}
        next={info.next}
        previo={previo}
        Siguiente={Siguiente}
      />
      <Footer tittle="Desarrollado por Fabi@n-2022" />
    </>
  );
};
