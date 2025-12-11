import { useTheme } from '@/hooks/UseTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PROFILE_KEY = 'user_profile';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { darkMode } = useTheme();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Please enter email and password');
      return;
    }

    
    await SecureStore.setItemAsync('session', 'mock-token');

    try {
      const existing = await AsyncStorage.getItem(PROFILE_KEY);
      if (existing) {
       
        const parsed = JSON.parse(existing);
        const updated = { ...parsed, email: email.trim() };
        await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
      } else {
        // ✅ First-time login, create new profile
        const profile = { name: '', email: email.trim() };
        await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      }
    } catch (e) {
      Alert.alert('Error saving profile');
    }

   
    router.replace('/(tabs)/entry');
  }

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>Login</Text>

      <Text style={darkMode ? styles.darkText : styles.lightText}>Email</Text>
      <TextInput
        style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
        placeholder="you@example.com"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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

      <Button title="Login" onPress={handleLogin} />
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
});