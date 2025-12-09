import { useEntries } from '@/hooks/useEntries';
import { useTheme } from '@/hooks/UseTheme'; // global dark mode
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewEntry() {
  const router = useRouter();
  const { addEntry } = useEntries();
  const [title, setTitle] = useState('');
  const { darkMode } = useTheme();

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Title cannot be empty');
      return;
    }
    addEntry({ title: title.trim() });
    router.replace('/entry'); // ✅ go back to list safely
  };

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
        placeholder="Enter entry title"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
      />
      <View style={styles.actions}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  light: { backgroundColor: '#f9f9f9' },
  dark: { backgroundColor: '#111' },
  label: { fontSize: 16, marginBottom: 8 },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputLight: { borderColor: '#ccc', backgroundColor: '#fff', color: '#000' },
  inputDark: { borderColor: '#555', backgroundColor: '#333', color: '#fff' },
  actions: { marginTop: 10 },
});