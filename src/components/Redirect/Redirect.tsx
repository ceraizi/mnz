import { useRedirect } from './useRedirect';
import './Redirect.css';

export function Redirect() {
  const {error} = useRedirect();

  if (error) {
    return (
      <div className="redirect-div">
        <h1>404</h1>
        <p>{error}</p>
        <a href="/">Go back to the home page.</a>
      </div>
    );
  }

  return (
    <div className="redirect-div">
      <h2>Redirecting...</h2>
    </div>
  );
}