import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../Loader/Loader.jsx";

export default function OneProduct({apiUrl}) {
    const {id} = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`${apiUrl}/products/${id}`)
            .then(res => res.json())
            .then(product => setProduct(product))
            .catch(err => console.error('Ошибка', err))
            .finally(() => setLoading(false));
    }, [apiUrl, id]);

    return (
        <section className="product">
            <Loader loading={loading}/>

            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Категория: {product.category}</p>
            <p>{product.price} &#8381;</p>
            <p>Рейтинг: {!product.rating ? 'Нет рейтинга' : product.rating.toFixed(1)}</p>
            <p>Осталось товара: {product.quantity} шт.</p>
            <p>Продавец: {product.seller}</p>
        </section>
    )
}