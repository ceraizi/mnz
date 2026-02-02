import { useState } from 'react';
import { supabase } from '../../supabaseClient';

export function LoginMethods() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error){
      alert('Error in the sign up: ' + error.message);
    }
    else{
      alert('Sign Up Sucessful!');
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error){
      alert('Error in the login: ' + error.message);
    }
    else{
      alert('Login Successful!');
    }
  };

  return {email, setEmail, password, setPassword, handleSignUp, handleLogin};
}