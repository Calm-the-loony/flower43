import { memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { useCart } from '../../context/CartContext';
import { normalizePrice } from "../../utils/normalizePrice";
import styles from "./DetailFlower.module.css";
import CloseIcon from "../../public/images/products/close.svg";
import ProductImage404 from "../../public/images/products/product_404.jpeg";

export const DetailFlowerModal = memo(({ typeFlower, product, handleClose }) => {
    
    const { addToCart } = useCart();
    const [activeImage, setActiveImage] = useState(product.images[0]);
    const [errorImage, setErrorImage] = useState([]);

    const handleAddToCart = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        const {
            id,
            name,
            price,
            original_price,
            images,
            description,
            category,
            in_stock,
            type
        } = product;
        
        addToCart({
            id,
            name,
            price: normalizePrice(price),
            image: activeImage,
            description,
            category: category?.name || category,
            type
        });

        const button = e.currentTarget;
        button.classList.add('added');
        setTimeout(() => button.classList.remove('added'), 1000);
  }, [addToCart]);

    return (
        <div className={styles.detailFlower}>
            <div className={styles.__header}>
                <h3>{typeFlower}</h3>
                <button onClick={handleClose}>
                    <img src={CloseIcon} />
                </button>
            </div>
            <div className={styles.__body}>
                <div className={styles.__images}>
                    <div className={styles.__list_images}>
                        { product.images.map(image => (
                            <img src={errorImage.includes(image) ? ProductImage404 : image} alt={product.name} aria-label={product.name} onClick={() => setActiveImage(image)} onError={() => setErrorImage(state => [...state, image]) }/>
                        ) )}
                    </div>
                    <img src={errorImage.includes(activeImage) ? ProductImage404 : activeImage} />
                </div>
                <div className={styles.__content}>
                    <h3 className="product-card__name">{product.name}</h3>
                    <p className="product-card__description">{product.description}</p>

                    {/** Tags */}
                    <div className={styles.__tags}>
                        { product?.tags?.map(tag => (
                            <p key={tag}>
                                { tag }
                            </p>
                        ))}
                    </div>

                    <div className={styles.__parameters}>
                        {/** Parameters */}
                        <div className={styles.__parameter}>
                            <p className='product-card__name'>Вес (гр)</p>
                            <p className="product-card__description">{product.weight ?? '-'}</p>
                        </div>
                        <div className={styles.__parameter}>
                            <p className='product-card__name'>Высота (мм)</p>
                            <p className="product-card__description">{product.height ?? '-'}</p>
                        </div>

                        <div className={styles.__parameter}>
                            <p className='product-card__name'>Цена</p>
                            <div className="current-price">{product.price ?? '-'}</div>
                        </div>
                    </div>

                    <div className={styles.__btn}>
                        <button className='add-to-cart-btn' onClick={handleAddToCart}>В Корзину</button>
                        <button className='add-to-cart-btn'>
                            <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'white' }}>Детальная страница</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
});