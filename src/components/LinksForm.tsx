import './LinksForm.css';
import { useLinksForm } from './useLinksForm';

interface LinkFormProps {
  onLinkCreated: () => void;
}

export function LinksForm({ onLinkCreated }: LinkFormProps) {
  const {url, setUrl, isSubmitting, handleSubmit} = useLinksForm(onLinkCreated);

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <div className="link-input-group">
        <label htmlFor="url-input">Shorten a new link</label>
        <input id="url-input" type="url" className="link-input" placeholder="https://example.com/" value={url} onChange={(e) => setUrl(e.target.value)} required/>
      </div>
      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? "Generating..." : "Shorten URL"}
      </button>
    </form>
  );
}