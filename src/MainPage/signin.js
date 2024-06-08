import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Home from "./main";
import logo from '../assests/images/Vector.png';

import "./Signin.css"

import backgroundImage from '../assests/images/cartoon';
function Signin() {
    const [value, setValue] = useState('');
    const handleCilck = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem('email', data.user.email)
        })
    }
    useEffect(() => {
        console.log('--its okey for-------');
        setValue(localStorage.getItem('email'))
    })
    const backgroundStyle = {
        height: 'auto',
        width: '100vw',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    };
    return (

        <div style={value ? {} : backgroundStyle}>

            {value ? <Home /> :
                <>
                    <img className="logo" src={logo} alt="" srcset="" />

                    <div className="fullied" >
                        <h1 className="login" >LOGIN</h1>
                        <h4 className="ipsum" >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing.
                        </h4>

                        <button className="google" onClick={handleCilck}>
                            <div className="click" >
                                <div style={{}} >
                                    <img src="https://img.freepik.com/premium-photo/colorful-letter-g-is-painted-white-background_979262-1698.jpg?w=740" height='25px' />

                                </div>
                            </div>

                            <h4 className="using" > Sign in using Google</h4></button>
                    </div>

                </>}

        </div >
    )
}
export default Signin;