import './LinksDisplay.css';
import {useLinksDisplay} from './useLinksDisplay';
import type { Session } from '@supabase/supabase-js';
import { LinksForm } from './LinksForm';

export function LinksDisplay({ session }: { session: Session }) {
    const { links, loading, fetchLinks, handleLogout } = useLinksDisplay();

    return (
    <div>
        <header className="links-display-header">
            <h2>Welcome, {session.user.email}</h2>
            <button onClick={handleLogout}>Logout</button>
        </header>

        <LinksForm onLinkCreated={fetchLinks} />

        <h3>Your Links</h3>

        {loading ? 
            (<p>Loading...</p>) : 
            (links.length === 0 ? (<p>No Links Yet.</p>) : 
                (<ul className="links-list">
                    {links.map((link) => (
                        <li key={link.id}>
                           <a href={`${window.location.origin}/${link.short_id}`} target="_blank" rel="noreferrer">{window.location.origin}/{link.short_id}</a> - {link.original_url}
                        </li>
                    ))}
                </ul>)
            )
        }
    </div>
    );
}