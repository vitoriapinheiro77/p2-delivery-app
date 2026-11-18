import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface BotaoCustomizadoProps {
  titulo: string;
  onPress: () => void;
  carregando?: boolean;
  variante?: 'primario' | 'secundario';
}

export default function BotaoCustomizado({
  titulo,
  onPress,
  carregando = false,
  variante = 'primario',
}: BotaoCustomizadoProps) {
  const isPrimario = variante === 'primario';

  return (
    <TouchableOpacity
      style={[
        styles.botao,
        isPrimario ? styles.botaoPrimario : styles.botaoSecundario,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={carregando}
    >
      {carregando ? (
        <ActivityIndicator color={isPrimario ? COLORS.white : COLORS.primary} />
      ) : (
        <Text
          style={[
            styles.texto,
            isPrimario ? styles.textoPrimario : styles.textoSecundario,
          ]}
        >
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  botaoPrimario: {
    backgroundColor: COLORS.primary,
  },
  botaoSecundario: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  texto: {
    fontSize: 15,
    fontWeight: '700',
  },
  textoPrimario: {
    color: COLORS.white,
  },
  textoSecundario: {
    color: COLORS.primary,
  },
});