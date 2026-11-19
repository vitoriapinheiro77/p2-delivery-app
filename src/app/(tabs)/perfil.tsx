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

  const handleSair = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja encerrar sua sessão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => router.replace('/login'),
        },
      ]
    );
  };

  const opcoesMenu = [
    {
      id: 'enderecos',
      titulo: 'Meus Endereços',
      subtitulo: 'Gerencie seus locais de entrega',
      icone: 'location-outline' as const,
      rota: '/enderecos' as const,
    },
    {
      id: 'pagamento',
      titulo: 'Formas de Pagamento',
      subtitulo: 'Cartões salvos e Pix',
      icone: 'card-outline' as const,
      rota: '/pagamento' as const,
    },
    {
      id: 'ajuda',
      titulo: 'Ajuda e Suporte',
      subtitulo: 'Dúvidas frequentes e atendimento',
      icone: 'help-circle-outline' as const,
      rota: '/ajuda' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cabeçalho com Avatar e Dados do Usuário */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={COLORS.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Usuário Delivery</Text>
            <Text style={styles.userEmail}>usuario@email.com</Text>
          </View>
        </View>

        {/* Lista de Opções de Navegação */}
        <View style={styles.menuContainer}>
          <Text style={styles.secaoTitulo}>Minha Conta</Text>

          {opcoesMenu.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.rota)}
              activeOpacity={0.7}
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

        {/* Botão de Logout */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.sairBotao}
            onPress={handleSair}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sairTexto}>Sair da conta</Text>
          </TouchableOpacity>
          <Text style={styles.versaoTexto}>Versão 1.0.0</Text>
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
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  menuContainer: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  footer: {
    padding: SPACING.md,
    marginTop: SPACING.md,
    alignItems: 'center',
    gap: SPACING.md,
  },
  sairBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: 8,
  },
  sairTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
  versaoTexto: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});