import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/UseTheme';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { login, register, token, hydrating } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!hydrating && token) {
      router.replace('/(tabs)/entry');
    }
  }, [hydrating, token, router]);

  async function handleSubmit() {
    if (!email || !password || (mode === 'register' && !name.trim())) {
      Alert.alert('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email.trim(), password);
      } else {
        await register(email.trim(), password, name.trim());
      }
      router.replace('/(tabs)/entry');
    } catch (e) {
      Alert.alert('Authentication failed', e instanceof Error ? e.message : 'Please try again');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>
        {mode === 'login' ? 'Login' : 'Create account'}
      </Text>

      {mode === 'register' && (
        <>
          <Text style={darkMode ? styles.darkText : styles.lightText}>Name</Text>
          <TextInput
            style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
            placeholder="Your name"
            placeholderTextColor={darkMode ? '#aaa' : '#666'}
            value={name}
            onChangeText={setName}
          />
        </>
      )}

      <Text style={darkMode ? styles.darkText : styles.lightText}>Email</Text>
      <TextInput
        style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
        placeholder="you@example.com"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={darkMode ? styles.darkText : styles.lightText}>Password</Text>
      <TextInput
        style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
        placeholder="Password"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={submitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
        onPress={handleSubmit}
        disabled={submitting}
      />

      <View style={styles.switchRow}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
        </Text>
        <Button
          title={mode === 'login' ? 'Register' : 'Login'}
          onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  light: { backgroundColor: '#f9f9f9' },
  dark: { backgroundColor: '#111' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  inputLight: { borderColor: '#ccc', backgroundColor: '#fff', color: '#000' },
  inputDark: { borderColor: '#555', backgroundColor: '#333', color: '#fff' },
  switchRow: {
    marginTop: 20,
    gap: 10,
  },
});
