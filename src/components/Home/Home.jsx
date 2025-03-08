import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../Loader/Loader.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";

export default function Home({apiUrl, token}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Главная';

        token === '' && navigate('/login');
    }, [navigate, token]);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`${apiUrl}/products`)
            .then(res => res.json())
            .then(products => setProducts(products.data))
            .catch(err => console.error('Ошибка', err))
            .finally(() => setLoading(false));
    }, [apiUrl]);

    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <section className="home">
            <Loader loading={loading}/>

            <div className="products">
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </section>
    )
}