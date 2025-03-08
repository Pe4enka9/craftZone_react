import {Link} from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";

export default function Footer({token}) {
    return (
        <footer>
            <Link to="/" className="logo">
                <h2>CraftZone</h2>
            </Link>

            <Navigation token={token}/>
        </footer>
    )
}