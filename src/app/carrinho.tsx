import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface ItemCarrinho {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  restaurante: string;
}

export default function CarrinhoScreen() {
  const router = useRouter();
  
  // Mock temporário de itens no carrinho (depois podemos integrar com estado global)
  const [itens, setItens] = useState<ItemCarrinho[]>([
    {
      id: '1',
      nome: 'Smash Burger Duplo Bacon',
      preco: 34.90,
      quantidade: 1,
      restaurante: 'Burger Kingo Artesanal',
    },
    {
      id: '2',
      nome: 'Batata Frita Rústica com Cheddar',
      preco: 18.00,
      quantidade: 1,
      restaurante: 'Burger Kingo Artesanal',
    },
  ]);

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const taxaEntrega = 5.90;
  const total = subtotal + (itens.length > 0 ? taxaEntrega : 0);

  const alterarQtd = (id: string, delta: number) => {
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

  const handleFinalizarPedido = () => {
    alert('Pedido realizado com sucesso! Acompanhe na aba Pedidos.');
    router.replace('/(tabs)/pedidos');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Seu Carrinho</Text>
        <View style={{ width: 36 }} />
      </View>

      {itens.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Ionicons name="cart-outline" size={64} color={COLORS.border} />
          <Text style={styles.vazioTitulo}>Seu carrinho está vazio</Text>
          <Text style={styles.vazioSub}>Explore o cardápio e adicione delícias!</Text>
          <TouchableOpacity style={styles.voltarHomeButton} onPress={() => router.back()}>
            <Text style={styles.voltarHomeText}>Ver cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={itens}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listaContainer}
            renderItem={({ item }) => (
              <View style={styles.cardItem}>
                <View style={styles.infoItem}>
                  <Text style={styles.nomeItem} numberOfLines={1}>{item.nome}</Text>
                  <Text style={styles.restauranteItem}>{item.restaurante}</Text>
                  <Text style={styles.precoItem}>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</Text>
                </View>

                <View style={styles.qtdContainer}>
                  <TouchableOpacity onPress={() => alterarQtd(item.id, -1)} style={styles.qtdBtn}>
                    <Ionicons name="remove" size={14} color={COLORS.text} />
                  </TouchableOpacity>
                  <Text style={styles.qtdValor}>{item.quantidade}</Text>
                  <TouchableOpacity onPress={() => alterarQtd(item.id, 1)} style={styles.qtdBtn}>
                    <Ionicons name="add" size={14} color={COLORS.text} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Resumo de Valores e Checkout */}
          <View style={styles.footer}>
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>Subtotal</Text>
              <Text style={styles.resumoValor}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>Taxa de entrega</Text>
              <Text style={styles.resumoValor}>R$ {taxaEntrega.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={[styles.resumoLinha, styles.totalLinha]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValor}>R$ {total.toFixed(2).replace('.', ',')}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleFinalizarPedido} activeOpacity={0.9}>
              <Text style={styles.checkoutText}>Fazer pedido</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tituloHeader: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  listaContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  cardItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    gap: 2,
    marginRight: SPACING.md,
  },
  nomeItem: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  restauranteItem: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  precoItem: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
  },
  qtdBtn: {
    padding: 8,
    backgroundColor: COLORS.surface,
  },
  qtdValor: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.sm,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resumoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  resumoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalLinha: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.xs,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  totalValor: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  checkoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  vazioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    gap: SPACING.sm,
  },
  vazioTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  vazioSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  voltarHomeButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  voltarHomeText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});