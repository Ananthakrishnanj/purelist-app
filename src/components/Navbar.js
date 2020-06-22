import React from 'react';
import '../assets/styles/navbar.css';
import { connect } from 'react-redux';
import backImage from '../assets/images/Back.png';
import searchImage from '../assets/images/search.png';


function Navbar(props) {
    return (
        <div className="navbar-background h-16 bg-repeat-x fixed w-full top-0 bg-contain flex items-center pl-4 pr-4 md:h-9_75 md:pl-1_875 md:pr-1_875">
            <img src={backImage} className="icon"/>
            <p className="text-white ml-2 flex-grow">{props.title}</p>
            <img src={searchImage} className="icon"/>
        </div>
    )
}

const mapStateToProps  = (state) => {
    return {
        title: state.title
    }
}

export default connect(mapStateToProps)(Navbar);
