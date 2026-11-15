import React from 'react';

export default function App() {
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
          <input placeholder="Search products, businesses or services..." />
          <button>Search</button>
        </section>

        <section className="categories">
          <h2>Explore Ghana Business Hub</h2>
          <div className="cards">
            {['Businesses', 'Products', 'Services', 'Jobs', 'Properties', 'Advertisements'].map(item => (
              <article className="card" key={item}>
                <h3>{item}</h3>
                <p>Discover {item.toLowerCase()} across Ghana.</p>
                <button>Explore</button>
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
