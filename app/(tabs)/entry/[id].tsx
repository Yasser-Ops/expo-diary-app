import { useEntries } from '@/hooks/useEntries';
import { useTheme } from '@/hooks/UseTheme'; // global dark mode
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EntryDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, updateEntry, deleteEntry, refresh } = useEntries();
  const { darkMode } = useTheme();

  const entry = entries.find((e) => e.id === id);
  const [title, setTitle] = useState(entry?.title || '');

  useEffect(() => {
    if (!entry && id) {
      refresh();
    }
  }, [entry, id, refresh]);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
    }
  }, [entry]);

  if (!entry) {
    return (
      <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
        <Text style={[styles.notFound, darkMode ? styles.darkText : styles.lightText]}>
          Entry not found
        </Text>
        <Button title="Back to Entries" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const handleSave = async () => {
    const updated = await updateEntry(entry.id, { title });
    if (updated) {
      router.back();
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteEntry(entry.id);
          router.replace('/entry');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>Edit Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
        placeholder="Enter entry title"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
      />
      <View style={styles.actions}>
        <Button title="Save" onPress={handleSave} />
        <View style={{ height: 10 }} />
        <Button title="Delete" onPress={handleDelete} color="red" />
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
  notFound: { fontSize: 18, marginBottom: 20 },
});
