import { useEntries } from '@/hooks/useEntries';
import { useTheme } from '@/hooks/UseTheme'; // global dark mode
import { useRouter } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EntryIndex() {
  const router = useRouter();
  const { entries } = useEntries();
  const { darkMode } = useTheme();

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      style={[styles.entryItem, darkMode ? styles.entryItemDark : styles.entryItemLight]}
      onPress={() =>
        router.push({ pathname: '/entry/[id]', params: { id: item.id, title: item.title } })
      }
    >
      <Text style={[styles.entryTitle, darkMode ? styles.darkText : styles.lightText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.heading, darkMode ? styles.darkText : styles.lightText]}>
        Entries List
      </Text>

      {entries.length === 0 ? (
        <Text style={[styles.empty, darkMode ? styles.darkText : styles.lightText]}>
          No entries yet. Add one below!
        </Text>
      ) : (
        <FlatList data={entries} keyExtractor={(item) => item.id} renderItem={renderItem} />
      )}

      <View style={styles.actions}>
        <Button title="New Entry" onPress={() => router.push('/entry/new')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  light: { backgroundColor: '#f9f9f9' },
  dark: { backgroundColor: '#111' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
  entryItem: { padding: 15, borderBottomWidth: 1 },
  entryItemLight: { borderBottomColor: '#ddd' },
  entryItemDark: { borderBottomColor: '#444' },
  entryTitle: { fontSize: 18 },
  empty: { fontSize: 16, marginBottom: 20 },
  actions: { marginTop: 20 },
});