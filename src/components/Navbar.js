import React, {Component} from 'react';
import '../assets/styles/navbar.css';
import { connect } from 'react-redux';
import {searchData, setSearchMode} from '../redux/action';
import backImage from '../assets/images/Back.png';
import searchImage from '../assets/images/search.png';

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 searchText : '',                 
                 showTextInput: false,
                 searched: false
        }
    }

    changeSearchText(event) {
        this.setState({
            searchText: event.target.value,                       
        });
    }

    initiateSeach() {
        if(this.state.searchText) {
            this.props.searchData(this.state.searchText);
            this.setState({searched: true});
        }
        else {
            this.setState({showTextInput : true});
        }
    }
    
    handleKeyPress(target) {
        if (target.charCode == 13) {
            this.initiateSeach();
        }
    }

    clearSearch() {
        if(this.state.searched) {
            this.props.setSearchMode(false);
            this.setState({            
                showTextInput: false,
                searchText: '',
                searched: false            
            }, () => this.props.resetPage());
        }
        this.setState({            
            showTextInput: false,
            searchText: ''            
        });
    }

    render() {
        return (
            <div className="navbar-background h-16 bg-repeat-x fixed w-full top-0 bg-contain flex items-center pl-4 pr-4 md:h-9_75 md:pl-1_875 md:pr-1_875">
                <img src={backImage} className="icon" />
                <p className="text-white ml-2 flex-grow">{this.props.title}</p>
                {
                this.state.showTextInput &&
                <input type="text" value={this.state.searchText} onChange={(e) => this.changeSearchText(e)} onKeyPress={(e) => this.handleKeyPress(e)} className="animate__animated animate__fadeInRight duration-75 mr-2 text-white bg-transparent border-b outline-none border-white border-opacity-50 focus:border-opacity-100" />
                }
                {
                this.state.showTextInput &&
                <i className="fa fa-times text-white mr-2 animate__animated animate__fadeInRight duration-75" aria-hidden="true" onClick={() => this.clearSearch()}></i>
                }                
                <img src={searchImage} className="icon" onClick={() => this.initiateSeach()} />                     
            </div>
        )
    }
}

const mapStateToProps  = (state) => {
    return {
        title: state.title
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchData: (searchText) => dispatch(searchData(searchText)),
        setSearchMode: (searchMode => dispatch(setSearchMode(searchMode)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

