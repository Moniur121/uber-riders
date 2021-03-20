import React, { useState } from 'react';
import fakeData from '../../fakeData/fakeData.json';
import Cart from '../Cart/Cart';
import './Home.css'

const Home = () => {
    const data=fakeData;
    const[cart,setCart]=useState(data);

    return (
        <div className="background-area">
            <div className="card-bg row row-cols-1 row-cols-md-4 g-4">
            {
                cart.map(pd=> <Cart pd={pd}></Cart>)
            }
        </div>
        </div>
    );
};

export default Home;