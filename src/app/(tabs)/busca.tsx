import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PRATOS, Prato } from '../../data/mockPratos';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export default function BuscaScreen() {
  const router = useRouter();
  const [termoBusca, setTermoBusca] = useState('');

  const resultados = PRATOS.filter(
    (p) =>
      p.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      p.restaurante.toLowerCase().includes(termoBusca.toLowerCase()) ||
      p.categoria.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const renderItem = ({ item }: { item: Prato }) => (
    <TouchableOpacity
      style={styles.cardPrato}
      activeOpacity={0.9}
      onPress={() => router.push(`/produto/${item.id}` as any)}
    >
      <Image source={{ uri: item.imagem }} style={styles.imagemPrato} />
      <View style={styles.infoPrato}>
        <Text style={styles.nomePrato} numberOfLines={1}>{item.nome}</Text>
        <Text style={styles.restaurantePrato} numberOfLines={1}>{item.restaurante}</Text>
        <View style={styles.detalhesLinha}>
          <Ionicons name="star" size={13} color={COLORS.warning} />
          <Text style={styles.avaliacaoTexto}>{item.avaliacao}</Text>
          <Text style={styles.ponto}>•</Text>
          <Text style={styles.tempoTexto}>{item.tempoEntrega}</Text>
        </View>
        <Text style={styles.precoPrato}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de Pesquisa Superior */}
      <View style={styles.header}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.inputBusca}
            placeholder="Prato, restaurante ou categoria"
            placeholderTextColor={COLORS.textSecondary}
            value={termoBusca}
            onChangeText={setTermoBusca}
            autoFocus
          />
          {termoBusca.length > 0 && (
            <TouchableOpacity onPress={() => setTermoBusca('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Lista de Resultados */}
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listaContainer}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Ionicons name="search-outline" size={64} color={COLORS.border} />
            <Text style={styles.vazioTitulo}>Nenhum resultado encontrado</Text>
            <Text style={styles.vazioSub}>Tente buscar por "Burger", "Pizza" ou "Japonesa"</Text>
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
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  inputBusca: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    padding: 0,
  },
  listaContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
    flexGrow: 1,
  },
  cardPrato: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    padding: SPACING.sm,
    alignItems: 'center',
  },
  imagemPrato: {
    width: 75,
    height: 75,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
  },
  infoPrato: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  nomePrato: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  restaurantePrato: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  detalhesLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 3,
  },
  avaliacaoTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 2,
  },
  ponto: {
    marginHorizontal: 4,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  tempoTexto: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  precoPrato: {
    fontSize: 14,
    fontWeight: '800',
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
    paddingHorizontal: SPACING.lg,
  },
});