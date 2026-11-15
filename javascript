
import React, { useState } from 'react';
import { supabase } from './supabase.js';

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
      setProducts([]);
      return;
    }

    setLoading(true);
    setMessage('');
    setProducts([]);

    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, location, image_url')
      .or(`name.ilike.%${term}%,description.ilike.%${term}%`)
      .limit(30);

    setLoading(false);

    if (error) {
      setMessage('Unable to search products. Please check the database connection.');
      console.error(error);
      return;
    }

    setProducts(data || []);

    if (!data || data.length === 0) {
      setMessage('No products found. Try another search.');
    }
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
          <p>Your marketplace for businesses and opportunities across Ghana.</p>

          <form onSubmit={searchProducts}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, e.g. Samsung..."
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </section>

        <section className="categories" id="products">
          <h2>Product Search Results</h2>

          {message && <p>{message}</p>}

          <div className="cards">
            {products.map((product) => (
              <article className="card" key={product.id}>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                )}

                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Price: GH₵ {product.price}</strong></p>
                <p>Location: {product.location}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="categories">
          <h2>Explore Ghana Business Hub</h2>

          <div className="cards">
            {['Businesses', 'Products', 'Services', 'Jobs', 'Properties', 'Advertisements'].map(item => (
              <article className="card" key={item}>
                <h3>{item}</h3>
                <p>Discover {item.toLowerCase()} across Ghana.</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Ghana Business Hub. Connecting Ghana.</p>
      </footer>
    </div>
  );
}
