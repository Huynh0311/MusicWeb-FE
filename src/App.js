import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./component/HomeComponent";
import Loader from "./component/Loader";
import UpdateAccount from "./component/account/updateAccount";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UpdatePassword from "./component/account/updatePassword";

import CreateSong from "./component/song/createSong/createSong";
import DetailSong from "./component/song/detailSong/DetailSong";
import RegisterComponent from "./component/RegisterComponent";
import NavbarComponent from "./component/navbarComponent";
import LoginComponent from "./component/LoginComponent";


import 'react-toastify/dist/ReactToastify.css';
import Page from "./component/page";
import Component404 from "./component/Component404";
import SearchComponent from "./component/SearchComponent";


function App() {
    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <div className="App">
            {showNavbar && <NavbarComponent/>}
            <Loader/>
            <SearchComponent/>
            <Routes>
                <Route path="/" element={<Page/>}>
                    <Route path={"/"} element={<HomeComponent/>}/>
                    <Route path={"/updateProfile"} element={<UpdateAccount/>}/>
                    <Route path={"/updatePassword"} element={<UpdatePassword/>}/>
                    <Route path="/song/create" element={<CreateSong/>}/>
                    <Route path={"/song/detailSong/:id"} element={<DetailSong/>}/>
                </Route>
                <Route path="/register" element={<RegisterComponent setShowNavbar={setShowNavbar}/>}/>
                <Route path="/login" element={<LoginComponent setShowNavbar={setShowNavbar}/>}/>

            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
