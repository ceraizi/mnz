import { Login } from './features/auth/Login';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { LinksDisplay } from './components/LinksDisplay';
import type { Session } from '@supabase/supabase-js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Redirect } from './components/Redirect/Redirect';
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={
              <div className="content-wrapper">
                <h1 className="main-title">mnz</h1>
                {!session ? <Login /> : <LinksDisplay session={session} />}
              </div>
            } 
          />

          <Route path="/:shortId" element={<Redirect />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;