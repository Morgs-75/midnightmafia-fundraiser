import { useState, useEffect } from 'react';
import { supabase, BOARD_ID } from './supabase';
import { SupporterEntry } from '../app/types';

export function useSupporters() {
  const [supporters, setSupporters] = useState<SupporterEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSupporters = async () => {
    try {
      // Get all sold numbers for this board
      const { data, error } = await supabase
        .from('numbers')
        .select('number, display_name, message, created_at')
        .eq('board_id', BOARD_ID)
        .eq('status', 'sold')
        .not('display_name', 'is', null)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const transformedSupporters: SupporterEntry[] = (data || []).map((n) => ({
        number: n.number,
        displayName: n.display_name || 'Anonymous',
        message: n.message || '',
        timestamp: new Date(n.created_at),
      }));

      setSupporters(transformedSupporters);
      setLoading(false);
    } catch (err) {
      console.error('Error loading supporters:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSupporters();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('supporters-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'numbers',
          filter: `board_id=eq.${BOARD_ID}`,
        },
        (payload) => {
          if (payload.new.status === 'sold') {
            console.log('New supporter:', payload);
            loadSupporters();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { supporters, loading, reload: loadSupporters };
}
