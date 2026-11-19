import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

const ETAPAS_PEDIDO = [
  {
    id: 0,
    titulo: 'Pedido confirmado',
    descricao: 'O restaurante já recebeu o seu pedido.',
    icone: 'checkmark-circle' as const,
  },
  {
    id: 1,
    titulo: 'Preparando seu pedido',
    descricao: 'A cozinha está preparando tudo com cuidado.',
    icone: 'restaurant' as const,
  },
  {
    id: 2,
    titulo: 'Saiu para entrega',
    descricao: 'O entregador está a caminho do seu endereço.',
    icone: 'bicycle' as const,
  },
  {
    id: 3,
    titulo: 'Pedido entregue',
    descricao: 'Bom apetite! Esperamos que goste.',
    icone: 'bag-check' as const,
  },
];

export default function PedidoStatusScreen() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(0);

  // Avança automaticamente os status a cada 4 segundos para simular o pedido real
  useEffect(() => {
    if (etapaAtual < ETAPAS_PEDIDO.length - 1) {
      const timer = setTimeout(() => {
        setEtapaAtual((prev) => prev + 1);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [etapaAtual]);

  const pedidoConcluido = etapaAtual === ETAPAS_PEDIDO.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)')}
          style={styles.backButton}
        >
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acompanhar Pedido</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card de Previsão e Código */}
        <View style={styles.previsaoCard}>
          <View style={styles.previsaoTopo}>
            <View>
              <Text style={styles.previsaoLabel}>Previsão de entrega</Text>
              <Text style={styles.previsaoHora}>
                {pedidoConcluido ? 'Entregue!' : '30 - 45 min'}
              </Text>
            </View>
            <View style={styles.codigoBadge}>
              <Text style={styles.codigoLabel}>Código</Text>
              <Text style={styles.codigoNumero}>4829</Text>
            </View>
          </View>

          {/* Barra de Progresso */}
          <View style={styles.barraFundo}>
            <View
              style={[
                styles.barraPreenchida,
                { width: `${((etapaAtual + 1) / ETAPAS_PEDIDO.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Linha do Tempo Interativa */}
        <View style={styles.timelineCard}>
          <Text style={styles.secaoTitulo}>Status do pedido</Text>

          {ETAPAS_PEDIDO.map((etapa, index) => {
            const concluida = index <= etapaAtual;
            const atual = index === etapaAtual;
            const isUltimo = index === ETAPAS_PEDIDO.length - 1;

            return (
              <View key={etapa.id} style={styles.etapaLinha}>
                <View style={styles.indicadorColuna}>
                  <View
                    style={[
                      styles.circuloIcone,
                      concluida && styles.circuloAtivo,
                      atual && styles.circuloDestaque,
                    ]}
                  >
                    <Ionicons
                      name={etapa.icone}
                      size={18}
                      color={concluida ? COLORS.white : COLORS.textSecondary}
                    />
                  </View>
                  {!isUltimo && (
                    <View
                      style={[
                        styles.linhaVertical,
                        index < etapaAtual && styles.linhaVerticalAtiva,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.etapaInfo}>
                  <Text
                    style={[
                      styles.etapaTitulo,
                      concluida && styles.etapaTituloAtivo,
                    ]}
                  >
                    {etapa.titulo}
                  </Text>
                  <Text style={styles.etapaDescricao}>{etapa.descricao}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Botão extra para avançar manualmente durante testes/apresentação */}
{!pedidoConcluido && (
  <TouchableOpacity
    style={styles.simularBotao}
    onPress={() => setEtapaAtual((prev) => prev + 1)}
    activeOpacity={0.7}
  >
    <Ionicons
      name="play-forward-outline"
      size={18}
      color={COLORS.primary}
    />
    <Text style={styles.simularTexto}>
      Avançar status agora
    </Text>
  </TouchableOpacity>
)}
      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.inicioBotao}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.9}
        >
          <Text style={styles.inicioTexto}>Voltar para o Início</Text>
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
  content: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  previsaoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  previsaoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previsaoLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  previsaoHora: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 2,
  },
  codigoBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  codigoLabel: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },
  codigoNumero: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  barraFundo: {
    height: 8,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  barraPreenchida: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  timelineCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secaoTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  etapaLinha: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  indicadorColuna: {
    alignItems: 'center',
    width: 36,
  },
  circuloIcone: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circuloAtivo: {
    backgroundColor: COLORS.primary,
  },
  circuloDestaque: {
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
  },
  linhaVertical: {
    width: 2,
    height: 32,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  linhaVerticalAtiva: {
    backgroundColor: COLORS.primary,
  },
  etapaInfo: {
    flex: 1,
    paddingBottom: SPACING.md,
    gap: 2,
  },
  etapaTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  etapaTituloAtivo: {
    color: COLORS.text,
  },
  etapaDescricao: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  simularBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    gap: 8,
  },
  simularTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inicioBotao: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicioTexto: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});