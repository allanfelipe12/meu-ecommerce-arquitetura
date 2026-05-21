/**
 * CartDrawer — Dumb Component
 * TCC: USP ESALQ 2026 — Allan Felipe Sales Menezes
 *
 * Componente puramente visual — não contém nenhuma lógica de negócio.
 * Toda lógica está no hook useCart (Custom Hook pattern).
 */
import { Price } from '../domain/Price';

export function CartDrawer({ cart, open, onClose }) {
  const frete = cart.total.isGreaterThan(new Price(299))
    ? new Price(0)
    : new Price(29.90);

  return (
    <>
      <div
        className={`cart-overlay${open ? ' open' : ''}`}
        onClick={onClose}
      />
      <aside className={`cart-drawer${open ? ' open' : ''}`} aria-label="Carrinho de compras">
        <div className="cart-header">
          <span className="cart-title">🛒 Carrinho ({cart.count})</span>
          <button className="cart-close" onClick={onClose} aria-label="Fechar carrinho">✕</button>
        </div>

        <div className="cart-body">
          {cart.items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p style={{ fontWeight: 500 }}>Carrinho vazio</p>
              <p style={{ fontSize: 13 }}>Adicione produtos para começar</p>
            </div>
          ) : (
            cart.items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">{item.emoji}</div>
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-cat">{item.category}</p>
                  <div className="cart-item-actions">
                    <button className="qty-btn" onClick={() => cart.updateQty(item.id, -1)}>−</button>
                    <span className="qty-num">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => cart.updateQty(item.id, +1)}>+</button>
                    <button className="cart-remove" onClick={() => cart.removeItem(item.id)}>🗑</button>
                  </div>
                </div>
                {/* price.multiply() — Value Object compõe sem mutar */}
                <span className="cart-item-price">
                  {item.price.multiply(item.quantity).formatted}
                </span>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-row">
                <span>Subtotal</span>
                <span>{cart.total.formatted}</span>
              </div>
              <div className="cart-row">
                <span>Frete</span>
                <span style={{ color: frete.rawValue === 0 ? '#10B981' : 'inherit' }}>
                  {frete.rawValue === 0 ? 'Grátis 🎉' : frete.formatted}
                </span>
              </div>
              {frete.rawValue === 0 && (
                <p style={{ fontSize: 11, color: '#10B981', textAlign: 'right' }}>
                  Frete grátis acima de R$ 299,00!
                </p>
              )}
              {/* cart.total.add(frete) — composição de Value Objects */}
              <div className="cart-row total">
                <span>Total</span>
                <span>{cart.total.add(frete).formatted}</span>
              </div>
            </div>
            <button className="checkout-btn">
              Finalizar Compra →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
