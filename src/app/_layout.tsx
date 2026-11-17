import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="categoria/[nome]" />
        <Stack.Screen name="prato/[id]" />
        <Stack.Screen name="sacola" />
        <Stack.Screen name="endereco" />
        <Stack.Screen name="pagamento" />
        <Stack.Screen name="pedido-confirmado" />
      </Stack>
    </>
  );
}