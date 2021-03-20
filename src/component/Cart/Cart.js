import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import './Cart.css';
const Cart = (props) => {
    const history = useHistory();
    const { image, name } = props.pd;
   const handleCart=()=>{
    history.push(`/destination/${name}`)
   }

    return (
        <div>
            <div className="container">
            <div className="col mt-5">
                <div className="card text-center card-board " onClick={handleCart}>
                    <img className="w-50  mx-auto" src={image} alt="" />
                    <div className="card-body">
                        <h3>{name}</h3>
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Cart;