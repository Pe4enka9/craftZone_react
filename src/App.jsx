import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./components/Login.jsx";
import {useState} from "react";

export default function App() {
    const apiUrl = 'http://127.0.0.1:8000/api';
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    return (
        <div className="container">
            <Header token={token}/>

            <Routes>
                <Route path="/" element={<Home token={token}/>}/>
                <Route path="/register" element={<Register apiUrl={apiUrl} token={token}/>}/>
                <Route path="/login" element={<Login apiUrl={apiUrl} token={token} setToken={setToken}/>}/>
            </Routes>

            <Footer token={token}/>
        </div>
    )
}