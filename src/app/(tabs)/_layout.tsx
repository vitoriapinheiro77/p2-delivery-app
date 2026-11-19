
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type ColorValue,
} from 'react-native';

import { COLORS } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

// Converte a cor para um formato aceito pelo Ionicons
function getIconColor(
  color: ColorValue | null | undefined
): string {
  return typeof color === 'string'
    ? color
    : COLORS.primary;
}

// Ícone do carrinho com contador de produtos
function CartIconWithBadge({
  color,
  size,
}: {
  color: ColorValue | null | undefined;
  size: number;
}) {
  const { itens } = useCart();

  const totalItens = itens.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name="basket-outline"
        size={size}
        color={getIconColor(color)}
      />

      {totalItens > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {totalItens}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,

        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={getIconColor(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="busca"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="search-outline"
              size={size}
              color={getIconColor(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt-outline"
              size={size}
              color={getIconColor(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Sacola',
          tabBarIcon: ({ color, size }) => (
            <CartIconWithBadge
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={getIconColor(color)}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
});
