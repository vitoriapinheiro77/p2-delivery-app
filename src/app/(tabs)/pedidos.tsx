import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

const HISTORICO_PEDIDOS = [
  {
    id: '1042',
    restaurante: 'Burger King',
    data: '18 Nov • 20:15',
    itens: '1x Whopper Duplo, 1x Batata Média',
    total: 42.9,
    produtoExemplo: {
      id: 'bk-whopper',
      nome: 'Whopper Duplo',
      preco: 34.9,
      restaurante: 'Burger King',
    },
  },
  {
    id: '1038',
    restaurante: 'Sushi House',
    data: '14 Nov • 19:40',
    itens: '1x Combinado Salmão 20 peças',
    total: 68.0,
    produtoExemplo: {
      id: 'sh-combo',
      nome: 'Combinado Salmão 20 peças',
      preco: 62.1,
      restaurante: 'Sushi House',
    },
  },
];

export default function PedidosScreen() {
  const router = useRouter();
  const { adicionarAoCarrinho } = useCart();

  const handlePedirNovamente = (pedido: (typeof HISTORICO_PEDIDOS)[0]) => {
    adicionarAoCarrinho(pedido.produtoExemplo, 1);
    router.push('/(tabs)/carrinho');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pedido em Andamento */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Em andamento</Text>
          <TouchableOpacity
            style={styles.ativoCard}
            onPress={() => router.push('/pedido-status')}
            activeOpacity={0.85}
          >
            <View style={styles.ativoTopo}>
              <View style={styles.statusBadge}>
                <View style={styles.pontoAtivo} />
                <Text style={styles.statusTexto}>Acompanhar entrega</Text>
              </View>
              <Text style={styles.pedidoNumero}>#4829</Text>
            </View>

            <Text style={styles.ativoRestaurante}>Seu pedido atual</Text>
            <Text style={styles.ativoSub}>Toque para ver a linha do tempo em tempo real</Text>

            <View style={styles.ativoRodape}>
              <Text style={styles.acompanharLink}>Ver status do pedido</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Histórico de Pedidos */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Histórico</Text>

          {HISTORICO_PEDIDOS.map((pedido) => (
            <View key={pedido.id} style={styles.historicoCard}>
              <View style={styles.historicoTopo}>
                <Text style={styles.restauranteNome}>{pedido.restaurante}</Text>
                <Text style={styles.pedidoData}>{pedido.data}</Text>
              </View>

              <Text style={styles.pedidoItens}>{pedido.itens}</Text>

              <View style={styles.historicoRodape}>
                <Text style={styles.pedidoTotal}>
                  R$ {pedido.total.toFixed(2).replace('.', ',')}
                </Text>

                <TouchableOpacity
                  style={styles.repetirBotao}
                  onPress={() => handlePedirNovamente(pedido)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="refresh" size={16} color={COLORS.primary} />
                  <Text style={styles.repetirTexto}>Pedir novamente</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.lg,
  },
  secao: {
    gap: SPACING.sm,
  },
  secaoTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  ativoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    gap: 6,
  },
  ativoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    gap: 6,
  },
  pontoAtivo: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  pedidoNumero: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  ativoRestaurante: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },
  ativoSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  ativoRodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    marginTop: 6,
  },
  acompanharLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  historicoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  historicoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restauranteNome: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  pedidoData: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  pedidoItens: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  historicoRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    marginTop: 4,
  },
  pedidoTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  repetirBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primaryLight,
  },
  repetirTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
});