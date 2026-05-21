/**
 * Card — Composition Pattern
 * TCC: USP ESALQ 2026 — Allan Felipe Sales Menezes
 *
 * Elimina prop drilling e aplica o Open/Closed Principle (OCP).
 * O componente base (Card.Root) nunca é alterado — novas variações
 * são compostas diretamente na tela de destino.
 *
 * Uso:
 *   <Card.Root product={p} onAdd={addItem} added={false}>
 *     <Card.Badges />
 *     <Card.Image />
 *     <Card.Title />
 *     <Card.Price />
 *     <Card.Actions />
 *   </Card.Root>
 */
import { createContext, useContext } from 'react';
import './Card.css';

const CardCtx = createContext(null);

/** Root: provedor do contexto — único ponto de entrada de dados */
function Root({ product, children, onAdd, added }) {
  return (
    <CardCtx.Provider value={{ product, onAdd, added }}>
      <article className="card-root">{children}</article>
    </CardCtx.Provider>
  );
}

/** Badges: Sale, Novo, Hot — lê do contexto, sem props */
const Badges = () => {
  const { product } = useContext(CardCtx);
  return (
    <div className="card-badge-wrap">
      {product.sale   && <span className="badge badge-sale">Oferta</span>}
      {product.isNew  && <span className="badge badge-new">Novo</span>}
      {product.hot    && <span className="badge badge-hit">Top</span>}
    </div>
  );
};

/** Image: renderiza emoji/imagem do produto */
const Image = () => {
  const { product } = useContext(CardCtx);
  return (
    <div className="card-image" style={{ background: product.bg }}>
      <span>{product.emoji}</span>
    </div>
  );
};

const Category = () => {
  const { product } = useContext(CardCtx);
  return <p className="card-category">{product.category}</p>;
};

const Title = () => {
  const { product } = useContext(CardCtx);
  return (
    <>
      <p className="card-title">{product.name}</p>
      <p className="card-subtitle">{product.subtitle}</p>
    </>
  );
};

const Rating = () => {
  const { product } = useContext(CardCtx);
  const full = Math.floor(product.rating);
  return (
    <div className="card-rating">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`star${i > full ? ' empty' : ''}`}>★</span>
      ))}
      <span className="rating-count">({product.reviews})</span>
    </div>
  );
};

/**
 * Price: usa price.formatted do Value Object — nunca formata aqui.
 * Separação de responsabilidades: UI apenas exibe, domínio formata.
 */
const Price = () => {
  const { product } = useContext(CardCtx);
  return (
    <div className="card-price-wrap">
      {product.oldPrice && (
        <span className="card-price-old">{product.oldPrice.formatted}</span>
      )}
      <span className="card-price">{product.price.formatted}</span>
    </div>
  );
};

/** Actions: botão de adicionar ao carrinho */
const Actions = () => {
  const { onAdd, added, product } = useContext(CardCtx);
  return (
    <button
      className={`add-btn${added ? ' added' : ''}`}
      onClick={(e) => { e.stopPropagation(); onAdd(product); }}
      aria-label={`Adicionar ${product.name} ao carrinho`}
    >
      {added ? '✓' : '+'}
    </button>
  );
};

/** API pública composta — intencional e auto-documentada */
export const Card = { Root, Badges, Image, Category, Title, Rating, Price, Actions };
