// app/(tabs)/settings.tsx
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  const router = useRouter();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('session');
    router.replace('/landing'); // navigate to landing page after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});
