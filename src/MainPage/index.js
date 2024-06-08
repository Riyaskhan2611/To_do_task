import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './main'
import Signin from './signin'


function Mainindex() {
    const token = localStorage.setItem('email', data.user.email)
    return (
        <div className='mainindex'>
            <BrowserRouter>
                <Routes>
                    {token ? (
                        <Route path="/homepage" element={<Home />} />

                    ) : (
                        <Route path="/signin" element={<Signin />} />

                    )}


                </Routes>


            </BrowserRouter>


        </div>
    )
}

export default Mainindex
