import React from 'react';
import '../assets/styles/tiles.css';

function Tiles(props) {
    return (
        <div className="ml-auto mr-auto md:mt-5_625">            
            <img src={props.item['poster-image']} onError={(e)=>{e.target.onerror = null; e.target.src="./placeholder.png"}} className="tile-image"></img>            
            <p className="text-white md:mt-6">{props.item.name}</p>
        </div>
    )
}

export default Tiles;
