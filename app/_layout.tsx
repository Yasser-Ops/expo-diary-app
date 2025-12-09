// app/_layout.tsx
import { EntriesProvider } from '@/hooks/useEntries';
import { ThemeProvider } from '@/hooks/UseTheme'; // new context provider
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <EntriesProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* index.tsx is automatically the root, no need to declare */}
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </EntriesProvider>
  );
}