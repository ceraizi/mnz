import './LinksDisplay.css';
import {useLinksDisplay} from './useLinksDisplay';
import type { Session } from '@supabase/supabase-js';
import { LinksForm } from './LinksForm';
import { useState } from 'react';

export function LinksDisplay({session}: {session: Session}) {
    const {links, loading, fetchLinks, handleLogout, deleteLink, updateLink} = useLinksDisplay();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [tempUrl, setTempUrl] = useState('');

    const startEditing = (id: string, currentUrl: string) => {
        setEditingId(id);
        setTempUrl(currentUrl);
    };

    const saveEdit = async (id: string) => {
        await updateLink(id, tempUrl);
        setEditingId(null);
    };

    return(
        <div className="container">
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
                            <li key={link.id} className="link-item">
                                {editingId === link.id ? (
                                    <div className="edit-mode">
                                        <input aria-label="Edit the original URL" placeholder="https://exemple.com" value={tempUrl} onChange={(e) => setTempUrl(e.target.value)} />
                                        <button onClick={() => saveEdit(link.id)}>Save</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="view-mode">
                                        <span>
                                            <a href={`${window.location.origin}/${link.short_id}`} target="_blank" rel="noopener noreferrer" className="short-link-anchor">
                                                <strong>{link.short_id}</strong>
                                            </a>
                                            {" → "}
                                            <span className="original-url-text">{link.original_url}</span>
                                        </span>
                                        <div className="actions">
                                            <button onClick={() => startEditing(link.id, link.original_url)}>Edit</button>
                                            <button onClick={() => deleteLink(link.id)} className="btn-delete">Delete</button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>)
                )
            }
        </div>
    );
}