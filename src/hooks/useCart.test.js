/**
 * Testes do Custom Hook useCart
 * TCC: USP ESALQ 2026 — Allan Felipe Sales Menezes
 *
 * Demonstra que a lógica de domínio isolada no hook é testável de forma
 * independente da UI — evidência concreta do argumento de "testabilidade"
 * defendido no trabalho. Usa renderHook para exercitar o hook sem montar
 * nenhum componente visual.
 */
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';
import { Price } from '../domain/Price';

const produto = (id, valor) => ({
  id,
  name: `Produto ${id}`,
  price: new Price(valor),
});

describe('useCart — estado inicial', () => {
  it('começa vazio, com total zero e contagem zero', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.total.rawValue).toBe(0);
  });
});

describe('useCart — adição de itens', () => {
  it('adiciona um produto novo com quantidade 1', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(produto(1, 100)));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.count).toBe(1);
  });

  it('incrementa a quantidade ao adicionar um produto já existente', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(produto(1, 100)));
    act(() => result.current.addItem(produto(1, 100)));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.count).toBe(2);
  });
});

describe('useCart — remoção e quantidade', () => {
  it('removeItem retira o produto pelo id', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(produto(1, 100)));
    act(() => result.current.removeItem(1));
    expect(result.current.items).toEqual([]);
  });

  it('updateQty incrementa e decrementa a quantidade', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(produto(1, 100)));
    act(() => result.current.updateQty(1, +2));
    expect(result.current.items[0].quantity).toBe(3);
    act(() => result.current.updateQty(1, -1));
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('updateQty remove o item automaticamente quando a quantidade chega a 0', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(produto(1, 100)));
    act(() => result.current.updateQty(1, -1));
    expect(result.current.items).toEqual([]);
  });
});

describe('useCart — total calculado no domínio (Value Object Price)', () => {
  it('total é uma instância de Price', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(produto(1, 100)));
    expect(result.current.total).toBeInstanceOf(Price);
  });

  it('soma preço × quantidade de múltiplos produtos', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(produto(1, 100))); // 1 × 100
    act(() => result.current.addItem(produto(2, 50)));  // 1 × 50
    act(() => result.current.updateQty(1, +1));         // 2 × 100
    // total = 200 + 50 = 250
    expect(result.current.total.rawValue).toBe(250);
  });
});
