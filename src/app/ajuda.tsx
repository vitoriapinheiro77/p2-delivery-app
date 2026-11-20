import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

const PERGUNTAS_FREQUENTES = [
  {
    id: '1',
    pergunta: 'Como faço para rastrear o meu pedido?',
    resposta:
      'Você pode acompanhar o status em tempo real indo na aba "Pedidos" e tocando em "Acompanhar entrega", ou diretamente pela tela de confirmação após finalizar o pagamento.',
  },
  {
    id: '2',
    pergunta: 'Quais são as formas de pagamento aceitas?',
    resposta:
      'Aceitamos Pix (com aprovação imediata), cartões de crédito das principais bandeiras e pagamento em dinheiro diretamente com o entregador.',
  },
  {
    id: '3',
    pergunta: 'Como usar um cupom de desconto?',
    resposta:
      'Na tela de cupons você pode copiar o código desejado e aplicá-lo na hora de finalizar o seu pedido na sacola ou tela de pagamento.',
  },
  {
    id: '4',
    pergunta: 'O meu pedido atrasou, o que devo fazer?',
    resposta:
      'O tempo estimado é calculado com base na preparação e rota do entregador. Caso ultrapasse muito o prazo, você pode entrar em contato com o suporte através do chat do app.',
  },
];

export default function AjudaScreen() {
  const router = useRouter();
  const [expandidoId, setExpandidoId] = useState<string | null>('1');

  const toggleExpandir = (id: string) => {
    setExpandidoId(expandidoId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Central de Ajuda</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card de Suporte Direto */}
        <View style={styles.suporteCard}>
          <View style={styles.iconeBox}>
            <Ionicons name="chatbubbles" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.suporteInfo}>
            <Text style={styles.suporteTitulo}>Precisa de ajuda urgente?</Text>
            <Text style={styles.suporteDescricao}>Nosso atendimento via chat funciona 24 horas por dia.</Text>
          </View>
          <TouchableOpacity style={styles.chatBotao} activeOpacity={0.8}>
            <Text style={styles.chatBotaoTexto}>Chat</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secaoTitulo}>Perguntas Frequentes</Text>

        {PERGUNTAS_FREQUENTES.map((item) => {
          const aberto = expandidoId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.faqCard}
              onPress={() => toggleExpandir(item.id)}
              activeOpacity={0.85}
            >
              <View style={styles.faqTopo}>
                <Text style={styles.faqPergunta}>{item.pergunta}</Text>
                <Ionicons
                  name={aberto ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={COLORS.textSecondary}
                />
              </View>
              {aberto && <Text style={styles.faqResposta}>{item.resposta}</Text>}
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
  suporteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    gap: SPACING.md,
  },
  iconeBox: {
    width: 46,
    height: 46,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suporteInfo: {
    flex: 1,
    gap: 2,
  },
  suporteTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  suporteDescricao: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  chatBotao: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },
  chatBotaoTexto: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  secaoTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  faqTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqPergunta: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  faqResposta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    marginTop: 4,
  },
});