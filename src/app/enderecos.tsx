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

interface Endereco {
  id: string;
  titulo: string;
  rua: string;
  padrao: boolean;
}

export default function EnderecosScreen() {
  const router = useRouter();

  const [enderecos, setEnderecos] = useState<Endereco[]>([
    {
      id: '1',
      titulo: 'Casa',
      rua: 'Av. Atlântica, 1500 - Copacabana, Rio de Janeiro - RJ',
      padrao: true,
    },
    {
      id: '2',
      titulo: 'Trabalho',
      rua: 'Av. Rio Branco, 156 - Centro, Rio de Janeiro - RJ',
      padrao: false,
    },
  ]);

  const definirPadrao = (id: string) => {
    setEnderecos((prev) =>
      prev.map((item) => ({
        ...item,
        padrao: item.id === id,
      }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Meus Endereços</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={enderecos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContainer}
        renderItem={({ item }) => (
          <View style={[styles.cardEndereco, item.padrao && styles.cardPadrao]}>
            <View style={styles.iconeLocal}>
              <Ionicons
                name={item.titulo === 'Casa' ? 'home-outline' : 'briefcase-outline'}
                size={22}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.infoEndereco}>
              <View style={styles.tituloRow}>
                <Text style={styles.tituloItem}>{item.titulo}</Text>
                {item.padrao && (
                  <View style={styles.badgePadrao}>
                    <Text style={styles.badgePadraoTexto}>Padrão</Text>
                  </View>
                )}
              </View>
              <Text style={styles.ruaItem}>{item.rua}</Text>

              {!item.padrao && (
                <TouchableOpacity
                  style={styles.usarPadraoBtn}
                  onPress={() => definirPadrao(item.id)}
                >
                  <Text style={styles.usarPadraoTexto}>Tornar padrão</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />

      {/* Botão Adicionar Endereço */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => alert('Tela de novo endereço em breve!')}
          activeOpacity={0.9}
        >
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={styles.botaoAdicionarTexto}>Adicionar novo endereço</Text>
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
  listaContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  cardEndereco: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  cardPadrao: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '20',
  },
  iconeLocal: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoEndereco: {
    flex: 1,
    gap: 4,
  },
  tituloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tituloItem: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  badgePadrao: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  badgePadraoTexto: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
  },
  ruaItem: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  usarPadraoBtn: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  usarPadraoTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  botaoAdicionar: {
  flexDirection: 'row',
  backgroundColor: COLORS.primary,
  borderRadius: RADIUS.md,
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
  gap: SPACING.xs,
},
  botaoAdicionarTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});