import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export default function PerfilScreen() {
  const router = useRouter();

  const opcoesMenu = [
    {
      id: 'pedidos',
      titulo: 'Meus Pedidos',
      subtitulo: 'Histórico e acompanhamento em tempo real',
      icone: 'receipt-outline' as const,
      rota: '/(tabs)/pedidos' as const,
    },
    {
      id: 'cupons',
      titulo: 'Meus Cupons',
      subtitulo: 'Descontos e entrega grátis disponíveis',
      icone: 'ticket-outline' as const,
      rota: '/cupons' as const,
    },
    {
      id: 'enderecos',
      titulo: 'Endereços',
      subtitulo: 'Gerencie seus locais de entrega via CEP',
      icone: 'location-outline' as const,
      rota: '/enderecos' as const,
    },
    {
      id: 'ajuda',
      titulo: 'Central de Ajuda',
      subtitulo: 'Perguntas frequentes e suporte 24h',
      icone: 'help-circle-outline' as const,
      rota: '/ajuda' as const,
    },
  ];

  const handleSair = () => {
    Alert.alert('Sair da conta', 'Deseja realmente voltar para a tela de login?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => router.replace('/login'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cartão do Usuário */}
        <View style={styles.usuarioCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={COLORS.primary} />
          </View>
          <View style={styles.usuarioInfo}>
            <Text style={styles.usuarioNome}>Cliente VIP</Text>
            <Text style={styles.usuarioEmail}>cliente@deliveryapp.com</Text>
          </View>
        </View>

        {/* Lista de Navegação */}
        <View style={styles.menuLista}>
          {opcoesMenu.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.rota)}
              activeOpacity={0.75}
            >
              <View style={styles.menuIconeBox}>
                <Ionicons name={item.icone} size={22} color={COLORS.primary} />
              </View>
              <View style={styles.menuTextos}>
                <Text style={styles.menuTitulo}>{item.titulo}</Text>
                <Text style={styles.menuSubtitulo}>{item.subtitulo}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity style={styles.sairBotao} onPress={handleSair} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.primary} />
          <Text style={styles.sairTexto}>Sair da conta</Text>
        </TouchableOpacity>
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
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
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
  usuarioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usuarioInfo: {
    flex: 1,
    gap: 2,
  },
  usuarioNome: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  usuarioEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  menuLista: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.md,
  },
  menuIconeBox: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextos: {
    flex: 1,
    gap: 2,
  },
  menuTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  menuSubtitulo: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sairBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  sairTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
});