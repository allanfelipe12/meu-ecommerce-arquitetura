/**
 * SobrePage — Página dedicada "Sobre o projeto"
 * TCC: USP ESALQ 2026 — Allan Felipe Sales Menezes
 *
 * Página separada da loja (não é uma seção rolável).
 * Apresenta a fundamentação acadêmica e os três padrões aplicados.
 */
const PATTERNS = [
  {
    icon: '🧩',
    tag: 'DDD',
    title: 'Value Object',
    file: 'domain/Price.js',
    desc: 'A classe Price concentra validação, formatação e cálculo de preços. Imutável via Object.freeze() e com campo privado #value — a interface nunca formata dinheiro, apenas exibe price.formatted.',
  },
  {
    icon: '🪝',
    tag: 'React',
    title: 'Custom Hook',
    file: 'hooks/useCart.js',
    desc: 'O hook useCart isola toda a regra do carrinho (estado, adição, remoção e total). O componente vira um "dumb component", e a mesma lógica atende carrinho e checkout sem duplicação.',
  },
  {
    icon: '🧱',
    tag: 'OCP',
    title: 'Composition Pattern',
    file: 'components/Card',
    desc: 'O Card é montado por composição (Card.Root, Card.Price, Card.Actions…), eliminando o prop drilling e respeitando o princípio Aberto/Fechado — variações são criadas sem alterar o componente base.',
  },
];

const METRICS = [
  { criterio: 'Linhas no carrinho', antes: '~180 (fetch + cálculo + JSX)', depois: '~35 — hook e UI separados' },
  { criterio: 'Reutilização da lógica', antes: 'Nenhuma — duplicada no checkout', depois: 'useCart reutilizado em 2 telas' },
  { criterio: 'Testabilidade', antes: 'Impossível — acoplado ao JSX', depois: '19 testes unitários isolados' },
  { criterio: 'Encapsulamento do preço', antes: 'Valor público e mutável', depois: '#value privado + Object.freeze()' },
  { criterio: 'Flexibilidade do card', antes: 'Prop drilling (10+ props)', depois: 'Composição livre via Context' },
];

export function SobrePage({ onBack }) {
  return (
    <main className="sobre-page">
      {/* ── Cabeçalho da página ── */}
      <header className="sobre-hero">
        <div className="sobre-hero-inner">
          <button className="sobre-back" onClick={onBack}>← Voltar à loja</button>
          <p className="sobre-kicker">TCC · MBA USP / ESALQ · 2026</p>
          <h1 className="sobre-h1">
            Uma loja real, construída como <em>estudo de arquitetura</em>
          </h1>
          <p className="sobre-hero-sub">
            A NEXO Store é o estudo de caso do Trabalho de Conclusão de Curso de
            Allan Felipe Sales Menezes — <strong>Aplicação de Padrões de Projeto
            no Desenvolvimento Front-end com React</strong>, sob orientação do
            Prof. Dr. Ariel Da Silva Dias.
          </p>
        </div>
      </header>

      <div className="sobre-body">
        {/* ── O problema ── */}
        <section className="sobre-block">
          <span className="sobre-eyebrow">O problema</span>
          <h2 className="sobre-h2">Quando a regra de negócio invade a interface</h2>
          <p className="sobre-lead">
            Em muitos projetos React, lógica de estado, chamadas de API e
            formatação visual se misturam num mesmo componente. O resultado é
            código acoplado, difícil de testar, manter e escalar. Este projeto
            aplica três padrões para separar responsabilidades com clareza —
            adaptando conceitos clássicos da Orientação a Objetos ao paradigma
            funcional moderno.
          </p>
        </section>

        {/* ── Padrões ── */}
        <section className="sobre-block">
          <span className="sobre-eyebrow">Solução</span>
          <h2 className="sobre-h2">Os três padrões aplicados</h2>
          <div className="sobre-cards">
            {PATTERNS.map(p => (
              <article className="sobre-card" key={p.title}>
                <div className="sobre-card-top">
                  <span className="sobre-card-icon">{p.icon}</span>
                  <span className="sobre-card-tag">{p.tag}</span>
                </div>
                <h3 className="sobre-card-title">{p.title}</h3>
                <code className="sobre-card-file">{p.file}</code>
                <p className="sobre-card-desc">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Antes e depois ── */}
        <section className="sobre-block">
          <span className="sobre-eyebrow">Resultados</span>
          <h2 className="sobre-h2">Antes e depois da refatoração</h2>
          <div className="sobre-metrics">
            <div className="sobre-metric-head">
              <span>Critério</span>
              <span>Antes</span>
              <span>Depois</span>
            </div>
            {METRICS.map(m => (
              <div className="sobre-metric-row" key={m.criterio}>
                <span className="sobre-metric-crit">{m.criterio}</span>
                <span className="sobre-metric-before">{m.antes}</span>
                <span className="sobre-metric-after">{m.depois}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stack + CTA ── */}
        <section className="sobre-cta-block">
          <div>
            <h2 className="sobre-h2">Código aberto para análise</h2>
            <p className="sobre-stack">React 18 · Vite · JavaScript ES2022 · DDD · Custom Hooks · Composition Pattern · Vitest</p>
          </div>
          <a
            className="sobre-cta"
            href="https://github.com/allanfelipe12/meu-ecommerce-arquitetura"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver código no GitHub →
          </a>
        </section>
      </div>
    </main>
  );
}
