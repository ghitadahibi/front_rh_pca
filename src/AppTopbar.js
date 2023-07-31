import React from 'react';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import bp from '../src/assets/bp.png';
import '../src/AppTopbar.css'
import { Link } from 'react-router-dom'
const AppTopbar = (props) => {
    const navigate = useNavigate();

    const onTopbarItemClick = (event, item) => {
        if (props.onTopbarItemClick) {
            props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    };

    return (
        <div className="app-topbar">
            <nav>
                <div class="logo">
                    <a href="#">
                        <img src={bp} />
                    </a>
                </div>
               
                <div class="account">
                <Link to='/login'>
                  Se connecter 
                </Link>  
                </div>
            </nav>
        </div>
    );
};

export default AppTopbar;
