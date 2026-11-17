export interface Prato {
  id: string;
  nome: string;
  restaurante: string;
  categoria: string;
  preco: number;
  tempoEntrega: string;
  avaliacao: number;
  frete: string;
  descricao: string;
  imagem: string;
}

export const CATEGORIAS = [
  { id: '1', nome: 'Lanches', icone: 'fast-food-outline' },
  { id: '2', nome: 'Pizza', icone: 'pizza-outline' },
  { id: '3', nome: 'Brasileira', icone: 'restaurant-outline' },
  { id: '4', nome: 'Japonesa', icone: 'fish-outline' },
  { id: '5', nome: 'Doces', icone: 'ice-cream-outline' },
  { id: '6', nome: 'Bebidas', icone: 'beer-outline' },
] as const;

export const PRATOS: Prato[] = [
  {
    id: '1',
    nome: 'Smash Burger Duplo Bacon',
    restaurante: 'Burger Kingo Artesanal',
    categoria: 'Lanches',
    preco: 34.9,
    tempoEntrega: '25-35 min',
    avaliacao: 4.9,
    frete: 'Grátis',
    descricao:
      'Dois blends bovinos de 100g prensados na chapa, queijo cheddar cremoso, bacon crocante e molho especial no pão brioche selado.',
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  },
  {
    id: '2',
    nome: 'Pizza Margherita Napoletana',
    restaurante: 'Forneria Bella Italia',
    categoria: 'Pizza',
    preco: 52.0,
    tempoEntrega: '35-45 min',
    avaliacao: 4.8,
    frete: 'R$ 5,90',
    descricao:
      'Massa de fermentação natural de 48h, molho de tomate pelati italiano, mussarela de búfala, manjericão fresco e azeite extravirgem.',
    imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
  },
  {
    id: '3',
    nome: 'Picanha na Chapa Completa',
    restaurante: 'Brasa & Sabor Grill',
    categoria: 'Brasileira',
    preco: 64.9,
    tempoEntrega: '30-40 min',
    avaliacao: 4.9,
    frete: 'Grátis',
    descricao:
      '350g de picanha fatiada ao ponto, acompanhada de arroz branco soltinho, feijão tropeiro, farofa na manteiga e vinagrete.',
    imagem: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  },
  {
    id: '4',
    nome: 'Combinado Salmão 24 Peças',
    restaurante: 'Sakura Sushi House',
    categoria: 'Japonesa',
    preco: 72.5,
    tempoEntrega: '40-50 min',
    avaliacao: 4.7,
    frete: 'R$ 7,90',
    descricao:
      'Seleção fresca com 8 sashimis de salmão, 6 niguiris, 6 uramakis Philadelphia e 4 hot rolls crocantes com tarê.',
    imagem: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
  },
  {
    id: '5',
    nome: 'Brownie com Sorvete de Creme',
    restaurante: 'Doce Encanto Confeitaria',
    categoria: 'Doces',
    preco: 22.9,
    tempoEntrega: '20-30 min',
    avaliacao: 4.9,
    frete: 'Grátis',
    descricao:
      'Brownie artesanal meio amargo servido quentinho com bola de sorvete de baunilha e calda de chocolate belga.',
    imagem: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600',
  },
  {
    id: '6',
    nome: 'Suco Natural de Laranja 500ml',
    restaurante: 'Verde Vida Natural',
    categoria: 'Bebidas',
    preco: 11.5,
    tempoEntrega: '15-25 min',
    avaliacao: 4.6,
    frete: 'R$ 3,90',
    descricao:
      'Suco 100% natural espremido na hora, sem adição de açúcar ou conservantes, bem gelado.',
    imagem: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600',
  },
];