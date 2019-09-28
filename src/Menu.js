import React, { Component } from 'react'
//Create Menu component.
class Menu extends Component {
    render() {
        return (

                <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                
                <a class="navbar-brand" href="index.html">xSwap Platform</a>
            
                
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#">ABOUT US</a>
                </li>
                
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        SERVICES
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Provision App</a>
                        <a class="dropdown-item" href="#">Deprovision App</a>
                    </div>
                    
                    </li>
                    <li class="nav-item">
                            <a class="nav-link" href="#">API DOCUMENTATION</a>
                    </li>
                    <li class="nav-item">
                            <a class="nav-link" href="#">CONTACT US</a>
                    </li>
                </ul>
            </nav>
              
        )
        }
}     
export default Menu