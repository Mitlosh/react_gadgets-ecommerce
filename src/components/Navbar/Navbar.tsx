import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import Logo from '../../assets/icons/Logo.svg';
import burgerMenu from '../../assets/icons/burger.svg';
import heart from '../../assets/icons/heart.svg';
import cartIcon from '../../assets/icons/cart.svg';

import styles from './Navbar.module.scss';
import { BurgerMenu } from '../BurgerMenu';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsMenuOpen } from '../../store/slices/uiSlice';

const menuLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const isMenuOpen = useAppSelector(state => state.ui.isMenuOpen);
  const favorites = useAppSelector(state => state.favorites);
  const cart = useAppSelector(state => state.cart);

  const toggleMenu = () => dispatch(setIsMenuOpen(!isMenuOpen));
  const closeMenu = () => dispatch(setIsMenuOpen(false));

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navbar}>
          <div className={styles.navbar__top}>
            <Link to="/">
              <img src={Logo} alt="logo" className={styles.navbar__logo} />
            </Link>

            <ul className={styles.menuList}>
              {menuLinks.map(({ to, label }) => (
                <li key={label} className={styles.menuList__item}>
                  <NavLink
                    to={to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      classNames(styles.menuList__link, {
                        [styles.active]: isActive,
                      })
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.navbarIcons}>
            <NavLink
              to={'/favorites'}
              aria-label="Favourites"
              className={`${styles.navbarIcons__item} ${styles.navbarIcons__item_heart}`}
            >
              <img
                src={heart}
                className={styles.navbarIcons__icon}
                alt="Favorites"
              />
              {favorites.length > 0 && (
                <span className={styles.navbarIcons__amount}>
                  {favorites.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to={'/cart'}
              aria-label="Cart"
              className={styles.navbarIcons__item}
            >
              <img
                src={cartIcon}
                className={styles.navbarIcons__icon}
                alt="Cart"
              />
              {cart.length > 0 && (
                <span className={styles.navbarIcons__amount}>
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>

          <button
            className={`${styles.navbarIcons__item} ${styles.burger}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img src={burgerMenu} alt="Open menu" />
          </button>

          {isMenuOpen && (
            <BurgerMenu
              menuLinks={menuLinks}
              closeMenu={closeMenu}
              isMenuOpen={isMenuOpen}
            />
          )}
        </nav>
      </div>
    </header>
  );
};
