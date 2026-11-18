import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface Pedido {
  id: string;
  restaurante: string;
  itens: string;
  status: 'Entregue' | 'Em andamento' | 'Cancelado';
  data: string;
  valor: number;
}

const PEDIDOS_MOCK: Pedido[] = [
  {
    id: '101',
    restaurante: 'Burger Kingo Artesanal',
    itens: '1x Smash Burger Duplo Bacon, 1x Coca-Cola',
    status: 'Em andamento',
    data: 'Hoje, 12:40',
    valor: 42.90,
  },
  {
    id: '100',
    restaurante: 'Forneria Bella Italia',
    itens: '1x Pizza Margherita Napoletana',
    status: 'Entregue',
    data: 'Ontem, 20:15',
    valor: 52.00,
  },
  {
    id: '99',
    restaurante: 'Sakura Sushi House',
    itens: '1x Combinado Salmão 24 Peças',
    status: 'Entregue',
    data: '15/10/2026',
    valor: 72.50,
  },
];

export default function PedidosScreen() {
  const renderItem = ({ item }: { item: Pedido }) => {
    const isEmAndamento = item.status === 'Em andamento';

    return (
      <View style={styles.cardPedido}>
        <View style={styles.cardHeader}>
          <Text style={styles.restauranteNome}>{item.restaurante}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isEmAndamento ? COLORS.primaryLight : COLORS.surface },
            ]}
          >
            <Text
              style={[
                styles.statusTexto,
                { color: isEmAndamento ? COLORS.primaryDark : COLORS.textSecondary },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.itensTexto} numberOfLines={2}>
          {item.itens}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={styles.dataTexto}>
            {item.data} • R$ {item.valor.toFixed(2).replace('.', ',')}
          </Text>
          {isEmAndamento && (
            <TouchableOpacity style={styles.detalhesButton}>
              <Text style={styles.detalhesButtonText}>Ver rota</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Meus Pedidos</Text>
      </View>

      <FlatList
        data={PEDIDOS_MOCK}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listaContainer}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Ionicons name="receipt-outline" size={64} color={COLORS.border} />
            <Text style={styles.vazioTitulo}>Nenhum pedido recente</Text>
            <Text style={styles.vazioSub}>Seus pedidos finalizados aparecerão aqui.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tituloHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  listaContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
    flexGrow: 1,
  },
  cardPedido: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restauranteNome: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
  itensTexto: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.xs,
    marginTop: 2,
  },
  dataTexto: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  detalhesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  detalhesButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  vazioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
  },
});