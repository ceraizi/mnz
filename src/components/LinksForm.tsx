import './LinksForm.css';
import { useLinksForm } from './useLinksForm';

interface LinkFormProps {
  onLinkCreated: () => void;
}

export function LinksForm({ onLinkCreated }: LinkFormProps) {
  const {url, setUrl, isSubmitting, handleSubmit} = useLinksForm(onLinkCreated);

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <input type="url" className="link-input" placeholder="Paste your URL" value={url} onChange={(e) => setUrl(e.target.value)} required/>
      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}