import './LinksDisplay.css';
import {useLinksDisplay} from './useLinksDisplay';
import type { Session } from '@supabase/supabase-js';
import { LinksForm } from './LinksForm';
import { useState } from 'react';

export function LinksDisplay({session}: {session: Session}) {
    const {links, loading, fetchLinks, handleLogout, deleteLink, updateLink, copiedId, copyToClipboard} = useLinksDisplay();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [tempUrl, setTempUrl] = useState("");

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
                <h2>{session.user.email}</h2>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <LinksForm onLinkCreated={fetchLinks} />

            <div className="section-title">
                <h3>Your Links</h3>
            </div>

            {loading ? 
                (<p className="loading-text" >Loading links...</p>) : 
                (links.length === 0 ? (<p className="empty-text">No links created yet. Start by adding one above.</p>) : 
                    (<ul className="links-list">
                        {links.map((link) => (
                            <li key={link.id} className="link-item">
                                {editingId === link.id ? (
                                    <div className="edit-mode">
                                        <input aria-label="Edit the original URL" placeholder="https://exemple.com" value={tempUrl} onChange={(e) => setTempUrl(e.target.value)} />
                                        <div className="actions">
                                            <button className="btn-save" onClick={() => saveEdit(link.id)}>Save</button>
                                            <button onClick={() => setEditingId(null)} className="btn-delete">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="view-mode">
                                        <div className="link-content">
                                            <div className="link-info-main">
                                                <a href={`${window.location.origin}/${link.short_id}`} target="_blank" rel="noopener noreferrer" className="short-link-anchor">
                                                    /{link.short_id}
                                                </a>
                                                <span className="clicks-badge">📈 {link.clicks || 0} clicks</span>
                                            </div>
                                            <span className="original-url-text">{link.original_url}</span>
                                        </div>
                                        
                                        <div className="actions">
                                            <button onClick={() => copyToClipboard(link.short_id, link.id)} className="btn-copy">
                                                {copiedId === link.id ? "✅ Copied!" : "📋 Copy"}
                                            </button>
                                            <button onClick={() => startEditing(link.id, link.original_url) } className="btn-edit">Edit</button>
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