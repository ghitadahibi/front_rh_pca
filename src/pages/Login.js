import React from 'react';
import bp from '../../src/assets/bp.png';
import '../../src/pages/Login.css';
import google from '../../src/assets/google.png';
import git from '../../src/assets/git.png';
export const Login = () => {
    return (
        <div className="Signin">
            <div className="header">
                <img src={bp} alt="Logo" className='h2' />
                <h2 className="title">Fast, helpful AI Recruitment</h2>
            </div>
            <form>
                <input type="email" className="input-email" placeholder="Email adresse" />
                <input type="password" className="input-pwd" placeholder="Mot de passe" />
            </form>
            <input type="submit" value="Connexion" className="submit-btn" />
            <div className="auth-divider">
                <hr className="auth-hr" />
                <span className="auth-or">or</span>
                <hr className="auth-hr" />
            </div>
            <button className="auth-button">
                <img className="auth-icon" src={google} alt="Google Icon" />
                Continue with Google
            </button>
            <button className="auth-button">
                <img className="auth-icon" src={git} alt="Google Icon" />
                Continue with Github
            </button>
        </div>
    );
};
