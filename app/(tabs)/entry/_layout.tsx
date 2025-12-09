import { useTheme } from "@/hooks/UseTheme";
import { Stack } from "expo-router";

export default function EntryLayout() {
  const { darkMode } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? "#000" : "#fff",
        },
        headerTintColor: darkMode ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Entries List" }}
      />
      <Stack.Screen
        name="new"
        options={{ headerTitle: "New Entry" }}
      />
      <Stack.Screen
        name="[id]"
        options={({
          route,
        }: {
          route: { params?: { title?: string } };
        }) => ({
          // Use the title passed in params, fallback to "Entry Details"
          headerTitle: route.params?.title ?? "Entry Details",
        })}
      />
    </Stack>
  );
}