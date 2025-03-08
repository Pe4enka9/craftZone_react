import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "../Loader/Loader.jsx";

export default function Profile({apiUrl, token}) {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Профиль';

        token === '' && navigate('/login');
    }, [navigate, token]);

    useEffect(() => {
        setLoading(true);

        fetch(`${apiUrl}/user`, {headers: {Authorization: `Bearer ${token}`}})
            .then(res => res.json())
            .then(user => setUser(user))
            .catch(err => console.error('Ошибка', err))
            .finally(() => setLoading(false));
    }, [apiUrl, token]);

    return (
        <section className="profile">
            <h1 className="mb-2">Профиль</h1>

            <Loader loading={loading}/>

            <div className="user-info">
                <h3>Имя: {user.first_name}</h3>
                <h3>Фамилия: {user.last_name}</h3>
                <h3>E-mail: {user.email}</h3>
                <h3>Ваша роль: {user.role === 'seller' ? 'Продавец' : 'Покупатель'}</h3>
            </div>
        </section>
    )
}