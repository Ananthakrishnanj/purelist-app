import { FETCH_DETAILS_REQUEST, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAILURE, SET_SEARCH_MODE } from "./actionType";
import axios from 'axios';

const fetchDetailsRequest = () => {
    return {
        type: FETCH_DETAILS_REQUEST     
    }
}

const fetchDetailsSuccess = (data) => {
    return {
        type: FETCH_DETAILS_SUCCESS,
        payload: data
    }
}

const fetchDetailsFailure = (error) => {
    return {
        type: FETCH_DETAILS_FAILURE,
        payload: error
    }
}

export const fetchDetails = (page) => {
    return (dispatch) =>
    {
    dispatch(fetchDetailsRequest()); 
    axios.get(`API/CONTENTLISTINGPAGE-PAGE${page}.json`)    
    .then(response => {
        const data = response.data.page;
        dispatch(fetchDetailsSuccess(data));        
    })
    .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchDetailsFailure(errorMessage));
    }) }
}

export const searchData = (searchText) => {
    return (dispatch) =>
    {
    dispatch(setSearchMode(true));
    dispatch(fetchDetailsRequest()); 
    axios.get(`API/CONTENTLISTINGPAGE.json`)    
    .then(response => {
        const matchingContent = response.data.page['content-items'].content.filter((item) => {
            return item.name.includes(searchText);
        });        
        console.log("Search Result : ", matchingContent);
        const data = response.data.page;
        data['content-items'].content = matchingContent;
        dispatch(fetchDetailsSuccess(data));        
    })
    .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchDetailsFailure(errorMessage));
    }) }
}

export const setSearchMode = (searchMode) => {
    return {
        type: SET_SEARCH_MODE,
        payload: searchMode
    }
    
}