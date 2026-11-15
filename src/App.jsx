
import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { supabase } from '../supabase.js';

export default function App() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function searchProducts(event) {
    event.preventDefault();

    const term = search.trim();

    if (!term) {
      setMessage('Please enter a product name.');
      return;
    }

    setLoading(true);
    setMessage('');

    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, location, image_url')
      .ilike('name', `%${term}%`)
      .limit(30);

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage('Search failed. Please check the database connection.');
      return;
    }

    setProducts(data || []);
    setMessage(data.length ? '' : 'No products found. Try another search.');
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🇬🇭 Ghana Business Hub</h1>
        <p>Connecting Ghanaian businesses, buyers and sellers.</p>
      </header>

      <nav className="navigation">
        <a href="#home">Home</a>
        <a href="#businesses">Businesses</a>
        <a href="#products">Products</a>
        <a href="#services">Services</a>
        <a href="#jobs">Jobs</a>
        <a href="#properties">Properties</a>
      </nav>

      <main id="home">
        <section className="hero">
          <h2>Discover. Connect. Grow.</h2>
          <p>Your marketplace for opportunities across Ghana.</p>

          <form onSubmit={searchProducts}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products, e.g. Samsung..."
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </section>

        <section className="categories" id="products">
          <h2>Products</h2>
          {message && <p>{message}</p>}

          <div className="cards">
            {products.map(product => (
              <article className="card" key={product.id}>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                )}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>GH₵ {product.price}</strong></p>
                <p>{product.location}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Ghana Business Hub. Connecting Ghana.</p>
      </footer>
      <Analytics />
    </div>
  );
}
