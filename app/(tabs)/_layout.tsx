import { useTheme } from '@/hooks/UseTheme';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const { darkMode } = useTheme();

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