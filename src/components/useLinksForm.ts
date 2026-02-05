import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { nanoid } from 'nanoid';

export function useLinksForm(onSuccess: () => void) {
    const [url, setUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        if (!url){
            return;
        }
        
        setIsSubmitting(true);

        const shortId = nanoid(6);

        const { error } = await supabase.from("links").insert([
            { 
            original_url: url, 
            short_id: shortId 
            }
        ]);

        if (error) {
            alert("Error creating link: " + error.message);
        } else {
            setUrl("");
            onSuccess();
        }

        setIsSubmitting(false);
    };

    return {url, setUrl, isSubmitting, handleSubmit};
}