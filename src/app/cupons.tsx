import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

const LISTA_CUPONS = [
  {
    id: '1',
    codigo: 'PRIMEIRA15',
    titulo: 'R$ 15 OFF na primeira compra',
    descricao: 'Válido para pedidos acima de R$ 35,00 em qualquer restaurante.',
    validade: 'Válido até 30/11',
  },
  {
    id: '2',
    codigo: 'FRETEGRATIS',
    titulo: 'Entrega Grátis hoje',
    descricao: 'Válido para pedidos acima de R$ 25,00 na sua região.',
    validade: 'Válido até hoje às 23:59',
  },
  {
    id: '3',
    codigo: 'BURGER10',
    titulo: 'R$ 10 OFF em Hambúrgueres',
    descricao: 'Aproveite nos restaurantes selecionados da categoria Lanches.',
    validade: 'Válido até 25/11',
  },
];

export default function CuponsScreen() {
  const router = useRouter();
  const [cupomAtivo, setCupomAtivo] = useState<string | null>('PRIMEIRA15');

  const handleSelecionarCupom = (codigo: string) => {
    setCupomAtivo(codigo);
    Alert.alert(
      'Cupom ativado!',
      `O código ${codigo} está pronto para ser usado na sacola.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Cupons</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitulo}>
          Selecione um cupom disponível para aplicar no seu próximo pedido:
        </Text>

        {LISTA_CUPONS.map((cupom) => {
          const selecionado = cupomAtivo === cupom.codigo;
          return (
            <TouchableOpacity
              key={cupom.id}
              style={[styles.cupomCard, selecionado && styles.cupomCardAtivo]}
              onPress={() => handleSelecionarCupom(cupom.codigo)}
              activeOpacity={0.85}
            >
              <View style={styles.cupomTopo}>
                <View style={styles.tagCodigo}>
                  <Ionicons name="ticket" size={16} color={COLORS.primary} />
                  <Text style={styles.codigoTexto}>{cupom.codigo}</Text>
                </View>
                {selecionado && (
                  <View style={styles.badgeAtivo}>
                    <Text style={styles.badgeAtivoTexto}>Ativo</Text>
                  </View>
                )}
              </View>

              <Text style={styles.cupomTitulo}>{cupom.titulo}</Text>
              <Text style={styles.cupomDescricao}>{cupom.descricao}</Text>

              <View style={styles.cupomRodape}>
                <Text style={styles.validadeTexto}>{cupom.validade}</Text>
                <Text style={styles.usarTexto}>
                  {selecionado ? 'Selecionado' : 'Aplicar cupom'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
  subtitulo: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  cupomCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 8,
  },
  cupomCardAtivo: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF9F9',
  },
  cupomTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagCodigo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  codigoTexto: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
  badgeAtivo: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  badgeAtivoTexto: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  cupomTitulo: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  cupomDescricao: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  cupomRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    marginTop: 4,
  },
  validadeTexto: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  usarTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
});