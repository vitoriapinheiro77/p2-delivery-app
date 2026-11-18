import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

export default function PedidoStatusScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Acompanhar Pedido</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        {/* Status Card Principal */}
        <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Ionicons name="bicycle" size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.statusTitulo}>Saiu para entrega</Text>
          <Text style={styles.statusSub}>Seu entregador Carlos está a caminho</Text>
          <Text style={styles.tempoEstimado}>Previsão: 15 - 25 min</Text>
        </View>

        {/* Linha do Tempo do Pedido */}
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitulo}>Detalhes do Andamento</Text>
          
          <View style={styles.timelineItem}>
            <View style={[styles.bullet, styles.bulletActive]} />
            <View>
              <Text style={styles.timelineTextBold}>Pedido confirmado</Text>
              <Text style={styles.timelineSub}>Hoje, 12:40</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.bullet, styles.bulletActive]} />
            <View>
              <Text style={styles.timelineTextBold}>Preparando o pedido</Text>
              <Text style={styles.timelineSub}>Hoje, 12:45</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.bullet, styles.bulletActive]} />
            <View>
              <Text style={styles.timelineTextBold}>Saiu para entrega</Text>
              <Text style={styles.timelineSub}>Hoje, 13:00</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.bullet} />
            <View>
              <Text style={styles.timelineText}>Pedido entregue</Text>
              <Text style={styles.timelineSub}>Aguardando...</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Botão Inferior */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voltarHomeButton}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.9}
        >
          <Text style={styles.voltarHomeText}>Voltar ao Início</Text>
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
  content: {
    flex: 1,
    padding: SPACING.md,
    gap: SPACING.lg,
  },
  statusCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    alignItems: 'center',
    gap: 6,
  },
  statusIconContainer: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statusTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  statusSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  tempoEstimado: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 4,
  },
  timelineContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  timelineTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.border,
  },
  bulletActive: {
    backgroundColor: COLORS.primary,
  },
  timelineTextBold: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  timelineText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  timelineSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  voltarHomeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  voltarHomeText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});