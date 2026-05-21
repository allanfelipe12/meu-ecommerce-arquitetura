import { Price } from '../domain/Price';

export const PRODUCTS = [
  {
    id: 1, name: 'Headphone Pro X1', subtitle: 'Cancelamento de ruído ativo',
    category: 'Áudio', emoji: '🎧', rating: 4.8, reviews: 234,
    price: new Price(899.90), oldPrice: new Price(1299.90),
    sale: true, hot: true,
    bg: 'linear-gradient(145deg,#eff6ff,#dbeafe)',
    tags: ['Todos', 'Eletrônicos'],
  },
  {
    id: 2, name: 'Smart Watch Series 5', subtitle: 'GPS + Monitor cardíaco',
    category: 'Wearables', emoji: '⌚', rating: 4.6, reviews: 187,
    price: new Price(1499.00), isNew: true,
    bg: 'linear-gradient(145deg,#f0fdf4,#dcfce7)',
    tags: ['Todos', 'Wearables'],
  },
  {
    id: 3, name: 'Tênis Urban Runner', subtitle: 'Tecnologia React Foam',
    category: 'Calçados', emoji: '👟', rating: 4.5, reviews: 312,
    price: new Price(549.90), oldPrice: new Price(699.90), sale: true,
    bg: 'linear-gradient(145deg,#fef9f0,#fef3c7)',
    tags: ['Todos', 'Moda'],
  },
  {
    id: 4, name: 'Mochila Nomad 30L', subtitle: 'Impermeável · USB integrado',
    category: 'Acessórios', emoji: '🎒', rating: 4.7, reviews: 98,
    price: new Price(399.90), isNew: true,
    bg: 'linear-gradient(145deg,#fdf4ff,#fae8ff)',
    tags: ['Todos', 'Acessórios'],
  },
  {
    id: 5, name: 'Câmera Mirrorless A7', subtitle: '30MP · Vídeo 4K',
    category: 'Fotografia', emoji: '📷', rating: 4.9, reviews: 521,
    price: new Price(5499.00), hot: true,
    bg: 'linear-gradient(145deg,#fff1f2,#ffe4e6)',
    tags: ['Todos', 'Eletrônicos'],
  },
  {
    id: 6, name: 'Fone TWS Elite', subtitle: '24h de bateria · IPX5',
    category: 'Áudio', emoji: '🎵', rating: 4.4, reviews: 445,
    price: new Price(349.90), oldPrice: new Price(449.90), sale: true,
    bg: 'linear-gradient(145deg,#f0fdfa,#ccfbf1)',
    tags: ['Todos', 'Eletrônicos'],
  },
  {
    id: 7, name: 'Notebook Ultra Slim', subtitle: 'Intel i7 · 16GB · SSD 512GB',
    category: 'Computadores', emoji: '💻', rating: 4.7, reviews: 203,
    price: new Price(4299.00), isNew: true,
    bg: 'linear-gradient(145deg,#f8faff,#e8f0ff)',
    tags: ['Todos', 'Eletrônicos'],
  },
  {
    id: 8, name: 'Óculos Smart AR', subtitle: 'Realidade aumentada · Wi-Fi',
    category: 'Wearables', emoji: '🕶️', rating: 4.3, reviews: 77,
    price: new Price(2899.00), isNew: true,
    bg: 'linear-gradient(145deg,#fdfcee,#fef9c3)',
    tags: ['Todos', 'Wearables'],
  },
];

export const FILTERS = ['Todos', 'Eletrônicos', 'Wearables', 'Moda', 'Acessórios'];
