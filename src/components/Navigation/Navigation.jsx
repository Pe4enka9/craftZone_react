import {Link, NavLink} from "react-router-dom";

export default function Navigation({apiUrl, token, setToken}) {
    const handleLogout = () => {
        fetch(`${apiUrl}/logout`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`},
        })
            .then(res => {
                if (res.status === 204) {
                    localStorage.removeItem('token');
                    setToken('');
                }
            })
            .catch(err => console.error('Ошибка', err));
    };

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
                    <Link to="" onClick={handleLogout}>Выход</Link>
                </>
            )}
        </nav>
    )
}