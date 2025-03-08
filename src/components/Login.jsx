import {useEffect, useState} from "react";
import Button from "./Button/Button.jsx";
import {useNavigate} from "react-router-dom";

export default function Login({apiUrl, token, setToken}) {
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = 'Авторизация';
        
        token !== '' && navigate('/'); 
    }, [navigate, token]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
        setAuthError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then(res => res.status === 401 ? setAuthError(true) : res.json())
            .then(data => {
                if (!data.errors) {
                    setFormData({email: '', password: ''});
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    navigate('/');
                } else {
                    setErrors(data.errors);
                }
            })
            .catch(err => console.error('Ошибка', err))
            .finally(() => setLoading(false));
    };

    return (
        <section className="login mb-4">
            <h1 className="mb-2">Авторизация</h1>

            <form onSubmit={handleSubmit}>
                {['email', 'password'].map(field => (
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

                {authError && <p className="error">Неверный логин или пароль</p>}

                <Button type="submit" disabled={loading}>{loading ? 'Загрузка...' : 'Войти'}</Button>
            </form>
        </section>
    )
}