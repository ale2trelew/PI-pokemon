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

export function findByName(name) {
    return async function (dispatch) {
        try {
            const pokemonName = await axios(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: "FIND_BY_NAME",
                payload: pokemonName.data
            })
        } catch (err) {
            console.log({ msg: err.message });
        }
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const response = await axios.post(`http://localhost:3001/pokemons/create`, payload);
        return dispatch({
            type: "CREATE_POKEMON",
            response
        })
    }
}

export function fetchDetails(id) {
    return async function (dispatch) {
        const details = await axios(`http://localhost:3001/pokemons/${id}`);
        return dispatch({
            type: "GET_DETAILS",
            payload: details.data
        })
    }
}

export function filterByCreated(payload) {
    return {
        type: "FILTER_BY_CREATED",
        payload
    }
}

export function filterPokemons(payload) {
    return async function (dispatch) {
        const filters = await axios.get(`http://localhost:3001/pokemons?typeFilter=${payload.typeFilter}&order=${payload.order}`);
        return dispatch({
            type: "FILTERS",
            payload: filters.data
        })
    }
}