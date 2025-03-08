import {useEffect, useState} from "react";
import Loader from "../Loader/Loader.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";

export default function Home({apiUrl}) {
    useEffect(() => {
        document.title = 'Главная';
    }, []);

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