import React, { createContext, useContext, useState } from 'react';

export interface ItemCarrinho {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  restaurante: string;
  imagem?: string;
}

interface CartContextData {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (item: Omit<ItemCarrinho, 'quantidade'>, quantidade?: number) => void;
  removerDoCarrinho: (id: string) => void;
  alterarQuantidade: (id: string, delta: number) => void;
  limparCarrinho: () => void;
  subtotal: number;
  totalItens: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarAoCarrinho = (produto: Omit<ItemCarrinho, 'quantidade'>, quantidade = 1) => {
    setItens((prev) => {
      const indexExistente = prev.findIndex((i) => i.id === produto.id);
      if (indexExistente >= 0) {
        const novaLista = [...prev];
        novaLista[indexExistente].quantidade += quantidade;
        return novaLista;
      }
      return [...prev, { ...produto, quantidade }];
    });
  };

  const removerDoCarrinho = (id: string) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const alterarQuantidade = (id: string, delta: number) => {
    setItens((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const novaQtd = item.quantidade + delta;
            return novaQtd > 0 ? { ...item, quantidade: novaQtd } : null;
          }
          return item;
        })
        .filter(Boolean) as ItemCarrinho[]
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
        subtotal,
        totalItens,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}