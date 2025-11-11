import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import closeMenuIcon from '../../assets/icons/close.svg';
import heart from '../../assets/icons/heart.svg';
import cartIcon from '../../assets/icons/cart.svg';
import Logo from '../../assets/icons/Logo.svg';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';

type Props = {
  closeMenu: () => void;
  menuLinks: { to: string; label: string }[];
  isMenuOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({
  closeMenu,
  menuLinks,
  isMenuOpen,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const favorites = useAppSelector(state => state.favorites);
  const cart = useAppSelector(state => state.cart);

  useEffect(() => {
    if (isMenuOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);

      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={classNames(styles.menu, {
        [styles.open]: isMenuOpen,
      })}
    >
      <div className={styles.menu__top}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <button onClick={closeMenu} className={styles.closeButton}>
          <img
            src={closeMenuIcon}
            className={styles.menu__icon}
            alt="Close menu"
          />
        </button>
      </div>

      <ul className={styles.menu__list}>
        {menuLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.menu__footer}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            classNames(styles.menu__footer_link, {
              [styles.active]: isActive,
            })
          }
          onClick={closeMenu}
        >
          <img src={heart} className={styles.menu__icon} alt="Favourites" />
          {favorites.length > 0 && (
            <span className={styles.menu__counter}>{favorites.length}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.menu__footer_link, {
              [styles.active]: isActive,
            })
          }
          onClick={closeMenu}
        >
          <img src={cartIcon} className={styles.menu__icon} alt="Cart" />
          {cart.length > 0 && (
            <span className={styles.menu__counter}>{cart.length}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
