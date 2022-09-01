import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Personajes from "./components/Personajes";
import Paginado from "./components/Paginado";
import Footer from "./components/Footer";
import Selector from "./components/Selector";
import Buscador from "./components/Buscador";

function App() {
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
  const previo = () => {
    showData(info.prev);
  };
  const Siguiente = () => {
    showData(info.next);
  };
  useEffect(() => {
    showData(endpoint);
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    searchPersonaje(e.target.value);
  };

  const searchPersonaje = (buscar) => {
    const results = personajes.filter((valor) => {
      if (valor.name.toLowerCase().includes(buscar.toLocaleLowerCase())) {
        return valor;
      }
    });
    setBusqueda(results);
  };

  const compare = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (
      a.name.toLowerCase() > b.name.toLowerCase()
    ) {
      return 1;
    }
    return 0;
    
  };
  const compareEspecie = (a, b) => {
    if (a.species.toLowerCase() < b.species.toLowerCase()) {
      return -1;
    } else if (
      a.species.toLowerCase() > b.species.toLowerCase()
    ) {
      return 1;
    }
    return 0;
    
  };
  

  const renderSelect = (select) => {
    if (select === "AZname") {
      personajes.sort(compare)
    } else if(select ==="AZespecie"){
      personajes.sort(compareEspecie)
    }
  };
  //obtengo el valor del select

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
      <NavBar title="Rick and Morty APP" />
      <div className="container mt-4 d-flex flex-row justify-content-around ">
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

        <form className="d-flex">
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
      </div>

      <div className="container mt-5">
        <Paginado
          prev={info.prev}
          next={info.next}
          previo={previo}
          Siguiente={Siguiente}
        />

        {search === "" ? (
          <Personajes characters={personajes} />
        ) : (
          <div className="row">
            {busqueda.map((item, index) => (
              <div key={index} className="col-3 mb-4" style={{maxWidth:"18rem;"}}>
                <div className="card border-info">
                  <img src={item.image} alt="" />
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
        )}
        <Paginado
          prev={info.prev}
          next={info.next}
          previo={previo}
          Siguiente={Siguiente}
        />
        <Footer tittle="Desarrollado por Fabian" />
      </div>
    </>
  );
}

export default App;
