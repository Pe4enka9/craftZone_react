import {Link} from "react-router-dom";

export default function ProductCard({product}) {
    return (
        <Link to={`/product/${product.id}`} className="card">
            <div className="card-img"></div>
            <div className="card-body">
                <h3>{product.title}</h3>
                <p>Категория: {product.category}</p>
                <p>{product.price} &#8381;</p>
                <p>Рейтинг: {!product.rating ? 'Нет рейтинга' : product.rating.toFixed(1)}</p>
            </div>
        </Link>
    )
}