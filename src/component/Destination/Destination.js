import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import vehicleFakeData from '../../fakeData/vehicleFakeData.json';
import SearchingPage from '../SearchingPage/SearchingPage';
 
import './Destination.css'



const Destination = () => {
    const { name } = useParams()
    const [showDetails, setShowDetails] = useState(false)
    const [vehicle, setVehicle] = useState([]);
    const[pick,setPick]= useState({
        pickFrom:'',
        pickTo:''
    })
    const handlePick=(e)=>{
        const newPick={...pick};
        newPick[e.target.name]=e.target.value;
        setPick(newPick);
    }
    useEffect(() => {
        const vehicleList = vehicleFakeData.filter(td => { return td.name === name })
        setVehicle(vehicleList);
    }, [name])
    const handleSubmit = (event) => {
        setShowDetails(true);
        event.preventDefault();
    }

    return (

        <div  >
            <div className="row">
                <div className="col-md-4" className="search-area">
                    <div>
                        {showDetails && 
                        <div  className=" details-area  border bg-danger text-light border-radius-less d-flex justify-content-around align-items-center  ">
                         
                        <h2>{pick.pickFrom}</h2>
                        <h2>to</h2>
                        <h3>{pick.pickTo}</h3>
                    </div>
                        }
                    </div>
                    {!showDetails && <form action="" onSubmit={handleSubmit} >
                        <label htmlFor="">Pick From</label><br />
                        <input onBlur={handlePick} type="text" name="pickFrom" id="" required /><br /><br />
                        <label htmlFor="">Pick To</label><br />
                        <input onBlur={handlePick}  type="text" name="pickTo" id="" required /><br /><br/>
                        <label htmlFor="">Date</label><br /><br />
                        <input type="date" name="" id=""/><br/>
                        <button className="searchBtn">Search</button>
                    </form>}
                    {
                        showDetails &&
                        vehicle.map(vehicleName => <SearchingPage vehicleName={vehicleName}></SearchingPage>)
                    }
                </div>
                <div className="col-md-8 map-area" >
                     
                </div>
            </div>

        </div>
    );
};

export default Destination;