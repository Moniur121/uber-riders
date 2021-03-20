import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
 
import './Header.css';
const Header = () => {
    const[loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    // const handleLogIn = () => {
    //     history.push("/login");
    // }
    return (
        <div >
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand text-light" href="#">Uber Riders</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                 <Link to="/home" class="nav-link active text-light">Home</Link> 
                            </li>
                            <li class="nav-item">
                            <Link to="/destination" class="nav-link active text-light">Destination</Link> 
                            </li>
                            <li class="nav-item">
                            <Link to="/blog" class="nav-link active text-light">Blog</Link> 
                            </li>
                            <li class="nav-item">
                            <Link to="/contact" class="nav-link active text-light">Contact</Link> 
                            </li>
                            <li class="nav-item">
                            <Link to="/login" class="nav-link active text-light" logged>{loggedInUser.email ? loggedInUser.name:"logIn"}</Link> 
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;