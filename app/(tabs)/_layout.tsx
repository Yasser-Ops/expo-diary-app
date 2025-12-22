import { useTheme } from '@/hooks/UseTheme';
import { FontAwesome } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function TabsLayout() {
  const { darkMode } = useTheme();
  const { token, hydrating } = useAuth();

  if (hydrating) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: darkMode ? '#fff' : '#2f95dc',
        tabBarInactiveTintColor: darkMode ? '#aaa' : 'gray',
        tabBarStyle: {
          backgroundColor: darkMode ? '#000' : '#fff', // ✅ dark mode aware
          borderTopColor: darkMode ? '#333' : '#ddd',  // ✅ cleaner divider
        },
      }}
    >
      <Tabs.Screen
        name="entry"
        options={{
          title: 'Entries',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          ),
        }}
      />
      {/* Add your other tabs here */}
    </Tabs>
  );
}
