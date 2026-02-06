import { useRedirect } from './useRedirect';
import './Redirect.css';

export function Redirect() {
  const {error} = useRedirect();

  if (error) {
    return (
      <div className="redirect-container">
        <div className="error-card">
          <h1>404</h1>
          <p>{error}</p>
          <a href="/" className="back-button">Return to Homepage</a>
        </div>
      </div>
    );
  }

  return (
    <div className="redirect-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2>Redirecting you...</h2>
      </div>
    </div>
  );
}