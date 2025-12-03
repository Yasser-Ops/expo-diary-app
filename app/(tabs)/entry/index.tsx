import { useSession } from '@/hooks/useSession';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function EntriesPage() {
  const router = useRouter();
  const { isLoggedIn } = useSession();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace('/login'); // redirect if not logged in
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) return null; // optional loading

  return (
    <View>
      <Text>Entries List</Text>
    </View>
  );
}
