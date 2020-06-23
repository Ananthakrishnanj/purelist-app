import React, { Component, Fragment } from 'react'
import { fetchDetails } from '../redux/action'
import { connect } from 'react-redux'
import Tiles from './Tiles';
import Navbar from './Navbar';
import Error from './Error';
import Loader from './Loader';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }

          this.loadRef = React.createRef();
    }

    componentDidMount() {            
        this.observer = new IntersectionObserver(entries => {            
            console.log(entries, "entries");
            entries.forEach(entry => {
              if (entry.intersectionRatio > 0) {
                this.loadMore();
              }
            });
          });
          this.observer.observe(this.loadRef.current);
    }

    loadMore() {
        if((this.props.totalItems == 0 ||  this.props.data.length < this.props.totalItems)) {
            this.props.fetchDetails(this.state.page);            
            this.setState({page: this.state.page + 1});     
        }            
    }

    resetPage() {     
        this.setState({page: 1}, () => {        
        this.loadMore();        
        this.observer.observe(this.loadRef.current);        
        });
    }

    render() {
        return (
            <div>
                <Navbar resetPage={() => this.resetPage()}></Navbar>
                <div className="grid grid-cols-3 gap-4 ml-4 mr-4 mt-16 md:grid-cols-4 md:gap-1_875 md:ml-1_875 md:mr-1_875 md:mt-6_375">
                {
                    this.props.data.map((item, index) => {
                        return(
                            <Fragment key={index}>
                            <Tiles item={item}></Tiles>
                            </Fragment>
                        )
                    })
                }
                </div>
                { this.props.isLoading &&
                <Loader></Loader>
                }
                {this.props.error &&
                <Error error={this.props.error}></Error>
                }
                {
                !this.props.searchMode &&
                <div ref={this.loadRef} className="h-1">&nbsp;</div>
                }
                { !this.props.error && !this.props.isLoading && this.props.data.length === 0 &&
                    <div className="text-center mt-40 text-white">
                    <i className="fa fa-exclamation-triangle mr-2" aria-hidden="true"></i>
                    No Data Found
                </div>
                }                
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        data : state.data,
        isLoading: state.isLoading,
        error: state.error,
        totalItems: state.totalItems,
        hasMore: state.hasMore,
        searchMode: state.searchMode,        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetails: (page) => dispatch(fetchDetails(page))    
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer);

