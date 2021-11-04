const defaultState = {
    currentHackaton: {}
}

function reducer(state = defaultState, action){
    switch(action.type){
        case "SET_HACKATHON":
            return {
                ...state,
                currentHackaton: action.payload
            }
            default: return state
    }
}

export default reducer;