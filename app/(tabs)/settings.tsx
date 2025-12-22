import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/UseTheme'; // global theme context
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const confirmLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: handleLogout },
    ]);
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

      <View style={{ height: 12 }} />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
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
  logoutButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
