import './LinksDisplay.css';
import {useLinksDisplay} from './useLinksDisplay';
import type { Session } from '@supabase/supabase-js';

export function LinksDisplay({ session }: { session: Session }) {
    const { links, loading, handleLogout } = useLinksDisplay();

    return (
    <div>
        <header className="links-display-header">
            <h2>Welcome, {session.user.email}</h2>
            <button onClick={handleLogout}>Logout</button>
        </header>

        <div className="action-bar">
            <button className="btn-primary" onClick={() => {}}>+ New Link</button>
        </div>

        <h3>Your Links</h3>

        {loading ? 
            (<p>Loading...</p>) : 
            (links.length === 0 ? (<p>No Links Yet.</p>) : 
                (<ul className="links-list">
                    {links.map((link) => (
                        <li key={link.id}>
                            <strong>{link.short_id}</strong> - {link.original_url}
                        </li>
                    ))}
                </ul>)
            )
        }
    </div>
    );
}