import axios from "axios";

export function fetchPokemons() {
    return async function (dispatch) {
        try {
            const fetchedPokemons = await axios(`http://localhost:3001/pokemons`);
            return dispatch({
                type: "GET_POKEMONS",
                payload: fetchedPokemons.data
            })
        } catch (err) {
            console.log({ msg: err.message});
        }
    }
}

export function fetchTypes() {
    return async function (dispatch) {
        try {
            const fetchedTypes = await axios(`http://localhost:3001/types`);
            return dispatch({
                type: "GET_TYPES",
                payload: fetchedTypes.data
            })
        } catch (err) {
            console.log({ msg:err.message });
        }
    }
}