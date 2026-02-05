import { useState } from 'react';
import { supabase } from '../../supabaseClient';

export function LoginMethods() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "error" | "success", text: string } | null>(null);

  const handleAuth = async (type: "login" | "signup") => {
    setLoading(true);
    setMessage(null);

    const { error } = type === "login" ? await supabase.auth.signInWithPassword({ email, password }): await supabase.auth.signUp({ email, password });

    if (error){
      setMessage({ type: "error", text: error.message });
    } else if (type === "signup"){
      setMessage({ type: "success", text: "Sign Up Sucessful!" });
    } else if (type === "login"){
      setMessage({ type: "success", text: "Login Sucessful!" });
    }

    setLoading(false);
  };

  return {email, setEmail, password, setPassword, loading, message, handleAuth};
}