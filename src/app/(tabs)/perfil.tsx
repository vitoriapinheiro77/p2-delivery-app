import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface Usuario {
  nome: string;
  email: string;
  telefone: string;
}

export default function PerfilScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const carregarDadosUsuario = async () => {
    try {
      const dados = await AsyncStorage.getItem('@rangoja:usuario');
      if (dados) {
        setUsuario(JSON.parse(dados));
      }
    } catch {
      // Ignora erro de leitura silenciosamente
    }
  };

  const handleSair = async () => {
    try {
      await AsyncStorage.removeItem('@rangoja:usuario');
      router.replace('/');
    } catch {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Meu Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card de Informações do Usuário */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={36} color={COLORS.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {usuario ? usuario.nome : 'Visitante RangoJá'}
            </Text>
            <Text style={styles.userEmail}>
              {usuario ? usuario.email : 'Toque em entrar para sincronizar'}
            </Text>
            <Text style={styles.userPhone}>
              {usuario ? usuario.telefone : ''}
            </Text>
          </View>
        </View>

        {/* Opções de Configuração */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="location-outline" size={22} color={COLORS.text} />
            <Text style={styles.menuText}>Endereços de Entrega</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={22} color={COLORS.text} />
            <Text style={styles.menuText}>Formas de Pagamento</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
            <Text style={styles.menuText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color={COLORS.text} />
            <Text style={styles.menuText}>Ajuda e Suporte</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSair}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da conta</Text>
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
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tituloHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.lg,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatarContainer: {
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
    fontWeight: '700',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  userPhone: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  menuSection: {
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
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
    logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444', // Cor vermelha do botão sair
  },
});