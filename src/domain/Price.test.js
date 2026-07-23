/**
 * Testes do Value Object Price
 * TCC: USP ESALQ 2026 — Allan Felipe Sales Menezes
 *
 * Valida as características que definem um Value Object (Evans, 2003):
 * validação na criação, imutabilidade, composição sem mutação e
 * igualdade por valor.
 */
import { describe, it, expect } from 'vitest';
import { Price } from './Price';

describe('Price — validação na criação', () => {
  it('cria um Price com valor numérico válido', () => {
    expect(new Price(100).rawValue).toBe(100);
    expect(new Price(0).rawValue).toBe(0);
  });

  it('rejeita valores não numéricos', () => {
    expect(() => new Price('100')).toThrow('Preço deve ser um número válido');
    expect(() => new Price(NaN)).toThrow('Preço deve ser um número válido');
    expect(() => new Price(undefined)).toThrow('Preço deve ser um número válido');
  });

  it('rejeita valores negativos', () => {
    expect(() => new Price(-1)).toThrow('Preço não pode ser negativo');
  });
});

describe('Price — imutabilidade', () => {
  it('a instância é congelada (Object.freeze)', () => {
    expect(Object.isFrozen(new Price(50))).toBe(true);
  });

  it('add() retorna um NOVO Price sem mutar o original', () => {
    const a = new Price(100);
    const b = a.add(new Price(50));
    expect(b.rawValue).toBe(150);
    expect(a.rawValue).toBe(100); // original intacto
    expect(b).not.toBe(a);
  });

  it('multiply() retorna um NOVO Price sem mutar o original', () => {
    const a = new Price(10);
    const b = a.multiply(3);
    expect(b.rawValue).toBe(30);
    expect(a.rawValue).toBe(10);
  });
});

describe('Price — formatação', () => {
  it('formata em Real Brasileiro (BRL)', () => {
    const formatted = new Price(899.9).formatted;
    // Intl usa espaço não separável (NBSP) entre R$ e o número
    expect(formatted).toMatch(/^R\$\s?899,90$/);
  });
});

describe('Price — comparação', () => {
  it('isGreaterThan compara por valor', () => {
    expect(new Price(300).isGreaterThan(new Price(299))).toBe(true);
    expect(new Price(100).isGreaterThan(new Price(299))).toBe(false);
  });

  it('equals é verdadeiro para o mesmo valor (igualdade por valor, não por referência)', () => {
    expect(new Price(100).equals(new Price(100))).toBe(true);
  });

  it('equals é falso para valores diferentes', () => {
    expect(new Price(100).equals(new Price(200))).toBe(false);
  });

  it('equals é falso quando comparado com algo que não é Price', () => {
    expect(new Price(100).equals(100)).toBe(false);
    expect(new Price(100).equals(null)).toBe(false);
    expect(new Price(100).equals({ rawValue: 100 })).toBe(false);
  });
});
