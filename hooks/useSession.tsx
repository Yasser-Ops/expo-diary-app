import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export function useSession() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const token = await SecureStore.getItemAsync('sessionToken');
      setIsLoggedIn(!!token);
    };
    checkSession();
  }, []);

  return { isLoggedIn, setIsLoggedIn };
}
