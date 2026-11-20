
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

export default function CadastroScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleCadastrar = async () => {
    if (nome.trim().length < 3) {
      Alert.alert('Nome inválido', 'Digite seu nome completo.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
      return;
    }

    if (telefone.replace(/\D/g, '').length < 10) {
      Alert.alert('Telefone inválido', 'Digite um telefone válido.');
      return;
    }

    if (senha.length < 4) {
      Alert.alert('Senha curta', 'Use pelo menos 4 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      const usuario = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: telefone.trim(),
      };

      await AsyncStorage.setItem(
        '@rangoja:usuario',
        JSON.stringify(usuario)
      );

      Alert.alert(
        'Conta criada!',
        `Bem-vindo(a), ${nome.trim()}!`,
        [
          {
            text: 'Começar a pedir',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível salvar seus dados. Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Botão Voltar */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={COLORS.text}
            />
          </TouchableOpacity>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.titulo}>Criar nova conta</Text>
            <Text style={styles.subtitulo}>
              Preencha seus dados para pedir com rapidez
              e acompanhar entregas.
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>

            {/* Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: João Silva"
                  placeholderTextColor={COLORS.textSecondary}
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* E-mail */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="seuemail@exemplo.com"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Telefone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Celular</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="(21) 99999-9999"
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="phone-pad"
                  value={telefone}
                  onChangeText={setTelefone}
                />
              </View>
            </View>

            {/* Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Crie uma senha"
                  placeholderTextColor={COLORS.textSecondary}
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>
            </View>

            {/* Botão Cadastrar */}
            <TouchableOpacity
              style={[
                styles.cadastrarBotao,
                carregando && styles.botaoDesabilitado,
              ]}
              onPress={handleCadastrar}
              activeOpacity={0.9}
              disabled={carregando}
            >
              <Text style={styles.cadastrarTexto}>
                {carregando ? 'Cadastrando...' : 'Criar Conta'}
              </Text>
            </TouchableOpacity>

            {/* Link para Login */}
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginTexto}>
                Já tem uma conta?{' '}
                <Text style={styles.loginDestaque}>
                  Entrar
                </Text>
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingBottom: 40,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
  },

  header: {
    marginBottom: SPACING.lg,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },

  subtitulo: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  form: {
    gap: SPACING.md,
  },

  inputGroup: {
    gap: SPACING.sm,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 54,
    gap: SPACING.sm,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    height: '100%',
  },

  cadastrarBotao: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },

  botaoDesabilitado: {
    opacity: 0.6,
  },

  cadastrarTexto: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },

  loginLink: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },

  loginTexto: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  loginDestaque: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
