import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export function useRedirect() {
    const {shortId} = useParams<{ shortId: string }>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const performRedirect = async () => {
            if (!shortId){
                return;
            }

            const {data, error} = await supabase.from('links').select('original_url').eq('short_id', shortId).single();

            if (error || !data) {
                setError('Link not found.');
                return;
            }

            window.location.replace(data.original_url);
        };

        performRedirect();
    }, [shortId]);

    return {error};
}