import { useEntries } from '@/hooks/useEntries';
import { useRouter } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EntryIndex() {
  const router = useRouter();
  const { entries } = useEntries();

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      style={styles.entryItem}
      onPress={() => router.push({ pathname: '/entry/[id]', params: { id: item.id, title: item.title } })}
    >
      <Text style={styles.entryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Entries List</Text>

      {entries.length === 0 ? (
        <Text style={styles.empty}>No entries yet. Add one below!</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <View style={styles.actions}>
        <Button title="New Entry" onPress={() => router.push('/entry/new')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  entryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  entryTitle: { fontSize: 18 },
  empty: { fontSize: 16, color: 'gray', marginBottom: 20 },
  actions: { marginTop: 20 },
});