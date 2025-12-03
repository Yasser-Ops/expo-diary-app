import { useEntries } from '@/hooks/useEntries';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function EntryDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, updateEntry, deleteEntry } = useEntries();

  const entry = entries.find((e) => e.id === id);
  const [title, setTitle] = useState(entry?.title || '');

  useEffect(() => {
    if (entry) setTitle(entry.title);
  }, [entry]);

  if (!entry) return <Text>Entry not found</Text>;

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
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Edit Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 }}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Delete" onPress={handleDelete} color="red" />
    </View>
  );
}
