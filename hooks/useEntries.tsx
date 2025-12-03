// hooks/useEntries.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface Entry {
  id: string;
  title: string;
  category?: string;
  createdAt: string;
  isFavorite?: boolean;
}

const STORAGE_KEY = '@entries';

interface EntryContextType {
  entries: Entry[];
  addEntry: (e: Omit<Entry, 'id' | 'createdAt'>) => void;
  updateEntry: (e: Entry) => void;
  deleteEntry: (id: string) => void;
}

const EntryContext = createContext<EntryContextType | null>(null);

export const EntriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((json) => {
      if (json) setEntries(JSON.parse(json));
    });
  }, []);

  const saveEntries = async (newEntries: Entry[]) => {
    setEntries(newEntries); // update in-memory state immediately
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
  };

  const addEntry = (entry: Omit<Entry, 'id' | 'createdAt'>) =>
    saveEntries([{ ...entry, id: uuidv4(), createdAt: new Date().toISOString() }, ...entries]);

  const updateEntry = (updated: Entry) =>
    saveEntries(entries.map((e) => (e.id === updated.id ? updated : e)));

  const deleteEntry = (id: string) =>
    saveEntries(entries.filter((e) => e.id !== id));

  return (
    <EntryContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntries = () => {
  const ctx = useContext(EntryContext);
  if (!ctx) throw new Error('useEntries must be used within EntriesProvider');
  return ctx;
};
