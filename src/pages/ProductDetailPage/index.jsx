import { memo, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { apiUrl } from "../../utils/apiConfig";
import { useCart } from '../../context/CartContext';
import { normalizePrice } from "../../utils/normalizePrice";
import ProductImage404 from "../../public/images/products/product_404.jpeg";
import { Spinner } from "../../components/Spinner";

import styles from "./ProductDetail.module.css";

const ProductDetailPage = memo(() => {

    const { slug } = useParams();

    const [detailProductData, setDetailProductData] = useState();
    const [productNotFound, setProductNotFound] = useState(false);

        const { addToCart } = useCart();
        const [activeImage, setActiveImage] = useState(detailProductData?.product.images[0]);
        const [errorImage, setErrorImage] = useState([]);
    
        const handleAddToCart = useCallback((e) => {
            e.preventDefault();
            e.stopPropagation();
    
            const {
                id,
                name,
                price,
                original_price,
                description,
                category,
                in_stock,
                type
            } = detailProductData;
            
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

    useEffect(() => {
        
        const findProduct = async () => {

            const url = new URL(apiUrl + `/products/detail/${slug}`);
            const req = await fetch(url.href);
            const data = await req.json();

            if (req.status === 200) {
                setActiveImage(data.product.images[0])
                return setDetailProductData(data);
            }

            return setProductNotFound(true);
        }

        findProduct();
    }, []);

    if (!detailProductData) {
        return <Spinner />
    }

    console.log(detailProductData, activeImage);

    return (
        <div style={{ backgroundColor: 'white', width: '100vw', position: 'relative', minHeight: '65vh', padding: '100px 0 60px'}}>
            <div className="container" style={{ paddingTop: '40px'}}>
                <div className={styles.detail}>
                    <div className={styles.detail_images}>
                        <div className={styles.__sel_images}>
                            { detailProductData.product.images.map(image => (
                                <img src={image} onClick={() => setActiveImage(image) }/>
                            ))}
                        </div>
                        <img src={activeImage} />
                    </div>
                    <div className={styles.__data}>
                        <h3 className="product-card__name">{detailProductData.product.name}</h3>
                        <p className="product-card__description">{detailProductData.product.description}</p>
                        {/** Tags */}
                        <div className={styles.__tags}>
                            { detailProductData.product?.tags?.map(tag => (
                                <p key={tag}>
                                    { tag }
                                </p>
                            ))}
                        </div>
                        {/** Категории */}
                        <div className={styles.__categories}>
                            <div className={styles.__parameter}>
                                <p className='product-card__name'>Категории</p>
                                <div>{detailProductData.product.category_name ?? '-'}</div>
                            </div>
                        </div>

                        {/** Состав */}
                        <div className={styles.__components}>
                            <div className={styles.__parameter}>
                                <p className='product-card__name'>Компоненты</p>
                                <div className={styles.__content_components}>
                                    { detailProductData.components.length < 1 && (
                                        <p>Отсутствуют</p>
                                    ) }
                                    {detailProductData.components.map((component, componentId) => (
                                        <div key={component.name + "_" + componentId} className={styles.__component}>
                                            <img src={component.image} />
                                            <p>{component.name}</p>
                                            <p>{component.description}</p>
                                            <div className={styles.__quantity}>{component.image ? component.quantity : ''}</div>
                                        </div> 
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.__parameters}>
                            {/** Parameters */}
                            <div className={styles.__parameter}>
                                <p className='product-card__name'>Вес (гр)</p>
                                <p className="product-card__description">{detailProductData.product.weight ?? '-'}</p>
                            </div>
                            <div className={styles.__parameter}>
                                <p className='product-card__name'>Высота (мм)</p>
                                <p className="product-card__description">{detailProductData.product.height ?? '-'}</p>
                            </div>
                            <div className={styles.__parameter}>
                                <p className='product-card__name'>Количество</p>
                                <p className="product-card__description">{detailProductData.product.stock_quantity ?? '-'}</p>
                            </div>
                            <div className={styles.__parameter}>
                                <p className='product-card__name'>Продано</p>
                                <p className="product-card__description">{detailProductData.product.sales_count ?? '-'}</p>
                            </div>
                            <div className={styles.__parameter}>
                                <p className='product-card__name'>Цена</p>
                                <div className="current-price">{detailProductData.product.price ?? '-'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default ProductDetailPage;