import Navigation from "../Navigation/Navigation.jsx";
import {Link} from "react-router-dom";

export default function Header({token, apiUrl, setToken}) {
    return (
        <header className="mb-4">
            <Link to="/" className="logo">
                <h2>CraftZone</h2>
            </Link>

            <Navigation token={token} apiUrl={apiUrl} setToken={setToken}/>
        </header>
    )
}