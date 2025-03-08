import {useEffect, useState} from "react";
import Button from "./Button/Button.jsx";
import {useNavigate} from "react-router-dom";

export default function Register({apiUrl, token}) {
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        document.title = 'Регистрация';

        token !== '' && navigate('/');

        fetch(`${apiUrl}/roles`)
            .then(res => res.json())
            .then(roles => setRoles(roles))
            .catch(err => console.error('Ошибка', err));
    }, [apiUrl, navigate, token]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role_id: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                data.errors ? setErrors(data.errors) :
                    setFormData({first_name: '', last_name: '', email: '', password: '', role_id: ''});
            })
            .catch(err => console.error('Ошибка', err))
            .finally(() => setLoading(false));
    };

    return (
        <section className="register mb-4">
            <h1 className="mb-2">Регистрация</h1>

            <form onSubmit={handleSubmit}>
                {['first_name', 'last_name', 'email', 'password'].map(field => (
                    <div key={field} className="input-container">
                        <label htmlFor={field}>
                            {field === 'first_name' ? 'Имя' :
                                field === 'last_name' ? 'Фамилия' :
                                    field === 'email' ? 'E-mail' :
                                        'Пароль'}
                        </label>
                        <input
                            type={field === 'email' ? 'email' :
                                field === 'password' ? 'password' :
                                    'text'}
                            name={field}
                            id={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={field === 'first_name' ? 'Иван' :
                                field === 'last_name' ? 'Иванов' :
                                    field === 'email' ? 'your_email@example.com' :
                                        'paSSword1'}
                        />
                        {errors[field] && <p className="error">{errors[field]}</p>}
                    </div>
                ))}

                <div className="input-container">
                    <label htmlFor="role_id">Роль</label>
                    <select name="role_id" id="role_id" value={formData.role_id} onChange={handleChange}>
                        <option hidden selected>Выбрать</option>
                        {roles.map(role => (
                            role.name !== 'admin' && (
                                <option key={role.id} value={role.id}>
                                    {role.name === 'buyer' ? 'Покупатель' : 'Продавец'}
                                </option>
                            )
                        ))}
                    </select>
                    {errors.role_id && <p className="error">{errors.role_id}</p>}
                </div>

                <Button type="submit" disabled={loading}>{loading ? 'Загрузка...' : 'Зарегистрироваться'}</Button>
            </form>
        </section>
    )
}