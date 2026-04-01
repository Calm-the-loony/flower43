import { memo, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { apiUrl } from "../../utils/apiConfig";
import { useCart } from '../../context/CartContext';
import { normalizePrice } from "../../utils/normalizePrice";
import { Spinner } from "../../components/Spinner";

import styles from "./ProductDetail.module.css";

const ProductDetailPage = memo(() => {

    const { slug } = useParams();
    const [detailProductData, setDetailProductData] = useState();
    const [productNotFound, setProductNotFound] = useState(false);
    const { addToCart } = useCart();
    const [activeImage, setActiveImage] = useState();
    
    const handleAddToCart = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!detailProductData) return;

        const {
            product: {
                id,
                name,
                price,
                original_price,
                description,
                in_stock,
                type
            }
        } = detailProductData;
        
        addToCart({
            id,
            name,
            price: normalizePrice(price),
            image: activeImage,
            description,
            category: detailProductData.product.category_name,
            type
        });

        const button = e.currentTarget;
        button.classList.add('added');
        setTimeout(() => button.classList.remove('added'), 1000);
    }, [addToCart, detailProductData, activeImage]);

    useEffect(() => {
        const findProduct = async () => {
            try {
                const url = new URL(apiUrl + `/products/detail/${slug}`);
                const req = await fetch(url.href);
                const data = await req.json();

                if (req.status === 200) {
                    setActiveImage(data.product.images[0]);
                    setDetailProductData(data);
                } else {
                    setProductNotFound(true);
                }
            } catch (error) {
                setProductNotFound(true);
            }
        }

        findProduct();
    }, [slug]);

    if (!detailProductData) {
        return <Spinner />
    }

    if (productNotFound) {
        return (
            <div className={styles.productDetailPage}>
                <div className="container">
                    <div className={styles.notFound}>
                        <h2>Товар не найден</h2>
                        <p>К сожалению, запрашиваемый товар отсутствует или был удален.</p>
                    </div>
                </div>
            </div>
        );
    }

    const product = detailProductData.product;
    const isOnSale = product.original_price && product.original_price > product.price;

    return (
        <div className={styles.productDetailPage}>
            <div className="container">
                <div className={styles.detail}>
                    <div className={styles.detail_images}>
                        <div className={styles.__sel_images}>
                            {product.images.map((image, idx) => (
                                <img 
                                    key={idx}
                                    src={image} 
                                    onClick={() => setActiveImage(image)}
                                    className={activeImage === image ? styles.activeThumb : ''}
                                    alt={`${product.name} вид ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <div className={styles.mainImage}>
                            <img src={activeImage} alt={product.name} />
                            {isOnSale && (
                                <div className={styles.saleBadge}>
                                    скидка
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className={styles.__data}>
                        <div className={styles.productHeader}>
                            <h1 className={styles.productName}>{product.name}</h1>
                            {product.in_stock ? (
                                <div className={styles.stockBadge}>
                                    в наличии
                                </div>
                            ) : (
                                <div className={styles.stockBadgeOut}>
                                    нет в наличии
                                </div>
                            )}
                        </div>
                        
                        <p className={styles.productDescription}>{product.description}</p>
                        
                        {product.tags && product.tags.length > 0 && (
                            <div className={styles.__tags}>
                                {product.tags.map((tag, idx) => (
                                    <span key={idx} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <div className={styles.priceSection}>
                            <div className={styles.priceWrapper}>
                                {isOnSale ? (
                                    <>
                                        <div className={styles.currentPrice}>{product.price.toLocaleString()} ₽</div>
                                        <div className={styles.oldPrice}>{product.original_price.toLocaleString()} ₽</div>
                                    </>
                                ) : (
                                    <div className={styles.currentPrice}>{product.price.toLocaleString()} ₽</div>
                                )}
                            </div>
                            <button 
                                className={styles.addToCartBtn}
                                onClick={handleAddToCart}
                                disabled={!product.in_stock}
                            >
                                добавить в корзину
                            </button>
                        </div>

                        {product.category_name && (
                            <div className={styles.infoBlock}>
                                <div className={styles.infoHeader}>
                                    <h3>категория</h3>
                                </div>
                                <div className={styles.infoContent}>{product.category_name}</div>
                            </div>
                        )}

                        {detailProductData.components && detailProductData.components.length > 0 && (
                            <div className={styles.infoBlock}>
                                <div className={styles.infoHeader}>
                                    <h3>состав</h3>
                                </div>
                                <div className={styles.__content_components}>
                                    {detailProductData.components.map((component, componentId) => (
                                        <div key={component.name + "_" + componentId} className={styles.__component}>
                                            {component.image && (
                                                <img src={component.image} alt={component.name} />
                                            )}
                                            <div className={styles.componentInfo}>
                                                <p className={styles.componentName}>{component.name}</p>
                                                <p className={styles.componentDesc}>{component.description}</p>
                                                {component.quantity && (
                                                    <div className={styles.componentQuantity}>{component.quantity}</div>
                                                )}
                                            </div>
                                        </div> 
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.parametersGrid}>
                            {product.weight && (
                                <div className={styles.parameter}>
                                    <div className={styles.parameterLabel}>вес</div>
                                    <div className={styles.parameterValue}>{product.weight} г</div>
                                </div>
                            )}
                            {product.height && (
                                <div className={styles.parameter}>
                                    <div className={styles.parameterLabel}>высота</div>
                                    <div className={styles.parameterValue}>{product.height} мм</div>
                                </div>
                            )}
                            <div className={styles.parameter}>
                                <div className={styles.parameterLabel}>в наличии</div>
                                <div className={styles.parameterValue}>{product.stock_quantity ?? 0} шт</div>
                            </div>
                            {product.sales_count > 0 && (
                                <div className={styles.parameter}>
                                    <div className={styles.parameterLabel}>продано</div>
                                    <div className={styles.parameterValue}>{product.sales_count} шт</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default ProductDetailPage;