/**
 * Price — Value Object (DDD)
 * TCC: USP ESALQ 2026 — Allan Felipe Sales Menezes
 *
 * Encapsula toda regra de negócio relacionada a preço.
 * Campo privado (#value) + Object.freeze() garantem imutabilidade real.
 * A camada visual nunca formata ou calcula preços — apenas chama price.formatted.
 */
export class Price {
  #value;

  constructor(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Preço deve ser um número válido');
    }
    if (value < 0) {
      throw new Error('Preço não pode ser negativo');
    }
    this.#value = value;
    Object.freeze(this); // imutabilidade garantida pelo runtime
  }

  /** Formata em Real Brasileiro via Intl nativo (sem dependência externa) */
  get formatted() {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.#value);
  }

  get rawValue() {
    return this.#value;
  }

  /** Composição: retorna NOVO Price — não muta o atual */
  add(other) {
    return new Price(this.#value + other.rawValue);
  }

  multiply(n) {
    return new Price(this.#value * n);
  }

  isGreaterThan(other) {
    return this.#value > other.rawValue;
  }

  /**
   * Igualdade por valor — característica central de um Value Object (Evans, 2003).
   * Dois Price são iguais quando encapsulam o mesmo valor, independente da
   * referência de objeto (ao contrário de uma Entidade, comparada por identidade).
   */
  equals(other) {
    return other instanceof Price && this.#value === other.rawValue;
  }
}
