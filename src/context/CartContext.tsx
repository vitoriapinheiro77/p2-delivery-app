import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ItemCarrinho = {
  id: string;
  nome: string;
  preco: number;
  restaurante: string;
  imagem?: string;
  quantidade: number;
};

type CartContextData = {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Omit<ItemCarrinho, 'quantidade'>, quantidade: number) => void;
  removerDoCarrinho: (id: string) => void;
  alterarQuantidade: (id: string, delta: number) => void;
  limparCarrinho: () => void;
  subtotal: number;
};

const CART_STORAGE_KEY = '@delivery_app_cart';

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  // Carrega os itens salvos ao iniciar o app
  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (dadosSalvos) {
          setItens(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar o carrinho do AsyncStorage:', error);
      }
    }
    carregarCarrinho();
  }, []);

  // Salva os itens no AsyncStorage sempre que a lista mudar
  useEffect(() => {
    async function salvarCarrinho() {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itens));
      } catch (error) {
        console.error('Erro ao salvar o carrinho no AsyncStorage:', error);
      }
    }
    salvarCarrinho();
  }, [itens]);

  const adicionarAoCarrinho = (produto: Omit<ItemCarrinho, 'quantidade'>, quantidade: number) => {
    setItens((prevItens) => {
      const indexExistente = prevItens.findIndex((item) => item.id === produto.id);

      if (indexExistente >= 0) {
        const novosItens = [...prevItens];
        novosItens[indexExistente].quantidade += quantidade;
        return novosItens;
      } else {
        return [...prevItens, { ...produto, quantidade }];
      }
    });
  };

  const removerDoCarrinho = (id: string) => {
    setItens((prevItens) => prevItens.filter((item) => item.id !== id));
  };

  const alterarQuantidade = (id: string, delta: number) => {
    setItens((prevItens) =>
      prevItens
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

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}