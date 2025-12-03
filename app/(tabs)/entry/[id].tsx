import { useEntries } from '@/hooks/useEntries';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function EntryDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, updateEntry, deleteEntry } = useEntries();

  const entry = entries.find((e) => e.id === id);
  const [title, setTitle] = useState(entry?.title || '');

  useEffect(() => {
    if (entry && !title) {
      setTitle(entry.title);
    }
  }, [entry]);

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Entry not found</Text>
        <Button title="Back to Entries" onPress={() => router.back()} />
      </View>
    );
  }

  const handleSave = () => {
    updateEntry({ ...entry, title });
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteEntry(entry.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Enter entry title"
      />
      <View style={styles.actions}>
        <Button title="Save" onPress={handleSave} />
        <View style={{ height: 10 }} />
        <Button title="Delete" onPress={handleDelete} color="red" />
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
  notFound: { fontSize: 18, color: 'gray', marginBottom: 20 },
});