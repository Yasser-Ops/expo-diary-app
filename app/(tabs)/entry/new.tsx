import { useEntries } from '@/hooks/useEntries';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function NewEntry() {
  const router = useRouter();
  const { addEntry } = useEntries();
  const [title, setTitle] = useState('');

  const handleSave = async () => {
    if (!title.trim()) return;
    addEntry({ title: title.trim() });
    router.back(); // go back to list
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 }}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
