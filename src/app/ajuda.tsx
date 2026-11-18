import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

const FAQ_LISTA: FaqItem[] = [
  {
    id: '1',
    pergunta: 'Como cancelar um pedido?',
    resposta: 'Você pode cancelar o pedido diretamente na aba "Pedidos" caso ele ainda não tenha sido aceito pelo restaurante ou iniciado o preparo.',
  },
  {
    id: '2',
    pergunta: 'Quais são as formas de pagamento aceitas?',
    resposta: 'Aceitamos cartões de crédito e débito das principais bandeiras, Pix e pagamento em dinheiro na entrega.',
  },
  {
    id: '3',
    pergunta: 'Como alterar meu endereço de entrega?',
    resposta: 'Acesse o seu Perfil > Endereços de Entrega para gerenciar, adicionar ou definir um novo endereço padrão.',
  },
];

export default function AjudaScreen() {
  const router = useRouter();
  const [expandidoId, setExpandidoId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandidoId(expandidoId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Ajuda e Suporte</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Atendimento Rápido */}
        <View style={styles.atendimentoCard}>
          <View style={styles.atendimentoIcon}>
            <Ionicons name="chatbubbles-outline" size={28} color={COLORS.primary} />
          </View>
          <View style={styles.atendimentoInfo}>
            <Text style={styles.atendimentoTitulo}>Precisa de atendimento?</Text>
            <Text style={styles.atendimentoSub}>Fale com nosso suporte via chat em tempo real.</Text>
          </View>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => alert('Abrindo chat de suporte...')}
            activeOpacity={0.8}
          >
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de FAQs */}
        <View style={styles.secaoContainer}>
          <Text style={styles.secaoTitulo}>Perguntas Frequentes</Text>
          
          {FAQ_LISTA.map((item) => {
            const aberto = expandidoId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.faqCard}
                activeOpacity={0.9}
                onPress={() => toggleFaq(item.id)}
              >
                <View style={styles.faqHeader}>
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
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.lg,
  },
  atendimentoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.md,
  },
  atendimentoIcon: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atendimentoInfo: {
    flex: 1,
    gap: 2,
  },
  atendimentoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  atendimentoSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  chatButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },
  chatButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  secaoContainer: {
    gap: SPACING.sm,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqPergunta: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  faqResposta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
});