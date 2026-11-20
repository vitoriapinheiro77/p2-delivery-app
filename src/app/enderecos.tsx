import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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

type Endereco = {
  id: string;
  titulo: string;
  rua: string;
  bairro: string;
  numero: string;
};

const ENDERECOS_INICIAIS: Endereco[] = [
  {
    id: '1',
    titulo: 'Casa',
    rua: 'Rua das Flores',
    bairro: 'Centro',
    numero: '123 - Apto 402',
  },
  {
    id: '2',
    titulo: 'Trabalho',
    rua: 'Av. Roberto Silveira',
    bairro: 'Flamengo',
    numero: '850 - Sala 12',
  },
];

export default function EnderecosScreen() {
  const router = useRouter();
  const [enderecos, setEnderecos] = useState<Endereco[]>(ENDERECOS_INICIAIS);
  const [selecionadoId, setSelecionadoId] = useState<string>('1');

  // Estados para busca via API ViaCEP
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [titulo, setTitulo] = useState('');
  const [carregandoCep, setCarregandoCep] = useState(false);

  const buscarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      Alert.alert('CEP inválido', 'Digite um CEP válido com 8 números.');
      return;
    }

    try {
      setCarregandoCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Não encontrado', 'CEP não localizado na base.');
        return;
      }

      setRua(data.logradouro || '');
      setBairro(`${data.bairro} - ${data.localidade}/${data.uf}`);
    } catch {
      Alert.alert('Erro de conexão', 'Não foi possível consultar o CEP.');
    } finally {
      setCarregandoCep(false);
    }
  };

  const handleAdicionarEndereco = () => {
    if (!rua.trim() || !numero.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha pelo menos a rua e o número.');
      return;
    }

    const novoEndereco: Endereco = {
      id: String(Date.now()),
      titulo: titulo.trim() || 'Novo Endereço',
      rua: rua.trim(),
      bairro: bairro.trim() || 'Bairro não informado',
      numero: numero.trim(),
    };

    setEnderecos((prev) => [novoEndereco, ...prev]);
    setSelecionadoId(novoEndereco.id);

    // Limpa formulário
    setCep('');
    setRua('');
    setBairro('');
    setNumero('');
    setTitulo('');
    Alert.alert('Sucesso!', 'Novo endereço adicionado e selecionado.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Endereços</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Lista de Endereços Salvos */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Onde você quer receber?</Text>

          {enderecos.map((item) => {
            const ativo = item.id === selecionadoId;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.cardEndereco, ativo && styles.cardEnderecoAtivo]}
                onPress={() => setSelecionadoId(item.id)}
                activeOpacity={0.85}
              >
                <View style={[styles.iconeBox, ativo && styles.iconeBoxAtivo]}>
                  <Ionicons
                    name={item.titulo.toLowerCase() === 'trabalho' ? 'briefcase' : 'home'}
                    size={20}
                    color={ativo ? COLORS.white : COLORS.primary}
                  />
                </View>

                <View style={styles.enderecoInfo}>
                  <Text style={styles.enderecoTitulo}>{item.titulo}</Text>
                  <Text style={styles.enderecoRua}>
                    {item.rua}, {item.numero}
                  </Text>
                  <Text style={styles.enderecoBairro}>{item.bairro}</Text>
                </View>

                <Ionicons
                  name={ativo ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={ativo ? COLORS.primary : COLORS.textSecondary}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Formulário com Consumo da API ViaCEP */}
        <View style={styles.formCard}>
          <Text style={styles.secaoTitulo}>Cadastrar novo endereço via CEP</Text>

          <View style={styles.cepLinha}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Digite o CEP (ex: 24900000)"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              maxLength={9}
              value={cep}
              onChangeText={setCep}
            />
            <TouchableOpacity
              style={styles.buscarCepBotao}
              onPress={buscarCep}
              disabled={carregandoCep}
            >
              {carregandoCep ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.buscarCepTexto}>Buscar CEP</Text>
              )}
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Apelido (ex: Casa, Casa da Praia)"
            placeholderTextColor={COLORS.textSecondary}
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={styles.input}
            placeholder="Rua / Avenida"
            placeholderTextColor={COLORS.textSecondary}
            value={rua}
            onChangeText={setRua}
          />

          <View style={styles.duplaLinha}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Número / Comp."
              placeholderTextColor={COLORS.textSecondary}
              value={numero}
              onChangeText={setNumero}
            />
            <TextInput
              style={[styles.input, { flex: 1.4 }]}
              placeholder="Bairro / Cidade"
              placeholderTextColor={COLORS.textSecondary}
              value={bairro}
              onChangeText={setBairro}
            />
          </View>

          <TouchableOpacity
            style={styles.salvarBotao}
            onPress={handleAdicionarEndereco}
            activeOpacity={0.9}
          >
            <Text style={styles.salvarTexto}>Salvar Endereço</Text>
          </TouchableOpacity>
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
  cardEndereco: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  cardEnderecoAtivo: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF9F9',
  },
  iconeBox: {
    width: 42,
    height: 42,
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
  enderecoTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  enderecoRua: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  enderecoBairro: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  formCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  cepLinha: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  duplaLinha: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  buscarCepBotao: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buscarCepTexto: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  salvarBotao: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  salvarTexto: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});