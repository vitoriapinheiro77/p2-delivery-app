import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PRATOS } from '../../data/mockPratos';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export default function ProdutoDetalhesScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [quantidade, setQuantidade] = useState(1);

  // Busca o prato correspondente pelo ID da rota
  const prato = PRATOS.find((p) => p.id === id);

  if (!prato) {
    return (
      <SafeAreaView style={styles.containerVazio}>
        <Ionicons name="alert-circle-outline" size={64} color={COLORS.textSecondary} />
        <Text style={styles.textoVazio}>Produto não encontrado.</Text>
        <TouchableOpacity style={styles.voltarButton} onPress={() => router.back()}>
          <Text style={styles.voltarButtonText}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const precoTotal = prato.preco * quantidade;

  const handleAdicionarCarrinho = () => {
    // Aqui no futuro podemos salvar no estado global/AsyncStorage do carrinho
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagem de Capa e Botão de Voltar Flutuante */}
        <View style={styles.imagemContainer}>
          <Image source={{ uri: prato.imagem }} style={styles.imagem} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Informações do Produto */}
        <View style={styles.conteudo}>
          <Text style={styles.nome}>{prato.nome}</Text>
          <Text style={styles.restaurante}>{prato.restaurante}</Text>

          <View style={styles.detalhesRow}>
            <View style={styles.avaliacaoBox}>
              <Ionicons name="star" size={14} color={COLORS.warning} />
              <Text style={styles.avaliacaoTexto}>{prato.avaliacao}</Text>
            </View>
            <Text style={styles.ponto}>•</Text>
            <Text style={styles.tempoTexto}>{prato.tempoEntrega}</Text>
            <Text style={styles.ponto}>•</Text>
            <Text style={styles.freteTexto}>{prato.frete}</Text>
          </View>

          <Text style={styles.descricao}>{prato.descricao}</Text>

          <View style={styles.divisor} />

          {/* Observações ou Complementos */}
          <View style={styles.secaoObs}>
            <Text style={styles.secaoTitulo}>Alguma observação?</Text>
            <Text style={styles.secaoSub}>Ex: sem cebola, ponto da carne, etc.</Text>
            <View style={styles.obsInputBox}>
              <Text style={styles.obsPlaceholder}>Adicionar observação (opcional)</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Rodapé Fixo com Quantidade e Botão de Adicionar */}
      <View style={styles.footer}>
        <View style={styles.quantidadeContainer}>
          <TouchableOpacity
            style={[styles.qtdButton, quantidade <= 1 && styles.qtdButtonDisabled]}
            disabled={quantidade <= 1}
            onPress={() => setQuantidade(q => Math.max(1, q - 1))}
          >
            <Ionicons name="remove" size={18} color={quantidade <= 1 ? COLORS.border : COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.qtdTexto}>{quantidade}</Text>
          <TouchableOpacity
            style={styles.qtdButton}
            onPress={() => setQuantidade(q => q + 1)}
          >
            <Ionicons name="add" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botaoAdicionar} onPress={handleAdicionarCarrinho} activeOpacity={0.9}>
          <Text style={styles.botaoAdicionarTexto}>Adicionar</Text>
          <Text style={styles.botaoAdicionarPreco}>
            R$ {precoTotal.toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerVazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  textoVazio: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  voltarButton: {
  backgroundColor: COLORS.primary,
  paddingHorizontal: SPACING.lg,
  paddingVertical: SPACING.sm,
  borderRadius: RADIUS.md,
},
voltarButtonText: {
  color: COLORS.white,
  fontWeight: '700',
},
  imagemContainer: {
    width: '100%',
    height: 260,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: SPACING.md,
    backgroundColor: COLORS.white,
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  conteudo: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    marginTop: -20,
  },
  nome: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  restaurante: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  detalhesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avaliacaoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  avaliacaoTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  ponto: {
    marginHorizontal: 8,
    color: COLORS.textSecondary,
  },
  tempoTexto: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  freteTexto: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  descricao: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  divisor: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  secaoObs: {
    gap: 4,
    marginBottom: SPACING.xl,
  },
  secaoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  secaoSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  obsInputBox: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  obsPlaceholder: {
    fontSize: 14,
    color: COLORS.textSecondary,
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
    overflow: 'hidden',
  },
  qtdButton: {
    padding: 10,
    backgroundColor: COLORS.surface,
  },
  qtdButtonDisabled: {
    opacity: 0.5,
  },
  qtdTexto: {
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  botaoAdicionar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botaoAdicionarTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  botaoAdicionarPreco: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
});