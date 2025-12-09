import { useTheme } from '@/hooks/UseTheme'; // global dark mode context
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

const PROFILE_KEY = 'user_profile';

export default function Profile() {
  const [user, setUser] = useState<User>({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem(PROFILE_KEY);
        if (data) setUser(JSON.parse(data));
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const saveUser = async (updated: User) => {
    try {
      setUser(updated);
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
      Alert.alert('Profile saved!');
    } catch {
      Alert.alert('Error saving profile');
    }
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      saveUser({ ...user, avatar: result.assets[0].uri });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
        <Text style={[styles.loading, darkMode ? styles.darkText : styles.lightText]}>
          Loading profile...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>
        My Profile
      </Text>

      {/* Avatar */}
      <TouchableOpacity style={styles.avatarContainer} onPress={pickAvatar}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <Text style={[styles.avatarPlaceholder, darkMode ? styles.darkText : styles.lightText]}>
            +
          </Text>
        )}
      </TouchableOpacity>

      {/* Card */}
      <View style={[styles.card, darkMode ? styles.cardDark : styles.cardLight]}>
        <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>Name</Text>
        <TextInput
          style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
          placeholder="Enter your name"
          placeholderTextColor={darkMode ? '#aaa' : '#666'}
        />

        <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={user.email}
          editable={false}
        />

        <TouchableOpacity style={styles.saveButton} onPress={() => saveUser(user)}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  light: { backgroundColor: '#f9f9f9' },
  dark: { backgroundColor: '#111' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  loading: { marginTop: 50, textAlign: 'center' },
  darkText: { color: '#fff' },
  lightText: { color: '#000' },

  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  avatarPlaceholder: { fontSize: 40 },

  card: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardLight: { backgroundColor: '#fff' },
  cardDark: { backgroundColor: '#222' },

  label: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  inputLight: { borderColor: '#ccc', backgroundColor: '#fff', color: '#000' },
  inputDark: { borderColor: '#555', backgroundColor: '#333', color: '#fff' },
  disabled: { backgroundColor: '#eee' },

  saveButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});