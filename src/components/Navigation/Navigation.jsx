import {NavLink} from "react-router-dom";

export default function Navigation({token}) {
    return (
        <nav>
            {token === '' ? (
                <>
                    <NavLink to="/register">Регистрация</NavLink>
                    <NavLink to="/login">Авторизация</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/">Главная</NavLink>
                </>
            )}
        </nav>
    )
}