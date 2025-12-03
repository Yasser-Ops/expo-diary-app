import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const PROFILE_KEY = 'user_profile';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Please enter email and password');
      return;
    }

    // Save a mock session token
    await SecureStore.setItemAsync('session', 'mock-token');

    // Save user profile (email + empty name for now)
    const profile = { name: '', email: email.trim() };
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

    // Navigate to tabs after login
    router.replace('/(tabs)/entry');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
});