import './styles/main.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchProducts } from './store/slices/productsSlice';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector(state => state.ui.isMenuOpen);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <h1 hidden>Product Catalog</h1>
      <Navbar />

      {!isMenuOpen && (
        <main className="main">
          <Outlet />
        </main>
      )}

      {!isMenuOpen && <Footer />}
    </div>
  );
};
