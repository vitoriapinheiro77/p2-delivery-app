import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

const CATEGORIAS = ['Todos', 'Lanches', 'Pizza', 'Japonesa', 'Doces'];

const CATALOGO_BUSCA = [
  {
    id: 'bk-whopper',
    nome: 'Whopper Duplo',
    restaurante: 'Burger King',
    categoria: 'Lanches',
    preco: 34.9,
    tempo: '25-35 min',
  },
  {
    id: 'pz-calabresa',
    nome: 'Pizza Calabresa Grande',
    restaurante: 'Pizzaria Napoli',
    categoria: 'Pizza',
    preco: 49.9,
    tempo: '35-45 min',
  },
  {
    id: 'sh-combo',
    nome: 'Combinado Salmão 20 peças',
    restaurante: 'Sushi House',
    categoria: 'Japonesa',
    preco: 62.1,
    tempo: '30-40 min',
  },
  {
    id: 'dc-acai',
    nome: 'Açaí Completo 500ml',
    restaurante: 'Ponto do Açaí',
    categoria: 'Doces',
    preco: 22.5,
    tempo: '15-25 min',
  },
  {
    id: 'bk-smash',
    nome: 'Smash Bacon Artesanal',
    restaurante: 'Burger King',
    categoria: 'Lanches',
    preco: 28.0,
    tempo: '20-30 min',
  },
];

export default function BuscaScreen() {
  const router = useRouter();
  const { adicionarAoCarrinho } = useCart();
  const [termo, setTermo] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const itensFiltrados = CATALOGO_BUSCA.filter((item) => {
    const bateCategoria =
      categoriaAtiva === 'Todos' || item.categoria === categoriaAtiva;
    const bateTexto =
      item.nome.toLowerCase().includes(termo.toLowerCase()) ||
      item.restaurante.toLowerCase().includes(termo.toLowerCase());
    return bateCategoria && bateTexto;
  });

  const handleAdicionar = (item: (typeof CATALOGO_BUSCA)[0]) => {
    adicionarAoCarrinho(
      {
        id: item.id,
        nome: item.nome,
        preco: item.preco,
        restaurante: item.restaurante,
      },
      1
    );
    Alert.alert('Adicionado!', `${item.nome} foi para a sua sacola.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={COLORS.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar prato ou restaurante..."
            placeholderTextColor={COLORS.textSecondary}
            value={termo}
            onChangeText={setTermo}
          />
          {termo.length > 0 && (
            <TouchableOpacity onPress={() => setTermo('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filtro de Categorias */}
      <View style={styles.categoriasWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriasLista}
        >
          {CATEGORIAS.map((cat) => {
            const ativa = categoriaAtiva === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, ativa && styles.chipAtivo]}
                onPress={() => setCategoriaAtiva(cat)}
              >
                <Text style={[styles.chipTexto, ativa && styles.chipTextoAtivo]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Resultados */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultadosCount}>
          {itensFiltrados.length}{' '}
          {itensFiltrados.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </Text>

        {itensFiltrados.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.cardItem}
            onPress={() => router.push(`/produto/${item.id}`)}
            activeOpacity={0.85}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemCategoria}>{item.categoria} • {item.tempo}</Text>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemRestaurante}>{item.restaurante}</Text>
              <Text style={styles.itemPreco}>
                R$ {item.preco.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addBotao}
              onPress={() => handleAdicionar(item)}
            >
              <Ionicons name="add" size={22} color={COLORS.white} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchHeader: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  categoriasWrapper: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoriasLista: {
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipAtivo: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  chipTextoAtivo: {
    color: COLORS.white,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  resultadosCount: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  itemInfo: {
    flex: 1,
    gap: 3,
  },
  itemCategoria: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  itemNome: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  itemRestaurante: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  itemPreco: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },
  addBotao: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});