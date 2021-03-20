import React from 'react';
import './SearchingPages.css';

const SearchingPage = ({vehicleName}) => {
    const{name,image,price}= vehicleName;
    console.log(vehicleName)
    return (
        <div>
              
            <div  className=" details-area  border bg-warning border-radius-less d-flex justify-content-around align-items-center  ">
                <img src={image} alt="" width="80px"/>
                <h2>{name}</h2>
                <h3>{price}</h3>
            </div>
        </div>
    );
};

export default SearchingPage;