import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { PRATOS } from '../../data/mockPratos';

export default function ProdutoDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { adicionarAoCarrinho } = useCart();

  const prato = PRATOS.find((item) => item.id === id);

  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState('');

  if (!prato) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>Prato não encontrado.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn}>
            <Text style={styles.voltarBtnTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const aumentarQtd = () => setQuantidade((prev) => prev + 1);
  const diminuirQtd = () => setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));

  const total = (prato.preco * quantidade).toFixed(2).replace('.', ',');

  const handleAdicionar = () => {
    adicionarAoCarrinho(
      {
        id: prato.id,
        nome: prato.nome,
        preco: prato.preco,
        restaurante: prato.restaurante,
        imagem: prato.imagem,
      },
      quantidade
    );

    router.push('/carrinho');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão Voltar Flutuante */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={22} color={COLORS.text} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagem do Produto */}
        <Image source={{ uri: prato.imagem }} style={styles.imagem} />

        {/* Informações Principais */}
        <View style={styles.conteudo}>
          <View style={styles.restauranteBadge}>
            <Ionicons name="storefront-outline" size={14} color={COLORS.primary} />
            <Text style={styles.restauranteTexto}>{prato.restaurante}</Text>
          </View>

          <Text style={styles.nome}>{prato.nome}</Text>
          <Text style={styles.descricao}>{prato.descricao}</Text>

          <Text style={styles.precoUnitario}>
            R$ {prato.preco.toFixed(2).replace('.', ',')}
          </Text>

          <View style={styles.divisor} />

          {/* Informações de Entrega */}
          <View style={styles.infoEntrega}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={18} color={COLORS.textSecondary} />
              <Text style={styles.infoTexto}>{prato.tempoEntrega || '30-45 min'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="star" size={18} color="#FFB800" />
              <Text style={styles.infoTexto}>{prato.avaliacao || '4.8'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Rodapé Fixo com Controle de Quantidade e Botão Adicionar */}
      <View style={styles.footer}>
        <View style={styles.quantidadeContainer}>
          <TouchableOpacity
            onPress={diminuirQtd}
            style={[styles.qtdBotao, quantidade === 1 && styles.qtdBotaoDesabilitado]}
            disabled={quantidade === 1}
          >
            <Ionicons
              name="remove"
              size={20}
              color={quantidade === 1 ? COLORS.textSecondary : COLORS.primary}
            />
          </TouchableOpacity>

          <Text style={styles.quantidadeTexto}>{quantidade}</Text>

          <TouchableOpacity onPress={aumentarQtd} style={styles.qtdBotao}>
            <Ionicons name="add" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.adicionarBotao}
          onPress={handleAdicionar}
          activeOpacity={0.9}
        >
          <Text style={styles.adicionarTexto}>Adicionar</Text>
          <Text style={styles.adicionarTotal}>R$ {total}</Text>
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
  erroContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  erroTexto: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  voltarBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  voltarBtnTexto: {
    color: COLORS.white,
    fontWeight: '700',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: SPACING.md,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  imagem: {
    width: '100%',
    height: 260,
    backgroundColor: COLORS.surface,
  },
  conteudo: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  restauranteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  restauranteTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  nome: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },
  descricao: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  precoUnitario: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },
  divisor: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  infoEntrega: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoTexto: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.md,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 8,
    height: 48,
    gap: 12,
  },
  qtdBotao: {
    padding: 4,
  },
  qtdBotaoDesabilitado: {
    opacity: 0.4,
  },
  quantidadeTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    minWidth: 20,
    textAlign: 'center',
  },
  adicionarBotao: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  adicionarTexto: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  adicionarTotal: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
});