import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./components/Login.jsx";
import {useState} from "react";
import Profile from "./components/Profile/Profile.jsx";
import OneProduct from "./components/OneProduct/OneProduct.jsx";

export default function App() {
    const apiUrl = 'http://127.0.0.1:8000/api';
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    return (
        <div className="container">
            <Header token={token} apiUrl={apiUrl} setToken={setToken}/>

            <Routes>
                <Route path="/" element={<Home apiUrl={apiUrl}/>}/>
                <Route path="/register" element={<Register apiUrl={apiUrl} token={token}/>}/>
                <Route path="/login" element={<Login apiUrl={apiUrl} token={token} setToken={setToken}/>}/>
                <Route path="/profile" element={<Profile apiUrl={apiUrl} token={token}/>}/>
                <Route path="/products/:id" element={<OneProduct apiUrl={apiUrl}/>}/>
            </Routes>

            <Footer token={token}/>
        </div>
    )
}