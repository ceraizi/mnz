import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export function useRedirect() {
    const {shortId} = useParams<{ shortId: string }>();
    const [error, setError] = useState<string | null>(null);

    const hasExecuted = useRef(false);

    useEffect(() => {
        const performRedirect = async () => {
            if (!shortId){
                return;
            }

            if (hasExecuted.current){
                return;
            }

            hasExecuted.current = true;

            const {data, error} = await supabase.from("links").select("id, original_url").eq("short_id", shortId).single();

            if (error || !data) {
                setError("Link not found.");
                return;
            }
            
            const {error: rpcError} = await supabase.rpc("increment_clicks", { 
                row_id: data.id 
            });

            if (rpcError){
                alert("Error counting click: " + rpcError.message);
            }

            window.location.replace(data.original_url);
        };

        performRedirect();
    }, [shortId]);

    return {error};
}