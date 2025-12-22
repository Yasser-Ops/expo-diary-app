import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/UseTheme';
import { Redirect, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Landing() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { token, hydrating } = useAuth();

  useEffect(() => {
    if (!hydrating && token) {
      router.replace('/(tabs)/entry');
    }
  }, [hydrating, token, router]);

  if (hydrating) {
    return (
      <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (token) {
    return <Redirect href="/(tabs)/entry" />;
  }

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>
        Welcome to WanderLog!
      </Text>
      <Button title="Login" onPress={() => router.push('/login')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  light: { backgroundColor: '#f9f9f9' },
  dark: { backgroundColor: '#111' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
});
