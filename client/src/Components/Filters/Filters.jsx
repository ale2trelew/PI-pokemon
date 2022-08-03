import React from "react";
import { 
    fetchPokemons, 
    filterPokemons,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TypeIcon from "../Icons/TypeIcon";
import "./Filters.css";
import SearchBar from "../SearchBar/SearchBar";


export default function Filters({ createdFilter, typesFilter }) {
    const allTypes = useSelector((state) => state.types);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        typeFilter: "default",
        order: 'default'
    });

    function handleClick(e) {
        e.preventDefault(); //POR SI RENDERIZA LENTO
        setFilter({
            typeFilter: "default",
            order: 'default'
        });
        dispatch(fetchPokemons());
    }

    function handleFilters(event) {
        event.preventDefault(); //POR SI RENDERIZA LENTO
        switch (event.target?.value) {
            case 'nameUp': {
                setFilter({
                    ...filter,
                    order: 'nameUp'
                })
                break;
            };
            case 'nameDown': {
                setFilter({
                    ...filter,
                    order: 'nameDown'
                })
                break;
            };
            case 'attackUp': {
                setFilter({
                    ...filter,
                    order: 'attackUp'
                })
                break;
            };
            case 'attackDown': {
                setFilter({
                    ...filter,
                    order: 'attackDown'
                })
                break;
            };
            default: {
                setFilter({
                    ...filter,
                    typeFilter: event.target.value
                })
                break;
            }
        }
    }

    useEffect(() => {
        if (Object.values(filter).find(e => e !== "default"))
        dispatch(filterPokemons(filter));
    }, [filter])

    return (
        <div className="filters">
            <div className="type-container">
                {/* {allTypes.map((type) => {
                    // console.log("DDDDDDDDDDDDD", type.name);
                    return (
                        <TypeIcon key={type.id} name={type.name} handleFilters={handleFilters} />
                    )
                })} */}
                <div className="order-container">
                    <select className="selector" onChange={e => { typesFilter(e) }} >
                        <option value='todos'>Todos</option>
                        <option value='normal'>Normal</option>
                        <option value='fighting'>Lucha</option>
                        <option value='flying'>Volador</option>
                        <option value='poison'>Veneno</option>
                        <option value='ground'>Tierra</option>
                        <option value='rock'>Roca</option>
                        <option value='bug'>Bicho</option>
                        <option value='ghost'>Fantasma</option>
                        <option value='steel'>Acero</option>
                        <option value='fire'>Fuego</option>
                        <option value='water'>Agua</option>
                        <option value='grass'>Planta</option>
                        <option value='electric'>Eléctrico</option>
                        <option value='psychic'>Psíquico</option>
                        <option value='ice'>Hielo</option>
                        <option value='dragon'>Dragón</option>
                        <option value='dark'>Siniestro</option>
                        <option value='fairy'>Hada</option>
                        <option value='shadow'>Oscuro</option>
                        <option value='unknown'>Desconocido</option>
                    </select>
                </div>
            </div>
            <div className="order-container">
                <div className="selector">
                    <select onChange={(e) => handleFilters(e)} name="Order">
                        <option value="Cualquiera" hidden={true}>Ordenados por</option>
                        <option value="nameUp">A-Z</option>
                        <option value="nameDown">Z-A</option>
                        {/* <option value="attackUp">Ataque mas alto</option>
                        <option value="attackDown">Ataque mas bajo</option> */}
                    </select>
                </div>
                <div className="selector">
                    <select onChange={(e) => handleFilters(e)} name="Order">
                        <option value="Cualquiera" hidden={true}>Ordenados por</option>
                        {/* <option value="nameUp">A-Z</option>
                        <option value="nameDown">Z-A</option> */}
                        <option value="attackUp">Ataque mas alto</option>
                        <option value="attackDown">Ataque mas bajo</option>
                    </select>
                </div>
                <div className="selector">
                    <select onChange={(e) => { createdFilter(e) }} name="Createds">
                        <option value="All">API</option>
                        <option value="Created">Creados</option>
                    </select>
                </div>
                <div className="reload-container">
                    <button className="realodButton" onClick={(e) => {handleClick(e);
                    }}>
                        Limpiar filtros
                    </button>
                </div>
                <SearchBar />
            </div>
        </div>
    )
}