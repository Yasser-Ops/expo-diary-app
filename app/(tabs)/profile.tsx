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
  const [user, setUser] = useState<User>({ name: '', email: 'user@example.com' });
  const [name, setName] = useState('');

  // Load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem(PROFILE_KEY);
      if (data) {
        const parsed: User = JSON.parse(data);
        setUser(parsed);
        setName(parsed.name);
      }
    };
    loadUser();
  }, []);

  // Pick avatar image
  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const updated = { ...user, avatar: uri };
      setUser(updated);
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    }
  };

  // Save name changes
  const saveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Name cannot be empty');
      return;
    }
    const updated = { ...user, name };
    setUser(updated);
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    Alert.alert('Profile saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Avatar</Text>
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
          <Text>No Image</Text>
        </View>
      )}
      <Button title="Change Avatar" onPress={pickAvatar} />

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={[styles.input, { backgroundColor: '#eee' }]} value={user.email} editable={false} />

      <View style={{ marginTop: 20 }}>
        <Button title="Save Profile" onPress={saveProfile} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
});
