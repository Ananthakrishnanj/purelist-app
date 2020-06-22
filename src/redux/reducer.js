import { FETCH_DETAILS_REQUEST, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAILURE } from "./actionType";

const initialState = {
    data: [],
    isLoading: true,
    error: '',
    totalItems: 0,
    title: ''
}

const reducer = (state = initialState, action) => {
    console.log("change : ", action);
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
                data:[],
                error: action.payload,
                isLoading: false
            }       
        default:
            return state;
    }
}

export default reducer;