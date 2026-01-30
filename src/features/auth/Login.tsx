import './Login.css';
import { LoginMethods } from './useLogin';

export function Login() {

  const {setEmail, setPassword, handleLogin, handleSignUp} = LoginMethods();

  return (
    <div className="login-div">
      <h2>Login or Sign Up</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}