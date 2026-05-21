/**
 * useCart — Custom Hook (orquestrador de domínio)
 * TCC: USP ESALQ 2026 — Allan Felipe Sales Menezes
 *
 * Extrai toda a lógica de estado e regra de negócio do componente visual.
 * O componente CartDrawer torna-se um "dumb component" — apenas exibe dados.
 * Reutilizável: o mesmo hook serve o carrinho e a tela de checkout.
 */
import { useState, useMemo, useCallback } from 'react';
import { Price } from '../domain/Price';

export function useCart() {
  const [items, setItems] = useState([]);

  /** Adiciona item ou incrementa quantidade se já existir */
  const addItem = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  /** Remove item pelo id */
  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  /** Altera quantidade; remove automaticamente se chegar a 0 */
  const updateQty = useCallback((id, delta) => {
    setItems(prev =>
      prev
        .map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  }, []);

  /**
   * Total calculado no domínio via Value Object Price.
   * useMemo garante que só recalcula quando items muda.
   * price.multiply() e price.add() retornam novos Price (imutável).
   */
  const total = useMemo(() =>
    items.reduce(
      (acc, item) => acc.add(item.price.multiply(item.quantity)),
      new Price(0)
    ),
    [items]
  );

  const count = useMemo(() =>
    items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  return { items, addItem, removeItem, updateQty, total, count };
}
