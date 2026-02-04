import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export interface Link {
  id: string;
  original_url: string;
  short_id: string;
  clicks: number;
}

export function useLinksDisplay() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const deleteLink = async (id: string) => {
    const {error} = await supabase.from('links').delete().eq('id', id);

    if (error){
      alert('Error deleting the link: ' + error.message);
    }
    else{
      fetchLinks();
    }
  };

  const updateLink = async (id: string, newUrl: string) => {
    const {error} = await supabase.from('links').update({original_url: newUrl}).eq('id', id);

    if (error){
      alert('Error updating the link: ' + error.message);
    }
    else{
      fetchLinks();
    }
  };

  const copyToClipboard = async (shortId: string, id: string) => {
    const fullUrl = `${window.location.origin}/${shortId}`;
    
    await navigator.clipboard.writeText(fullUrl);
    
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return {links, loading, fetchLinks, handleLogout, deleteLink, updateLink, copiedId, copyToClipboard};
}