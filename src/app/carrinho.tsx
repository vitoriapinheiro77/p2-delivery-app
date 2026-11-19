import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { useCart } from '../context/CartContext';

export default function CarrinhoScreen() {
  const router = useRouter();
  const { itens, alterarQuantidade, removerDoCarrinho, subtotal, limparCarrinho } = useCart();

  const taxaEntrega = itens.length > 0 ? 5.90 : 0;
  const totalGeral = subtotal + taxaEntrega;

  if (itens.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sacola</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.vazioContainer}>
          <Ionicons name="basket-outline" size={80} color={COLORS.textSecondary} />
          <Text style={styles.vazioTitulo}>Sua sacola está vazia</Text>
          <Text style={styles.vazioSub}>Explore o cardápio e adicione pratos deliciosos!</Text>
          <TouchableOpacity
            style={styles.explorarBotao}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.8}
          >
            <Text style={styles.explorarTexto}>Ver Cardápio</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sacola</Text>
        <TouchableOpacity onPress={limparCarrinho}>
          <Text style={styles.limparTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Itens */}
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            {item.imagem && <Image source={{ uri: item.imagem }} style={styles.itemImagem} />}
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemRestaurante}>{item.restaurante}</Text>
              <Text style={styles.itemNome} numberOfLines={1}>{item.nome}</Text>
              <Text style={styles.itemPreco}>
                R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <View style={styles.itemControles}>
              <TouchableOpacity
                onPress={() => alterarQuantidade(item.id, -1)}
                style={styles.controleBotao}
              >
                <Ionicons name="remove" size={16} color={COLORS.primary} />
              </TouchableOpacity>
              
              <Text style={styles.itemQtd}>{item.quantidade}</Text>

              <TouchableOpacity
                onPress={() => alterarQuantidade(item.id, 1)}
                style={styles.controleBotao}
              >
                <Ionicons name="add" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Rodapé com Resumo de Valores e Botão de Pagamento */}
      <View style={styles.footer}>
        <View style={styles.resumoLinha}>
          <Text style={styles.resumoTexto}>Subtotal</Text>
          <Text style={styles.resumoValor}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
        </View>
        <View style={styles.resumoLinha}>
          <Text style={styles.resumoTexto}>Taxa de entrega</Text>
          <Text style={styles.resumoValor}>R$ {taxaEntrega.toFixed(2).replace('.', ',')}</Text>
        </View>
        <View style={[styles.resumoLinha, styles.totalLinha]}>
          <Text style={styles.totalTexto}>Total</Text>
          <Text style={styles.totalValor}>R$ {totalGeral.toFixed(2).replace('.', ',')}</Text>
        </View>

        <TouchableOpacity
          style={styles.pagarBotao}
          onPress={() => router.push('/pagamento')}
          activeOpacity={0.9}
        >
          <Text style={styles.pagarBotaoTexto}>Escolher forma de pagamento</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  limparTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  vazioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  vazioTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  vazioSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  explorarBotao: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    marginTop: SPACING.sm,
  },
  explorarTexto: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
  },
  listaContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  itemImagem: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
  },
  itemInfo: {
    flex: 1,
    gap: 2,
  },
  itemRestaurante: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  itemNome: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  itemPreco: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 4,
  },
  itemControles: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 4,
    height: 32,
    gap: 8,
  },
  controleBotao: {
    padding: 2,
  },
  itemQtd: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    minWidth: 16,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 8,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resumoTexto: {
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
    paddingTop: 8,
    marginTop: 4,
  },
  totalTexto: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  totalValor: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  pagarBotao: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
  },
  pagarBotaoTexto: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});