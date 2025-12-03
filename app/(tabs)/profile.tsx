import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

const PROFILE_KEY = 'user_profile';

export default function Profile() {
  const [user, setUser] = useState<User>({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  // Load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem(PROFILE_KEY);
        if (data) {
          setUser(JSON.parse(data));
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Save user back to AsyncStorage
  const saveUser = async (updated: User) => {
    try {
      setUser(updated);
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save profile', err);
      Alert.alert('Error saving profile');
    }
  };

  // Pick avatar image
  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      saveUser({ ...user, avatar: uri });
    }
  };

  // Save profile changes
  const saveProfile = async () => {
    if (!user.name.trim()) {
      Alert.alert('Name cannot be empty');
      return;
    }
    await saveUser(user);
    Alert.alert('Profile saved!');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Text style={styles.sectionTitle}>Profile Picture</Text>
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text>No Image</Text>
        </View>
      )}
      <Button title="Change Picture" onPress={pickAvatar} />

      {/* Name */}
      <Text style={styles.sectionTitle}>Name</Text>
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
        placeholder="Enter your name"
      />

      {/* Email (read-only, from login) */}
      <Text style={styles.sectionTitle}>Email</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={user.email}
        editable={false} // email comes from login, not editable here
      />

      {/* Save Button */}
      <View style={styles.actions}>
        <Button title="Save Profile" onPress={saveProfile} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  disabledInput: { backgroundColor: '#eee' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  avatarPlaceholder: { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  actions: { marginTop: 30 },
});