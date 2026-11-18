import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { CATEGORIAS, PRATOS, Prato } from '../../data/mockPratos';

export default function HomeScreen() {
  const router = useRouter();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todos');

  const pratosFiltrados =
    categoriaSelecionada === 'Todos'
      ? PRATOS
      : PRATOS.filter((p) => p.categoria === categoriaSelecionada);

  const renderPratoItem = ({ item }: { item: Prato }) => (
    <TouchableOpacity
      style={styles.cardPrato}
      activeOpacity={0.9}
      onPress={() => router.push(`/produto/${item.id}` as any)}
    >
      <Image source={{ uri: item.imagem }} style={styles.imagemPrato} />
      <View style={styles.infoPrato}>
        <Text style={styles.nomePrato} numberOfLines={1}>
          {item.nome}
        </Text>
        <Text style={styles.restaurantePrato} numberOfLines={1}>
          {item.restaurante}
        </Text>

        <View style={styles.detalhesLinha}>
          <View style={styles.avaliacaoContainer}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={styles.avaliacaoTexto}>{item.avaliacao}</Text>
          </View>
          <Text style={styles.ponto}>•</Text>
          <Text style={styles.tempoTexto}>{item.tempoEntrega}</Text>
          <Text style={styles.ponto}>•</Text>
          <Text style={[styles.freteTexto, item.frete === 'Grátis' && styles.freteGratis]}>
            {item.frete}
          </Text>
        </View>

        <Text style={styles.precoPrato}>
          R$ {item.preco.toFixed(2).replace('.', ',')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho de Endereço */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.enderecoContainer}>
          <Text style={styles.enderecoLabel}>Entregar em</Text>
          <View style={styles.enderecoRow}>
            <Text style={styles.enderecoTexto} numberOfLines={1}>
              Av. Atlântica, 1500 - Copacabana
            </Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.perfilIconContainer}
          onPress={() => router.push('/(tabs)/perfil' as any)}
        >
          <Ionicons name="person-circle-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Barra de Pesquisa Rápida */}
        <View style={styles.searchSection}>
          <TouchableOpacity
            style={styles.searchBar}
            activeOpacity={0.9}
            onPress={() => router.push('/(tabs)/busca' as any)}
          >
            <Ionicons name="search" size={20} color={COLORS.textSecondary} />
            <Text style={styles.searchText}>Busque item ou restaurante</Text>
          </TouchableOpacity>
        </View>

        {/* Categorias */}
        <View style={styles.sectionContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriasScroll}
          >
            <TouchableOpacity
              style={[
                styles.categoriaChip,
                categoriaSelecionada === 'Todos' && styles.categoriaChipAtiva,
              ]}
              onPress={() => setCategoriaSelecionada('Todos')}
            >
              <Text
                style={[
                  styles.categoriaTexto,
                  categoriaSelecionada === 'Todos' && styles.categoriaTextoAtiva,
                ]}
              >
                Todos
              </Text>
            </TouchableOpacity>

            {CATEGORIAS.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoriaChip,
                  categoriaSelecionada === cat.nome && styles.categoriaChipAtiva,
                ]}
                onPress={() => setCategoriaSelecionada(cat.nome)}
              >
                <Ionicons
                  name={cat.icone as any}
                  size={16}
                  color={categoriaSelecionada === cat.nome ? COLORS.white : COLORS.text}
                />
                <Text
                  style={[
                    styles.categoriaTexto,
                    categoriaSelecionada === cat.nome && styles.categoriaTextoAtiva,
                  ]}
                >
                  {cat.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Banner Promocional */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Prato do Dia com Frete Grátis</Text>
            <Text style={styles.bannerSubtitle}>
              Aproveite os melhores lanches com entrega expressa.
            </Text>
          </View>
          <Ionicons name="fast-food" size={48} color={COLORS.primary} />
        </View>

        {/* Lista de Pratos */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lojas e Pratos Disponíveis</Text>
          <FlatList
            data={pratosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={renderPratoItem}
            scrollEnabled={false}
            contentContainerStyle={styles.listaPratos}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  enderecoContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  enderecoLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  enderecoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  enderecoTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  perfilIconContainer: {
    padding: 4,
  },
  searchSection: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  searchText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  sectionContainer: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  categoriasScroll: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  categoriaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  categoriaChipAtiva: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoriaTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoriaTextoAtiva: {
    color: COLORS.white,
  },
  bannerContainer: {
    marginHorizontal: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  bannerContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: COLORS.text,
    opacity: 0.8,
  },
  listaPratos: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
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
    width: 80,
    height: 80,
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
    marginBottom: 6,
  },
  detalhesLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avaliacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  avaliacaoTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  ponto: {
    marginHorizontal: 6,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  tempoTexto: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  freteTexto: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  freteGratis: {
    color: COLORS.success,
    fontWeight: '700',
  },
  precoPrato: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
});