# NEXO Store — E-commerce TCC

**USP ESALQ 2026 — Allan Felipe Sales Menezes**  
Estudo de caso: *Aplicação de Padrões de Projeto no Desenvolvimento Front-end com React*

---

## Sobre

E-commerce completo que demonstra na prática os 3 padrões de projeto estudados no TCC:

| Padrão | Arquivo | Conceito |
|--------|---------|---------|
| **Value Object (DDD)** | `src/domain/Price.js` | Campo privado `#value` + `Object.freeze()` |
| **Custom Hook** | `src/hooks/useCart.js` | `useMemo` + `useCallback` + separação de domínio |
| **Composition Pattern** | `src/components/Card/index.jsx` | `createContext` + slots independentes + OCP |

---

## Como rodar

```bash
# 1. Clone o repositório
git clone https://github.com/allanfelipe12/nexo-ecommerce

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse http://localhost:5173
```

---

## Estrutura de pastas (baseada em DDD)

```
src/
├── domain/           # Regras de negócio puras
│   └── Price.js      # Value Object — imutável, encapsulado
├── hooks/            # Custom Hooks (orquestradores de domínio)
│   └── useCart.js    # Estado + lógica do carrinho
├── components/       # UI Components (Composition Pattern)
│   ├── Card/
│   │   ├── index.jsx # Card.Root, Card.Image, Card.Price...
│   │   └── Card.css
│   └── CartDrawer.jsx
├── assets/
│   └── products.js   # Dados dos produtos
├── App.jsx
├── App.css
└── main.jsx
```

---

## Tecnologias

- **React 18** com Vite
- **JavaScript ES2022** (campos privados `#`)
- **Padrões aplicados:** DDD, Custom Hooks, Composition Pattern, OCP
- **Sem dependências externas** de UI — apenas React puro

---

## Referências

- EVANS, Eric. *Domain-Driven Design.* Addison-Wesley, 2003.
- GAMMA et al. *Design Patterns.* Addison-Wesley, 1995.
- MARTIN, Robert C. *Clean Architecture.* Alta Books, 2019.
- [React Docs](https://react.dev)
