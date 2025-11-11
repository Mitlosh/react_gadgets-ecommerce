import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFavorites } from '../../store/slices/favoritesSlice';
import { setCart } from '../../store/slices/cartSlice';

type Props = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = false,
}) => {
  const cart = useAppSelector(state => state.cart);
  const favorites = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();

  // --- FAVORITES LOGIC ---
  const isInFavorites = () => {
    return favorites.some(fav => fav.id === product.id);
  };

  const toggleFavoritesItem = () => {
    const newFavorites = isInFavorites()
      ? favorites.filter(fav => fav.id !== product.id)
      : [...favorites, product];

    dispatch(setFavorites(newFavorites));
  };

  // --- CART LOGIC ---
  const isInCart = () => {
    return cart.some(item => item.id === product.id);
  };

  const toggleCartItem = () => {
    if (isInCart()) {
      dispatch(setCart(cart.filter(item => item.id !== product.id)));
    } else {
      dispatch(setCart([...cart, { ...product, quantity: 1 }]));
    }
  };

  const { name, category, capacity, fullPrice, price, screen, ram, image } =
    product;

  return (
    <div className={styles.productCard}>
      <Link
        to={`/${category}/${product.itemId}`}
        className={styles.productCard__image}
      >
        <img src={`/${image}`} alt={name} />
      </Link>

      <p className={`${styles.productCard__title} body-text`}>{name}</p>

      <div className={styles.productCard__prices}>
        <h3 className={styles.productCard__price}>${price}</h3>
        {showFullPrice && (
          <h3 className={styles.productCard__fullPrice}> ${fullPrice}</h3>
        )}
      </div>

      <div className={styles.productCard__divider}></div>

      <div className={styles.productCard__features}>
        <p className={styles.productCard__item}>
          <span className={styles.productCard__property}>Screen:</span>
          <span className={styles.productCard__value}>{screen}</span>
        </p>
        <p className={styles.productCard__item}>
          <span className={styles.productCard__property}>Capacity:</span>
          <span className={styles.productCard__value}>{capacity}</span>
        </p>
        <p className={styles.productCard__item}>
          <span className={styles.productCard__property}>RAM:</span>
          <span className={styles.productCard__value}>{ram}</span>
        </p>
      </div>

      <div className={styles.productCard__buttons}>
        <button
          className={classNames(
            styles.productCard__addToCart,
            isInCart() && styles.productCard__addToCart_active,
          )}
          onClick={() => toggleCartItem()}
        >
          {isInCart() ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={classNames(
            styles.productCard__addToFavorites,
            isInFavorites() && styles.productCard__addToFavorites_active,
          )}
          onClick={() => toggleFavoritesItem()}
        ></button>
      </div>
    </div>
  );
};
