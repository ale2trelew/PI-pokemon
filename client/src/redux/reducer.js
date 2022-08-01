const initialState = {
    pokemons: [],
    allPokemons: [],
    order: [],
    types: [],
    details: []
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case "GET_POKEMONS": {
            return {
                ...state,
                pokemons: payload,
                allPokemons: payload
            }
        };
        case "GET_TYPES": {
            return {
                ...state,
                types: payload
            }
        };
        case "CREATE_POKEMON": {
            return {
                ...state
            }
        };
        default:
            return state;
    }
}

export default reducer;