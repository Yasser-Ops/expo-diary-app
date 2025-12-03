import { useEntries } from '@/hooks/useEntries';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function NewEntry() {
  const router = useRouter();
  const { addEntry } = useEntries();
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Title cannot be empty');
      return;
    }
    addEntry({ title: title.trim() });
    router.replace('/entry'); // ✅ go back to list safely
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Enter entry title"
      />
      <View style={styles.actions}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  actions: { marginTop: 10 },
});