import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export interface Link {
  id: string;
  original_url: string;
  short_id: string;
}

export function useLinksDisplay() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    const {data, error} = await supabase.from('links').select('*').order('created_at', { ascending: false });

    if (error){
      console.error('Error fetching links:', error);
    }
    else{
      setLinks(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {await supabase.auth.signOut();};

  useEffect(() => {
    fetchLinks();
  }, []);

  return {links, loading, fetchLinks, handleLogout};
}