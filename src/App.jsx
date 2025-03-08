import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
    const apiUrl = 'http://127.0.0.1:8000/api';

    return (
        <div className="container">
            <Header/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register apiUrl={apiUrl}/>}/>
            </Routes>

            <Footer/>
        </div>
    )
}