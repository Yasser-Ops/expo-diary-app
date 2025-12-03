// app/_layout.tsx
import { EntriesProvider } from '@/hooks/useEntries';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <EntriesProvider>
      <Stack>
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </EntriesProvider>
  );
}
