import { useState } from 'react';
import './Login.css';
import { LoginMethods } from './useLogin';

export function Login() {

  const [isSignUp, setIsSignUp] = useState(false);
  const {setEmail, setPassword, loading, message, handleAuth} = LoginMethods();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleAuth(isSignUp ? "signup" : "login");
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
        <p className="subtitle">{isSignUp ? "Sign up to start shortening links" : "Login to manage your links"}</p>

        {message && (
          <div className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            required 
            placeholder="you@example.com" 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            required 
            placeholder="••••••••" 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type="submit" className="btn-auth" disabled={loading}>
          {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Login")}
        </button>

        <p className="switch-mode">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login here" : "Register here"}
          </button>
        </p>
      </form>
    </div>
  );
}