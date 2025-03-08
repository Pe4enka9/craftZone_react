import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Home({token}) {
    const navigate = useNavigate();

    useEffect(() => {
        token === '' && navigate('/login');
    }, [navigate, token]);
    
    return (
        <h1>Home</h1>
    )
}