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
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { useCart } from '../context/CartContext';

type MetodoPagamento = 'pix' | 'credito' | 'dinheiro';

export default function PagamentoScreen() {
  const router = useRouter();
  const { itens, subtotal, limparCarrinho } = useCart();
  const [metodoSelecionado, setMetodoSelecionado] = useState<MetodoPagamento>('pix');

  // Estados para Cupom de Desconto
  const [codigoCupom, setCodigoCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState<string | null>(null);
  const [desconto, setDesconto] = useState(0);

  const taxaEntregaBase = itens.length > 0 ? 5.9 : 0;
  const taxaEntrega = cupomAplicado === 'FRETEGRATIS' ? 0 : taxaEntregaBase;
  const totalGeral = Math.max(0, subtotal + taxaEntrega - desconto);

  const opcoesPagamento = [
    {
      id: 'pix' as const,
      titulo: 'Pix',
      descricao: 'Aprovação imediata pelo app do banco',
      icone: 'qr-code-outline' as const,
    },
    {
      id: 'credito' as const,
      titulo: 'Cartão de Crédito',
      descricao: 'Mastercard •••• 4829',
      icone: 'card-outline' as const,
    },
    {
      id: 'dinheiro' as const,
      titulo: 'Dinheiro na Entrega',
      descricao: 'Pague diretamente ao entregador',
      icone: 'cash-outline' as const,
    },
  ];

  const handleAplicarCupom = () => {
    const codigo = codigoCupom.trim().toUpperCase();

    if (!codigo) {
      Alert.alert('Atenção', 'Digite um código de cupom válido.');
      return;
    }

    if (codigo === 'PRIMEIRA15') {
      setCupomAplicado(codigo);
      setDesconto(15);
      Alert.alert('Cupom aplicado!', 'Você ganhou R$ 15,00 de desconto.');
    } else if (codigo === 'BURGER10') {
      setCupomAplicado(codigo);
      setDesconto(10);
      Alert.alert('Cupom aplicado!', 'Você ganhou R$ 10,00 de desconto.');
    } else if (codigo === 'FRETEGRATIS') {
      setCupomAplicado(codigo);
      setDesconto(0);
      Alert.alert('Cupom aplicado!', 'Sua taxa de entrega agora é grátis!');
    } else {
      Alert.alert('Cupom inválido', 'Tente PRIMEIRA15, BURGER10 ou FRETEGRATIS.');
    }
  };

  const handleRemoverCupom = () => {
    setCupomAplicado(null);
    setDesconto(0);
    setCodigoCupom('');
  };

  const handleFinalizarPedido = () => {
    if (itens.length === 0) {
      Alert.alert('Sacola vazia', 'Adicione itens ao carrinho antes de finalizar o pedido.');
      return;
    }

    limparCarrinho();
    router.replace('/pedido-status');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Endereço de Entrega Resumido */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Entregar em</Text>
          <TouchableOpacity
            style={styles.enderecoCard}
            onPress={() => router.push('/enderecos')}
            activeOpacity={0.8}
          >
            <View style={styles.iconeBox}>
              <Ionicons name="location" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.enderecoInfo}>
              <Text style={styles.enderecoRua}>Rua das Flores, 123 - Centro</Text>
              <Text style={styles.enderecoComp}>Apto 402 • Entrega padrão (30-45 min)</Text>
            </View>
            <Text style={styles.trocarTexto}>Trocar</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Cupom de Desconto */}
        <View style={styles.secao}>
          <View style={styles.cupomHeader}>
            <Text style={styles.secaoTitulo}>Cupom de desconto</Text>
            <TouchableOpacity onPress={() => router.push('/cupons')}>
              <Text style={styles.verCuponsTexto}>Ver disponíveis</Text>
            </TouchableOpacity>
          </View>

          {cupomAplicado ? (
            <View style={styles.cupomAplicadoBox}>
              <View style={styles.cupomAplicadoInfo}>
                <Ionicons name="ticket" size={20} color={COLORS.primary} />
                <Text style={styles.cupomAplicadoTexto}>
                  Cupom <Text style={{ fontWeight: '800' }}>{cupomAplicado}</Text> ativo
                </Text>
              </View>
              <TouchableOpacity onPress={handleRemoverCupom}>
                <Text style={styles.removerTexto}>Remover</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cupomInputLinha}>
              <TextInput
                style={styles.cupomInput}
                placeholder="Ex: PRIMEIRA15"
                placeholderTextColor={COLORS.textSecondary}
                autoCapitalize="characters"
                value={codigoCupom}
                onChangeText={setCodigoCupom}
              />
              <TouchableOpacity style={styles.aplicarBotao} onPress={handleAplicarCupom}>
                <Text style={styles.aplicarTexto}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Seleção de Forma de Pagamento */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Forma de pagamento</Text>
          {opcoesPagamento.map((opcao) => {
            const ativo = metodoSelecionado === opcao.id;
            return (
              <TouchableOpacity
                key={opcao.id}
                style={[styles.opcaoCard, ativo && styles.opcaoCardAtivo]}
                onPress={() => setMetodoSelecionado(opcao.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconeBox, ativo && styles.iconeBoxAtivo]}>
                  <Ionicons
                    name={opcao.icone}
                    size={22}
                    color={ativo ? COLORS.white : COLORS.primary}
                  />
                </View>
                <View style={styles.opcaoInfo}>
                  <Text style={styles.opcaoTitulo}>{opcao.titulo}</Text>
                  <Text style={styles.opcaoDescricao}>{opcao.descricao}</Text>
                </View>
                <Ionicons
                  name={ativo ? 'radio-button-on' : 'radio-button-off'}
                  size={22}
                  color={ativo ? COLORS.primary : COLORS.textSecondary}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Resumo de Valores */}
        <View style={styles.resumoCard}>
          <Text style={styles.secaoTitulo}>Resumo de valores</Text>
          <View style={styles.resumoLinha}>
            <Text style={styles.resumoLabel}>
              Subtotal ({itens.length} {itens.length === 1 ? 'item' : 'itens'})
            </Text>
            <Text style={styles.resumoValor}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.resumoLinha}>
            <Text style={styles.resumoLabel}>Taxa de entrega</Text>
            <Text style={styles.resumoValor}>
              {taxaEntrega === 0 && itens.length > 0
                ? 'Grátis'
                : `R$ ${taxaEntrega.toFixed(2).replace('.', ',')}`}
            </Text>
          </View>
          {desconto > 0 && (
            <View style={styles.resumoLinha}>
              <Text style={[styles.resumoLabel, { color: '#16A34A' }]}>Desconto do cupom</Text>
              <Text style={[styles.resumoValor, { color: '#16A34A' }]}>
                - R$ {desconto.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          )}
          <View style={[styles.resumoLinha, styles.totalLinha]}>
            <Text style={styles.totalLabel}>Total a pagar</Text>
            <Text style={styles.totalValor}>R$ {totalGeral.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Rodapé com Botão de Confirmar Pedido */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmarBotao}
          onPress={handleFinalizarPedido}
          activeOpacity={0.9}
        >
          <Text style={styles.confirmarTexto}>Fazer Pedido</Text>
          <Text style={styles.confirmarValor}>R$ {totalGeral.toFixed(2).replace('.', ',')}</Text>
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
    gap: SPACING.lg,
  },
  secao: {
    gap: SPACING.sm,
  },
  secaoTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  enderecoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  iconeBox: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeBoxAtivo: {
    backgroundColor: COLORS.primary,
  },
  enderecoInfo: {
    flex: 1,
    gap: 2,
  },
  enderecoRua: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  enderecoComp: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  trocarTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  cupomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verCuponsTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  cupomInputLinha: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  cupomInput: {
    flex: 1,
    height: 46,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: 14,
    color: COLORS.text,
  },
  aplicarBotao: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aplicarTexto: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  cupomAplicadoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF9F9',
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  cupomAplicadoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cupomAplicadoTexto: {
    fontSize: 14,
    color: COLORS.text,
  },
  removerTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  opcaoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  opcaoCardAtivo: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF9F9',
  },
  opcaoInfo: {
    flex: 1,
    gap: 2,
  },
  opcaoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  opcaoDescricao: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  resumoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resumoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  resumoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalLinha: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  totalValor: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  confirmarBotao: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  confirmarTexto: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  confirmarValor: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});