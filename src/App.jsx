/**
 * App.jsx — Componente raiz
 * TCC: USP ESALQ 2026 — Allan Felipe Sales Menezes
 *
 * Demonstração dos 3 padrões aplicados em conjunto:
 *   1. Price (Value Object / DDD)
 *   2. useCart (Custom Hook)
 *   3. Card.Root / Card.* (Composition Pattern)
 */
import { useState, useMemo, useCallback } from 'react';
import { useCart } from './hooks/useCart';
import { Card } from './components/Card';
import { CartDrawer } from './components/CartDrawer';
import { SobrePage } from './components/SobrePage';
import { PRODUCTS, FILTERS } from './assets/products';
import './App.css';

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

export default function App() {
  // ── Custom Hook: toda lógica do carrinho isolada aqui ──
  const cart = useCart();

  const [cartOpen, setCartOpen]   = useState(false);
  const [filter, setFilter]       = useState('Todos');
  const [addedIds, setAddedIds]   = useState({});
  const [page, setPage]           = useState('home'); // 'home' | 'sobre'

  const filtered = useMemo(() => {
    if (filter === 'Todos') return PRODUCTS;
    if (filter === 'Novidades') return PRODUCTS.filter(p => p.isNew);
    if (filter === 'Ofertas') return PRODUCTS.filter(p => p.sale);
    return PRODUCTS.filter(p => p.tags.includes(filter));
  }, [filter]);

  const handleAdd = useCallback((product) => {
    cart.addItem(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [product.id]: false })), 1200);
    showToast(`✓  ${product.name} adicionado ao carrinho`);
  }, [cart]);

  // ── Navegação: cada link do menu tem um destino real ──
  const goInicio = useCallback((e) => {
    e?.preventDefault();
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToProducts = useCallback((novoFiltro) => (e) => {
    e?.preventDefault();
    setPage('home');
    setFilter(novoFiltro);
    // aguarda a home montar (caso viesse da página Sobre) antes de rolar
    setTimeout(() => {
      document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  }, []);

  const goSobre = useCallback((e) => {
    e?.preventDefault();
    setPage('sobre');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <a className="logo" href="#" onClick={goInicio}>NEX<span>O</span></a>
        <ul className="nav-links">
          <li><a href="#" onClick={goInicio}>Início</a></li>
          <li><a href="#" onClick={goToProducts('Todos')}>Coleções</a></li>
          <li><a href="#" onClick={goToProducts('Novidades')}>Novidades</a></li>
          <li><a href="#" onClick={goSobre}>Sobre</a></li>
        </ul>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          🛒 Carrinho
          {cart.count > 0 && <span className="cart-badge">{cart.count}</span>}
        </button>
      </nav>

      {page === 'sobre' ? (
        <SobrePage onBack={goInicio} />
      ) : (
       <>
      {/* ── HERO ── */}
      <section className="hero">
        <div>
          <p className="hero-eyebrow">Nova coleção · 2026</p>
          <h1 className="hero-title">
            Tecnologia que<br /><em>transforma</em><br />seu estilo.
          </h1>
          <p className="hero-sub">
            Eletrônicos, wearables e acessórios selecionados para quem não abre
            mão de performance e design. Curadoria enxuta, entrega rápida e
            frete grátis nas compras acima de R$ 299.
          </p>
          <div className="hero-actions">
            <button className="hero-cta" onClick={goToProducts('Todos')}>
              Ver produtos →
            </button>
            <a className="hero-cta-ghost" href="#sobre" onClick={goSobre}>
              Conhecer o projeto
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">8+</div>
              <div className="stat-label">Produtos</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">DDD</div>
              <div className="stat-label">Arquitetura</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-label">React 18</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-visual">🛍️</div>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <div className="filters">
        <span className="filter-label">Filtrar:</span>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── PRODUCTS — Composition Pattern ── */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">
            {filter === 'Todos' ? 'Todos os Produtos' : filter}
          </h2>
          <span className="section-count">
            {filtered.length} produto{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="products-grid">
          {filtered.map(p => (
            <Card.Root key={p.id} product={p} onAdd={handleAdd} added={!!addedIds[p.id]}>
              <Card.Badges />
              <Card.Image />
              <div className="card-body">
                <Card.Category />
                <Card.Title />
                <Card.Rating />
                <div className="card-footer">
                  <Card.Price />
                  <Card.Actions />
                </div>
              </div>
            </Card.Root>
          ))}
        </div>
      </section>

       </>
      )}

      <footer>
        <p>NEXO Store — TCC <span>USP · ESALQ 2026</span> — Allan Felipe Sales Menezes</p>
        <p>React 18 · DDD · Custom Hooks · Composition Pattern · Value Object Price</p>
      </footer>

      <div id="toast" className="toast" />

      {/* ── CART DRAWER — dumb component, toda lógica no useCart ── */}
      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
