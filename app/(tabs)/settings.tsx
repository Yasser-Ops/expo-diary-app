import { useTheme } from '@/hooks/UseTheme'; // global theme context
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  const resetData = async () => {
    try {
      await AsyncStorage.clear();
      await SecureStore.deleteItemAsync('session');
      Alert.alert('Data reset', 'All local data has been cleared.');
    } catch {
      Alert.alert('Error', 'Failed to reset data.');
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('session'); // remove session token
      await AsyncStorage.removeItem('user_profile'); // optional: clear profile
      router.replace('/landing'); // ✅ navigate back to landing
    } catch {
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>Settings</Text>

      {/* Dark Mode Toggle */}
      <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
        <Text style={[styles.optionLabel, darkMode ? styles.darkText : styles.lightText]}>
          Dark Mode
        </Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </TouchableOpacity>

      {/* Reset Data Button */}
      <TouchableOpacity style={styles.resetButton} onPress={resetData}>
        <Text style={styles.resetButtonText}>Reset All Data</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  light: { backgroundColor: '#f9f9f9' },
  dark: { backgroundColor: '#222' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  optionLabel: { fontSize: 18 },
  resetButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  resetButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  logoutButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});