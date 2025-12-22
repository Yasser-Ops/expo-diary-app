import { api } from '@/lib/api';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export interface Entry {
  id: string;
  title: string;
  body?: string | null;
  tags: string[];
  mood?: string | null;
  location?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface EntryContextType {
  entries: Entry[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addEntry: (e: Pick<Entry, 'title'> & Partial<Entry>) => Promise<Entry | null>;
  updateEntry: (id: string, e: Partial<Entry>) => Promise<Entry | null>;
  deleteEntry: (id: string) => Promise<void>;
}

const EntryContext = createContext<EntryContextType | null>(null);

export const EntriesProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Entry[]>('/entries');
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load entries');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setEntries([]);
      return;
    }
    refresh();
  }, [token, refresh]);

  const addEntry = useCallback(async (entry: Pick<Entry, 'title'> & Partial<Entry>) => {
    try {
      const created = await api.post<Entry>('/entries', {
        title: entry.title,
        body: entry.body ?? '',
        tags: entry.tags ?? [],
        mood: entry.mood ?? '',
        location: entry.location ?? '',
      });
      setEntries((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create entry');
      return null;
    }
  }, []);

  const updateEntry = useCallback(async (id: string, data: Partial<Entry>) => {
    try {
      const updated = await api.put<Entry>(`/entries/${id}`, data);
      setEntries((prev) => prev.map((e) => (e.id === id ? updated : e)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update entry');
      return null;
    }
  }, []);

  const deleteEntry = useCallback(async (id: string) => {
    try {
      await api.delete(`/entries/${id}`);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete entry');
    }
  }, []);

  return (
    <EntryContext.Provider value={{ entries, loading, error, refresh, addEntry, updateEntry, deleteEntry }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntries = () => {
  const ctx = useContext(EntryContext);
  if (!ctx) throw new Error('useEntries must be used within EntriesProvider');
  return ctx;
};
