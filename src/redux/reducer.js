import { FETCH_DETAILS_REQUEST, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAILURE, SET_SEARCH_MODE } from "./actionType";

const initialState = {
    data: [],
    isLoading: true,
    error: '',
    totalItems: 0,
    title: '',
    searchMode: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DETAILS_REQUEST:
            {
                return {
                    ...state,                
                    isLoading: true
                }
            }
        case FETCH_DETAILS_SUCCESS:
            const data = [...state.data, ...action.payload['content-items'].content];
            const totalItems = action.payload['total-content-items'];     

            return {
                ...state,
                data: data,
                totalItems: totalItems,
                title: action.payload.title,
                isLoading: false,                
            }
        case FETCH_DETAILS_FAILURE:
            return {
                ...state,                
                error: action.payload,
                isLoading: false
            }
        case SET_SEARCH_MODE:
            return {
                ...state,
                searchMode: action.payload,
                data: []                
            }       
        default:
            return state;
    }
}

export default reducer;
