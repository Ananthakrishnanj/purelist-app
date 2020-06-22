import React from 'react';

function Error(props) {
    return (
        <div className="text-center mt-4 text-white">
            <i className="fa fa-exclamation-triangle mr-2" aria-hidden="true"></i>
            {props.error}
        </div>
    )
}

export default Error;
