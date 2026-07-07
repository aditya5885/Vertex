import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import type { SiteContent } from "../../data/defaultContent";
import { defaultServicesSubpages, defaultProjectsSubpages } from "../../data/subpageDefaults";
import { 
    FaGlobe, FaHome, FaInfoCircle, FaCogs, FaProjectDiagram, 
    FaUpload, FaSignOutAlt, FaSave, FaPlus, FaTrash, 
    FaCheck, FaImage, FaClipboard, FaBoxes, FaDownload, FaPhoneAlt
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
    const { content, loading, saveContent, isLoggedIn, logout } = useContent();
    const navigate = useNavigate();

    // Draft local copy state
    const [draft, setDraft] = useState<SiteContent | null>(null);
    const [activeTab, setActiveTab] = useState<"nav-footer" | "home" | "about" | "services" | "projects" | "products" | "downloads" | "contact" | "quote" | "services-subpages" | "projects-subpages" | "media">("nav-footer");
    
    // Selected Subpages Keys State
    const [selectedServiceKey, setSelectedServiceKey] = useState("control-panels");
    const [selectedProjectKey, setSelectedProjectKey] = useState("control-panels-automation");
    
    // Status indicators
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
    const [statusText, setStatusText] = useState("");
    
    // Media Upload helpers
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [uploadedFilesList, setUploadedFilesList] = useState<string[]>([]);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate("/admin/login");
        }
    }, [isLoggedIn, loading, navigate]);

    // Load content into draft state
    useEffect(() => {
        if (content) {
            setDraft(JSON.parse(JSON.stringify(content))); // Deep clone
        }
    }, [content]);

    if (loading || !draft) {
        return (
            <div className="admin-loading-container">
                <div className="admin-spinner"></div>
                <p>Loading CMS Configurator...</p>
            </div>
        );
    }

    // Generic text updates helper
    const updateField = (pathStr: string, value: any) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const keys = pathStr.split(".");
            let current: any = next;
            
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return next;
        });
    };

    // Generic list field changes
    const updateListItem = (tab: keyof SiteContent, listKey: string, index: number, field: string, value: any) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const list = (next[tab] as any)[listKey];
            if (list && list[index]) {
                list[index][field] = value;
            }
            return next;
        });
    };

    // Add list item
    const addListItem = (tab: keyof SiteContent, listKey: string, emptyTemplate: any) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const list = (next[tab] as any)[listKey];
            if (list) {
                list.push(emptyTemplate);
            }
            return next;
        });
    };

    // Delete list item
    const deleteListItem = (tab: keyof SiteContent, listKey: string, index: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const list = (next[tab] as any)[listKey];
            if (list) {
                list.splice(index, 1);
            }
            return next;
        });
    };

    // Quote features helpers
    const addQuoteFeature = () => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (!next.quote.infoCard.features) {
                next.quote.infoCard.features = [];
            }
            next.quote.infoCard.features.push({ title: "New Feature", desc: "Feature explanation copy details" });
            return next;
        });
    };

    const deleteQuoteFeature = (index: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.quote.infoCard.features) {
                next.quote.infoCard.features.splice(index, 1);
            }
            return next;
        });
    };

    const updateQuoteFeature = (index: number, field: "title" | "desc", value: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.quote.infoCard.features && next.quote.infoCard.features[index]) {
                next.quote.infoCard.features[index][field] = value;
            }
            return next;
        });
    };

    // Navbar specific helper methods
    const updateNavLink = (index: number, field: "name" | "path", value: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.navbar && next.navbar.navLinks && next.navbar.navLinks[index]) {
                next.navbar.navLinks[index][field] = value;
            }
            return next;
        });
    };

    const addNavLink = () => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (!next.navbar) {
                next.navbar = { logoUrl: "/Vertex_logo.png", navLinks: [] };
            }
            if (!next.navbar.navLinks) {
                next.navbar.navLinks = [];
            }
            next.navbar.navLinks.push({ name: "New Link", path: "/" });
            return next;
        });
    };

    const deleteNavLink = (index: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.navbar && next.navbar.navLinks) {
                next.navbar.navLinks.splice(index, 1);
            }
            return next;
        });
    };

    const updateSubmenuItem = (linkIdx: number, subIdx: number, field: "name" | "path", value: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const link = next.navbar?.navLinks?.[linkIdx];
            if (link) {
                if (!link.submenus) {
                    link.submenus = [];
                }
                if (link.submenus[subIdx]) {
                    link.submenus[subIdx][field] = value;
                }
            }
            return next;
        });
    };

    const addSubmenuItem = (linkIdx: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const link = next.navbar?.navLinks?.[linkIdx];
            if (link) {
                if (!link.submenus) {
                    link.submenus = [];
                }
                link.submenus.push({ name: "New Submenu Item", path: "/" });
            }
            return next;
        });
    };

    const deleteSubmenuItem = (linkIdx: number, subIdx: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const link = next.navbar?.navLinks?.[linkIdx];
            if (link && link.submenus) {
                link.submenus.splice(subIdx, 1);
                if (link.submenus.length === 0) {
                    delete link.submenus;
                }
            }
            return next;
        });
    };

    // String array helpers
    const updateStringListItem = (tab: keyof SiteContent, listKey: string, index: number, value: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const list = (next[tab] as any)[listKey];
            if (list) {
                list[index] = value;
            }
            return next;
        });
    };

    const addStringListItem = (tab: keyof SiteContent, listKey: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const list = (next[tab] as any)[listKey];
            if (list) {
                list.push("New Item Value");
            }
            return next;
        });
    };

    const deleteStringListItem = (tab: keyof SiteContent, listKey: string, index: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            const list = (next[tab] as any)[listKey];
            if (list) {
                list.splice(index, 1);
            }
            return next;
        });
    };

    // Products page helper methods
    const updateProductFeature = (prodIdx: number, featIdx: number, value: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.productList?.[prodIdx]?.features) {
                next.products.productList[prodIdx].features[featIdx] = value;
            }
            return next;
        });
    };

    const addProductFeature = (prodIdx: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.productList?.[prodIdx]) {
                if (!next.products.productList[prodIdx].features) {
                    next.products.productList[prodIdx].features = [];
                }
                next.products.productList[prodIdx].features.push("New Feature Highlight");
            }
            return next;
        });
    };

    const deleteProductFeature = (prodIdx: number, featIdx: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.productList?.[prodIdx]?.features) {
                next.products.productList[prodIdx].features.splice(featIdx, 1);
            }
            return next;
        });
    };

    const updateFeaturedApp = (idx: number, value: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.featuredProduct?.applications) {
                next.products.featuredProduct.applications[idx] = value;
            }
            return next;
        });
    };

    const addFeaturedApp = () => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.featuredProduct) {
                if (!next.products.featuredProduct.applications) {
                    next.products.featuredProduct.applications = [];
                }
                next.products.featuredProduct.applications.push("New Application");
            }
            return next;
        });
    };

    const deleteFeaturedApp = (idx: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.featuredProduct?.applications) {
                next.products.featuredProduct.applications.splice(idx, 1);
            }
            return next;
        });
    };

    const updateFeaturedSpec = (idx: number, field: "name" | "value", value: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.featuredProduct?.specs?.[idx]) {
                next.products.featuredProduct.specs[idx][field] = value;
            }
            return next;
        });
    };

    const addFeaturedSpec = () => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.featuredProduct) {
                if (!next.products.featuredProduct.specs) {
                    next.products.featuredProduct.specs = [];
                }
                next.products.featuredProduct.specs.push({ name: "Specification Parameter", value: "Value" });
            }
            return next;
        });
    };

    const deleteFeaturedSpec = (idx: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.featuredProduct?.specs) {
                next.products.featuredProduct.specs.splice(idx, 1);
            }
            return next;
        });
    };

    const updateWhyBullet = (whyIdx: number, bulletIdx: number, value: string) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.whyChooseList?.[whyIdx]?.bullets) {
                next.products.whyChooseList[whyIdx].bullets[bulletIdx] = value;
            }
            return next;
        });
    };

    const addWhyBullet = (whyIdx: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.whyChooseList?.[whyIdx]) {
                if (!next.products.whyChooseList[whyIdx].bullets) {
                    next.products.whyChooseList[whyIdx].bullets = [];
                }
                next.products.whyChooseList[whyIdx].bullets.push("New Bullet Quality Check");
            }
            return next;
        });
    };

    const deleteWhyBullet = (whyIdx: number, bulletIdx: number) => {
        setDraft(prev => {
            if (!prev) return null;
            const next = { ...prev };
            if (next.products?.whyChooseList?.[whyIdx]?.bullets) {
                next.products.whyChooseList[whyIdx].bullets.splice(bulletIdx, 1);
            }
            return next;
        });
    };

    // Save All draft changes to Node Server
    const handleSaveAll = async () => {
        setSaveStatus("saving");
        setStatusText("Saving content changes to disk...");
        
        const success = await saveContent(draft);
        if (success) {
            setSaveStatus("success");
            setStatusText("All changes saved and live!");
            setTimeout(() => setSaveStatus("idle"), 2500);
        } else {
            setSaveStatus("error");
            setStatusText("Failed to write to file system. Check server logs.");
            setTimeout(() => setSaveStatus("idle"), 4000);
        }
    };

    // Base64 File Uploader handler
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadedUrl("");
        setCopied(false);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Data = reader.result as string;

            try {
                const token = sessionStorage.getItem("adminToken") || "";
                const res = await fetch("/api/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        filename: file.name,
                        fileData: base64Data
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    setUploadedUrl(data.url);
                    setUploadedFilesList(prev => [data.url, ...prev]);
                } else {
                    alert("Upload failed. Make sure your server is running.");
                }
            } catch (err) {
                console.error("Upload error:", err);
                alert("Network error. Upload failed.");
            } finally {
                setUploading(false);
            }
        };
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="admin-dashboard-container">
            {/* LEFT SIDEBAR PANEL */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <img src="/favicon.png" alt="Logo" />
                    <div>
                        <h2>Vertex Admin</h2>
                        <span>File Database CMS v1.0</span>
                    </div>
                </div>

                <nav className="sidebar-menu">
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "nav-footer" ? "active" : ""}`}
                        onClick={() => setActiveTab("nav-footer")}
                    >
                        <FaGlobe /> <span>Global & Nav</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "home" ? "active" : ""}`}
                        onClick={() => setActiveTab("home")}
                    >
                        <FaHome /> <span>Home Page</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "about" ? "active" : ""}`}
                        onClick={() => setActiveTab("about")}
                    >
                        <FaInfoCircle /> <span>About Page</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "services" ? "active" : ""}`}
                        onClick={() => setActiveTab("services")}
                    >
                        <FaCogs /> <span>Services Panel</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "projects" ? "active" : ""}`}
                        onClick={() => setActiveTab("projects")}
                    >
                        <FaProjectDiagram /> <span>Projects Panel</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "products" ? "active" : ""}`}
                        onClick={() => setActiveTab("products")}
                    >
                        <FaBoxes /> <span>Products Panel</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "downloads" ? "active" : ""}`}
                        onClick={() => setActiveTab("downloads")}
                    >
                        <FaDownload /> <span>Downloads Center</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "contact" ? "active" : ""}`}
                        onClick={() => setActiveTab("contact")}
                    >
                        <FaPhoneAlt /> <span>Contact Page</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "quote" ? "active" : ""}`}
                        onClick={() => setActiveTab("quote")}
                    >
                        <FaClipboard /> <span>Quote Page</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "services-subpages" ? "active" : ""}`}
                        onClick={() => setActiveTab("services-subpages")}
                    >
                        <FaCogs /> <span>Services Subpages</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "projects-subpages" ? "active" : ""}`}
                        onClick={() => setActiveTab("projects-subpages")}
                    >
                        <FaProjectDiagram /> <span>Projects Subpages</span>
                    </button>
                    <button 
                        className={`sidebar-menu-btn ${activeTab === "media" ? "active" : ""}`}
                        onClick={() => setActiveTab("media")}
                    >
                        <FaUpload /> <span>Media Uploader</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={logout} className="sidebar-logout-btn">
                        <FaSignOutAlt /> <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* MAIN MAIN CONTENT CONTAINER */}
            <main className="admin-main-panel">
                {/* STICKY HEADER ACTIONS BAR */}
                <header className="admin-header-bar">
                    <div className="header-status">
                        <h3>Editing: {activeTab.replace("-", " ").toUpperCase()}</h3>
                        <span className="live-badge">● LIVE DEV DATABASE</span>
                    </div>
                    
                    <div className="header-actions">
                        {saveStatus !== "idle" && (
                            <div className={`status-toast ${saveStatus}`}>
                                <span>{statusText}</span>
                            </div>
                        )}
                        <button onClick={handleSaveAll} className="btn btn-primary save-all-btn" disabled={saveStatus === "saving"}>
                            <FaSave /> <span>{saveStatus === "saving" ? "Saving..." : "Save All Changes"}</span>
                        </button>
                    </div>
                </header>

                <div className="admin-content-viewport">
                    {/* 1. TAB: NAVBAR & FOOTER GLOBAL SETTINGS */}
                    {activeTab === "nav-footer" && (
                        <div className="tab-pane" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                            {/* Header Configuration */}
                            <div className="dashboard-card">
                                <h3>Global Header Configuration</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Website Logo Path / URL</label>
                                        <input 
                                            type="text" 
                                            value={draft.navbar.logoUrl} 
                                            onChange={(e) => updateField("navbar.logoUrl", e.target.value)} 
                                        />
                                        <p className="hint-p" style={{ marginTop: "0.25rem" }}>
                                            Recommended: Use `/Vertex_logo.png` or upload a new image inside the <strong>Media Uploader</strong> tab and paste the link here.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Menus */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Navigation Menu Items</h3>
                                    <button 
                                        type="button"
                                        onClick={addNavLink} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Main Link
                                    </button>
                                </div>

                                <div className="items-list-editor">
                                    {draft.navbar.navLinks.map((link, linkIdx) => (
                                        <div key={linkIdx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Main Link #{linkIdx + 1}: {link.name}</h4>
                                                <button 
                                                    type="button" 
                                                    onClick={() => deleteNavLink(linkIdx)} 
                                                    className="delete-btn-icon"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Link Label Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={link.name} 
                                                        onChange={(e) => updateNavLink(linkIdx, "name", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Destination Path (e.g. /about, /services)</label>
                                                    <input 
                                                        type="text" 
                                                        value={link.path} 
                                                        onChange={(e) => updateNavLink(linkIdx, "path", e.target.value)} 
                                                    />
                                                </div>
                                            </div>

                                            {/* Submenus section */}
                                            <div className="submenu-editor-section" style={{ marginTop: "1.5rem", paddingLeft: "1.5rem", borderLeft: "2px solid rgba(0, 194, 255, 0.2)" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                                    <h5 style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>Submenu Links</h5>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => addSubmenuItem(linkIdx)} 
                                                        className="btn btn-secondary btn-sm"
                                                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                                                    >
                                                        <FaPlus /> Add Submenu Link
                                                    </button>
                                                </div>
                                                {(!link.submenus || link.submenus.length === 0) ? (
                                                    <p style={{ color: "var(--gray)", fontSize: "0.85rem", fontStyle: "italic" }}>No submenu items configured for this link.</p>
                                                ) : (
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                                        {link.submenus.map((sub, subIdx) => (
                                                            <div key={subIdx} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                                                <div className="form-group" style={{ flex: 1 }}>
                                                                    <label style={{ fontSize: "0.75rem" }}>Submenu Label</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={sub.name} 
                                                                        onChange={(e) => updateSubmenuItem(linkIdx, subIdx, "name", e.target.value)} 
                                                                        style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                                                                    />
                                                                </div>
                                                                <div className="form-group" style={{ flex: 1.5 }}>
                                                                    <label style={{ fontSize: "0.75rem" }}>Submenu Path</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={sub.path} 
                                                                        onChange={(e) => updateSubmenuItem(linkIdx, subIdx, "path", e.target.value)} 
                                                                        style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                                                                    />
                                                                </div>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => deleteSubmenuItem(linkIdx, subIdx)} 
                                                                    className="delete-btn-icon" 
                                                                    style={{ marginTop: "1.2rem", padding: "0.4rem" }}
                                                                >
                                                                    <FaTrash size={14} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Configuration */}
                            <div className="dashboard-card">
                                <h3>Global Footer & Contacts Data</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Company Address</label>
                                        <input 
                                            type="text" 
                                            value={draft.footer.address} 
                                            onChange={(e) => updateField("footer.address", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Office Telephone</label>
                                        <input 
                                            type="text" 
                                            value={draft.footer.phone} 
                                            onChange={(e) => updateField("footer.phone", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Sales Email Address</label>
                                        <input 
                                            type="text" 
                                            value={draft.footer.email} 
                                            onChange={(e) => updateField("footer.email", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>WhatsApp Number Link</label>
                                        <input 
                                            type="text" 
                                            value={draft.footer.whatsapp} 
                                            onChange={(e) => updateField("footer.whatsapp", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Legal Company Name</label>
                                        <input 
                                            type="text" 
                                            value={draft.footer.companyName} 
                                            onChange={(e) => updateField("footer.companyName", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Copyright Note</label>
                                        <input 
                                            type="text" 
                                            value={draft.footer.copyright} 
                                            onChange={(e) => updateField("footer.copyright", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. TAB: HOME PAGE EDITOR */}
                    {activeTab === "home" && (
                        <div className="tab-pane">
                            <div className="dashboard-card">
                                <h3>Hero Section Copy</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Hero Category Badge</label>
                                        <input 
                                            type="text" 
                                            value={draft.home.hero.badge} 
                                            onChange={(e) => updateField("home.hero.badge", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Main Title Line</label>
                                        <input 
                                            type="text" 
                                            value={draft.home.hero.title} 
                                            onChange={(e) => updateField("home.hero.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Title Gradient Highlight</label>
                                        <input 
                                            type="text" 
                                            value={draft.home.hero.highlightText} 
                                            onChange={(e) => updateField("home.hero.highlightText", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Introduction Lead Paragraph</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.home.hero.lead} 
                                            onChange={(e) => updateField("home.hero.lead", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <h3>Statistics Highlights (4 Items)</h3>
                                <div className="stats-edit-grid">
                                    {draft.home.stats.map((stat, idx) => (
                                        <div key={idx} className="stat-edit-card">
                                            <div className="form-group">
                                                <label>Counter Value</label>
                                                <input 
                                                    type="text" 
                                                    value={stat.num} 
                                                    onChange={(e) => updateListItem("home", "stats", idx, "num", e.target.value)} 
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Label</label>
                                                <input 
                                                    type="text" 
                                                    value={stat.label} 
                                                    onChange={(e) => updateListItem("home", "stats", idx, "label", e.target.value)} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <h3>Home Brief "Who We Are" Copy</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Who We Are Section Subtag</label>
                                        <input 
                                            type="text" 
                                            value={draft.home.aboutShort.subTag} 
                                            onChange={(e) => updateField("home.aboutShort.subTag", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Section Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.home.aboutShort.title} 
                                            onChange={(e) => updateField("home.aboutShort.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Lead Paragraph</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.home.aboutShort.lead} 
                                            onChange={(e) => updateField("home.aboutShort.lead", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Supporting Paragraph</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.home.aboutShort.body} 
                                            onChange={(e) => updateField("home.aboutShort.body", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose Us Reasons */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Why Choose Us Reasons</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addStringListItem("home", "whyChoose")} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Reason
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.home.whyChoose || []).map((reason, idx) => (
                                        <div key={idx} className="item-editor-block" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                            <div className="form-group" style={{ flex: 1 }}>
                                                <label>Reason #{idx + 1}</label>
                                                <input 
                                                    type="text" 
                                                    value={reason} 
                                                    onChange={(e) => updateStringListItem("home", "whyChoose", idx, e.target.value)} 
                                                />
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => deleteStringListItem("home", "whyChoose", idx)} 
                                                className="delete-btn-icon"
                                                style={{ marginTop: "1.2rem" }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Solutions Grid */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Featured Solutions Grid (6 Cards)</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("home", "solutions", { title: "New Solution", cat: "Category Name", spec: "Specification details", image: "/Images/Products/control_panels.png" })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Solution
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.home.solutions || []).map((sol, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Solution #{idx + 1}: {sol.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("home", "solutions", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Solution Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={sol.title} 
                                                        onChange={(e) => updateListItem("home", "solutions", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Category Label</label>
                                                    <input 
                                                        type="text" 
                                                        value={sol.cat} 
                                                        onChange={(e) => updateListItem("home", "solutions", idx, "cat", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Technical Specification</label>
                                                    <input 
                                                        type="text" 
                                                        value={sol.spec} 
                                                        onChange={(e) => updateListItem("home", "solutions", idx, "spec", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Image Cover Path</label>
                                                    <input 
                                                        type="text" 
                                                        value={sol.image} 
                                                        onChange={(e) => updateListItem("home", "solutions", idx, "image", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Process Steps Timeline */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Process Steps Timeline</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("home", "process", { title: "New Step", desc: "Short description of what happens." })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Step
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.home.process || []).map((step, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Step #{idx + 1}: {step.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("home", "process", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Step Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={step.title} 
                                                        onChange={(e) => updateListItem("home", "process", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Step Description</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={step.desc} 
                                                        onChange={(e) => updateListItem("home", "process", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Project Highlights Showcase */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Project Highlights Showcase</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("home", "projectHighlights", { title: "New Highlight Project", cat: "Category Name", location: "Dubai, UAE", desc: "Short explanation of delivery.", image: "/Images/Products/control_panels.png" })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Highlight
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.home.projectHighlights || []).map((proj, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Highlight #{idx + 1}: {proj.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("home", "projectHighlights", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Project Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={proj.title} 
                                                        onChange={(e) => updateListItem("home", "projectHighlights", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Sector Category</label>
                                                    <input 
                                                        type="text" 
                                                        value={proj.cat} 
                                                        onChange={(e) => updateListItem("home", "projectHighlights", idx, "cat", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Execution Location</label>
                                                    <input 
                                                        type="text" 
                                                        value={proj.location} 
                                                        onChange={(e) => updateListItem("home", "projectHighlights", idx, "location", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Cover Image URL</label>
                                                    <input 
                                                        type="text" 
                                                        value={proj.image} 
                                                        onChange={(e) => updateListItem("home", "projectHighlights", idx, "image", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Highlight Description</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={proj.desc} 
                                                        onChange={(e) => updateListItem("home", "projectHighlights", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Section Panel Details */}
                            <div className="dashboard-card">
                                <h3>Contact Section Panel Details</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Address Preview Copy</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.home.contactPreview?.address} 
                                            onChange={(e) => updateField("home.contactPreview.address", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Contact Preview</label>
                                        <input 
                                            type="text" 
                                            value={draft.home.contactPreview?.phone} 
                                            onChange={(e) => updateField("home.contactPreview.phone", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Contact Preview</label>
                                        <input 
                                            type="text" 
                                            value={draft.home.contactPreview?.email} 
                                            onChange={(e) => updateField("home.contactPreview.email", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Google Maps Iframe src URL (Embed URL)</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.home.contactPreview?.mapEmbedUrl} 
                                            onChange={(e) => updateField("home.contactPreview.mapEmbedUrl", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. TAB: ABOUT PAGE EDITOR */}
                    {activeTab === "about" && (
                        <div className="tab-pane">
                            <div className="dashboard-card">
                                <h3>About Page Hero Info</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Hero Category Badge</label>
                                        <input 
                                            type="text" 
                                            value={draft.about.hero.badge} 
                                            onChange={(e) => updateField("about.hero.badge", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.about.hero.title} 
                                            onChange={(e) => updateField("about.hero.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Lead Text</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.about.hero.lead} 
                                            onChange={(e) => updateField("about.hero.lead", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <h3>Mission & Vision Statements</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Mission Statement Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.about.mission.title} 
                                            onChange={(e) => updateField("about.mission.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Vision Statement Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.about.vision.title} 
                                            onChange={(e) => updateField("about.vision.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Mission Statement Body Copy</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.about.mission.body} 
                                            onChange={(e) => updateField("about.mission.body", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Vision Statement Body Copy</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.about.vision.body} 
                                            onChange={(e) => updateField("about.vision.body", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Company Profile Detailed Overview Copy */}
                            <div className="dashboard-card">
                                <h3>Company Profile Detailed Overview Copy</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Overview Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.about.overview?.title} 
                                            onChange={(e) => updateField("about.overview.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Overview Detailed Body Text</label>
                                        <textarea 
                                            rows={5} 
                                            value={draft.about.overview?.body} 
                                            onChange={(e) => updateField("about.overview.body", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Overview Image URL</label>
                                        <input 
                                            type="text" 
                                            value={draft.about.overview?.image} 
                                            onChange={(e) => updateField("about.overview.image", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Glass Floating Badge Text (newline separated: line 1 strong, line 2 normal)</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.about.overview?.badgeText} 
                                            onChange={(e) => updateField("about.overview.badgeText", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Core Pillars & Corporate Values */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Core Pillars & Corporate Values</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("about", "values", { title: "New Value", desc: "Value description details." })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Value Card
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.about.values || []).map((val, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Value #{idx + 1}: {val.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("about", "values", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group col-span-2">
                                                    <label>Value Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={val.title} 
                                                        onChange={(e) => updateListItem("about", "values", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Value Explanation</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={val.desc} 
                                                        onChange={(e) => updateListItem("about", "values", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why Choose Vertex Reasons */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Why Choose Vertex Reasons</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addStringListItem("about", "whyChoose")} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Reason
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.about.whyChoose || []).map((reason, idx) => (
                                        <div key={idx} className="item-editor-block" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                            <div className="form-group" style={{ flex: 1 }}>
                                                <label>Reason #{idx + 1}</label>
                                                <input 
                                                    type="text" 
                                                    value={reason} 
                                                    onChange={(e) => updateStringListItem("about", "whyChoose", idx, e.target.value)} 
                                                />
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => deleteStringListItem("about", "whyChoose", idx)} 
                                                className="delete-btn-icon"
                                                style={{ marginTop: "1.2rem" }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Statistics Counters Highlights */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Statistics Counters Highlights</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("about", "stats", { value: 10, suffix: "+", label: "Enterprise clients" })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Counter
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.about.stats || []).map((stat, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Counter #{idx + 1}: {stat.label}</h4>
                                                <button type="button" onClick={() => deleteListItem("about", "stats", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Label</label>
                                                    <input 
                                                        type="text" 
                                                        value={stat.label} 
                                                        onChange={(e) => updateListItem("about", "stats", idx, "label", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Numeric Value</label>
                                                    <input 
                                                        type="number" 
                                                        value={stat.value} 
                                                        onChange={(e) => updateListItem("about", "stats", idx, "value", parseInt(e.target.value) || 0)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Suffix (e.g. +, /7, %)</label>
                                                    <input 
                                                        type="text" 
                                                        value={stat.suffix} 
                                                        onChange={(e) => updateListItem("about", "stats", idx, "suffix", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* About Page Call To Action (CTA) Copy */}
                            <div className="dashboard-card">
                                <h3>About Page Call To Action (CTA) Copy</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>CTA Title Banner</label>
                                        <input 
                                            type="text" 
                                            value={draft.about.cta?.title} 
                                            onChange={(e) => updateField("about.cta.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>CTA Subtext Description</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.about.cta?.desc} 
                                            onChange={(e) => updateField("about.cta.desc", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. TAB: SERVICES PORTAL LIST */}
                    {activeTab === "services" && (
                        <div className="tab-pane">
                            <div className="dashboard-card">
                                <h3>Services Page Hero Headers</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Services Main Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.services.hero.title} 
                                            onChange={(e) => updateField("services.hero.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Description Subtext</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.services.hero.lead} 
                                            onChange={(e) => updateField("services.hero.lead", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Manage Core Services List</h3>
                                    <button 
                                        onClick={() => addListItem("services", "list", { title: "New Service Offered", desc: "Short description details.", link: "/services" })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add New Service
                                    </button>
                                </div>

                                <div className="items-list-editor">
                                    {draft.services.list.map((serv, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Service #{idx + 1}: {serv.title}</h4>
                                                <button onClick={() => deleteListItem("services", "list", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group col-span-2">
                                                    <label>Service Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={serv.title} 
                                                        onChange={(e) => updateListItem("services", "list", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Navigation Link Path</label>
                                                    <input 
                                                        type="text" 
                                                        value={serv.link} 
                                                        onChange={(e) => updateListItem("services", "list", idx, "link", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Project Execution Workflow Steps */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Project Execution Workflow Steps</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("services", "workflow", { title: "New Workflow Step", desc: "Short details of the process step." })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Step
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.services.workflow || []).map((step, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Workflow Step #{idx + 1}: {step.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("services", "workflow", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Step Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={step.title} 
                                                        onChange={(e) => updateListItem("services", "workflow", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Step Description</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={step.desc} 
                                                        onChange={(e) => updateListItem("services", "workflow", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why Choose Vertex Highlights */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Why Choose Vertex Highlights</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("services", "whyChoose", { title: "New Advantage Point", desc: "Detailed explanation." })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Advantage
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.services.whyChoose || []).map((item, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Advantage #{idx + 1}: {item.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("services", "whyChoose", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Advantage Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={item.title} 
                                                        onChange={(e) => updateListItem("services", "whyChoose", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Detailed Explanation</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={item.desc} 
                                                        onChange={(e) => updateListItem("services", "whyChoose", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Target Served Industries */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Target Served Industries</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addStringListItem("services", "industries")} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Industry
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.services.industries || []).map((ind, idx) => (
                                        <div key={idx} className="item-editor-block" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                            <div className="form-group" style={{ flex: 1 }}>
                                                <label>Industry Name #{idx + 1}</label>
                                                <input 
                                                    type="text" 
                                                    value={ind} 
                                                    onChange={(e) => updateStringListItem("services", "industries", idx, e.target.value)} 
                                                />
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => deleteStringListItem("services", "industries", idx)} 
                                                className="delete-btn-icon"
                                                style={{ marginTop: "1.2rem" }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Technologies Chips */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Featured Technologies Chips</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addStringListItem("services", "technologies")} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Chip
                                    </button>
                                </div>
                                <div className="items-list-editor" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                    {(draft.services.technologies || []).map((tech, idx) => (
                                        <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "0.5rem", borderRadius: "8px" }}>
                                            <input 
                                                type="text" 
                                                value={tech} 
                                                onChange={(e) => updateStringListItem("services", "technologies", idx, e.target.value)} 
                                                style={{ width: "150px", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => deleteStringListItem("services", "technologies", idx)} 
                                                className="delete-btn-icon"
                                                style={{ padding: "0.2rem", margin: 0 }}
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Capabilities Tags for Intro */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Capabilities Tags for Intro</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addStringListItem("services", "capabilities")} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Tag
                                    </button>
                                </div>
                                <div className="items-list-editor" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                    {(draft.services.capabilities || []).map((cap, idx) => (
                                        <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "0.5rem", borderRadius: "8px" }}>
                                            <input 
                                                type="text" 
                                                value={cap} 
                                                onChange={(e) => updateStringListItem("services", "capabilities", idx, e.target.value)} 
                                                style={{ width: "130px", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => deleteStringListItem("services", "capabilities", idx)} 
                                                className="delete-btn-icon"
                                                style={{ padding: "0.2rem", margin: 0 }}
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. TAB: PROJECTS PORTFOLIO */}
                    {activeTab === "projects" && (
                        <div className="tab-pane">
                            <div className="dashboard-card">
                                <h3>Projects Page Headers</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Hero Title Header</label>
                                        <input 
                                            type="text" 
                                            value={draft.projects.hero.title} 
                                            onChange={(e) => updateField("projects.hero.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Lead description</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.projects.hero.lead} 
                                            onChange={(e) => updateField("projects.hero.lead", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PROJECT CATEGORIES / CAPABILITIES LIST */}
                            <div className="dashboard-card">
                                <h3>Featured Project Sectors (Grid Cards)</h3>
                                <div className="items-list-editor">
                                    {draft.projects.categories.map((cat, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Sector Card #{idx + 1}: {cat.title}</h4>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group col-span-2">
                                                    <label>Sector Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={cat.title} 
                                                        onChange={(e) => updateListItem("projects", "categories", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Card Description</label>
                                                    <input 
                                                        type="text" 
                                                        value={cat.desc} 
                                                        onChange={(e) => updateListItem("projects", "categories", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Scope of Work Details</label>
                                                    <input 
                                                        type="text" 
                                                        value={cat.scope} 
                                                        onChange={(e) => updateListItem("projects", "categories", idx, "scope", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Card WebP Image Path</label>
                                                    <input 
                                                        type="text" 
                                                        value={cat.image} 
                                                        onChange={(e) => updateListItem("projects", "categories", idx, "image", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* PROJECT WALKTHROUGH VIDEOS (Reels Layout Section) */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Walkthrough Video Showcases (Circular Arch Section)</h3>
                                    <button 
                                        onClick={() => addListItem("projects", "videos", { 
                                            title: "New Commissioning Video", 
                                            desc: "Live inspection walk.", 
                                            bgImage: "/Images/Project/scada_showcase.webp",
                                            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31911-large.mp4",
                                            handle: "@vertex.controls",
                                            tagline: "FAT COMMISSIONING"
                                        })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Video Card
                                    </button>
                                </div>

                                <div className="items-list-editor">
                                    {draft.projects.videos.map((vid, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Video #{idx + 1}: {vid.title}</h4>
                                                <button onClick={() => deleteListItem("projects", "videos", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group col-span-2">
                                                    <label>Video Card Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={vid.title} 
                                                        onChange={(e) => updateListItem("projects", "videos", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Source Video Loop (.mp4 link / public loop URL)</label>
                                                    <input 
                                                        type="text" 
                                                        value={vid.videoUrl} 
                                                        onChange={(e) => updateListItem("projects", "videos", idx, "videoUrl", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Department Handle (e.g. @vertex.automation)</label>
                                                    <input 
                                                        type="text" 
                                                        value={vid.handle} 
                                                        onChange={(e) => updateListItem("projects", "videos", idx, "handle", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Department Tagline (e.g. FAT TESTING CYCLE)</label>
                                                    <input 
                                                        type="text" 
                                                        value={vid.tagline} 
                                                        onChange={(e) => updateListItem("projects", "videos", idx, "tagline", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Background Cover Image Path</label>
                                                    <input 
                                                        type="text" 
                                                        value={vid.bgImage} 
                                                        onChange={(e) => updateListItem("projects", "videos", idx, "bgImage", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Video Summary Description</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={vid.desc} 
                                                        onChange={(e) => updateListItem("projects", "videos", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* PROJECT HISTORICAL CASE STUDIES LIST */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Historical Case Studies (Bottom Grid)</h3>
                                    <button 
                                        onClick={() => addListItem("projects", "portfolio", { title: "New Major Facility Overhaul", category: "Industrial Automation", desc: "Design and deployment of MCC panels." })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Case Study
                                    </button>
                                </div>

                                <div className="items-list-editor">
                                    {draft.projects.portfolio.map((proj, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Case Study #{idx + 1}: {proj.title}</h4>
                                                <button onClick={() => deleteListItem("projects", "portfolio", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group col-span-2">
                                                    <label>Case Study Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={proj.title} 
                                                        onChange={(e) => updateListItem("projects", "portfolio", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Engineering Sector (Category)</label>
                                                    <input 
                                                        type="text" 
                                                        value={proj.category} 
                                                        onChange={(e) => updateListItem("projects", "portfolio", idx, "category", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Portfolio Detailed Overview Copy */}
                            <div className="dashboard-card">
                                <h3>Portfolio Detailed Overview Copy</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Overview Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.projects.overview?.title} 
                                            onChange={(e) => updateField("projects.overview.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Overview Lead Paragraph</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.projects.overview?.lead} 
                                            onChange={(e) => updateField("projects.overview.lead", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Overview Body Paragraph</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.projects.overview?.body} 
                                            onChange={(e) => updateField("projects.overview.body", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Project Target Served Industries */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Project Target Served Industries</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("projects", "industries", { title: "New Industry Domain", desc: "Short details of served facility." })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Industry Card
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.projects.industries || []).map((ind, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Industry #{idx + 1}: {ind.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("projects", "industries", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Industry Domain Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={ind.title} 
                                                        onChange={(e) => updateListItem("projects", "industries", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Short Description</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={ind.desc} 
                                                        onChange={(e) => updateListItem("projects", "industries", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Complete Project Delivery Steps Timeline */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Complete Project Delivery Steps Timeline</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("projects", "deliverySteps", { title: "New Step", desc: "Details of delivery phase." })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Delivery Step
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.projects.deliverySteps || []).map((step, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Step #{idx + 1}: {step.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("projects", "deliverySteps", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Step Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={step.title} 
                                                        onChange={(e) => updateListItem("projects", "deliverySteps", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Detailed Explanation</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={step.desc} 
                                                        onChange={(e) => updateListItem("projects", "deliverySteps", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 6. TAB: PRODUCTS PAGE CMS EDITOR PANEL */}
                    {activeTab === "products" && (
                        <div className="tab-pane" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                            {/* Hero Section */}
                            <div className="dashboard-card">
                                <h3>Products Page Hero Details</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Hero Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.products?.hero?.title || ""} 
                                            onChange={(e) => updateField("products.hero.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Lead description</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.products?.hero?.lead || ""} 
                                            onChange={(e) => updateField("products.hero.lead", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Categories Filter list */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Categories Tab Filter List</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addStringListItem("products", "categories")} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Category
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.products?.categories || []).map((cat, idx) => (
                                        <div key={idx} className="item-editor-block" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                            <div className="form-group" style={{ flex: 1 }}>
                                                <label>Category #{idx + 1}</label>
                                                <input 
                                                    type="text" 
                                                    value={cat} 
                                                    onChange={(e) => updateStringListItem("products", "categories", idx, e.target.value)} 
                                                />
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => deleteStringListItem("products", "categories", idx)} 
                                                className="delete-btn-icon"
                                                style={{ marginTop: "1.2rem" }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product List catalog */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Products Catalog (Grid Items)</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("products", "productList", { name: "New Product", category: draft.products?.categories?.[0] || "All", desc: "Short explanation of product.", image: "/Images/Products/control_panels.png", features: ["Key Feature 1"] })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Catalog Product
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.products?.productList || []).map((prod, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Product #{idx + 1}: {prod.name}</h4>
                                                <button type="button" onClick={() => deleteListItem("products", "productList", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Product Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={prod.name} 
                                                        onChange={(e) => updateListItem("products", "productList", idx, "name", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Category</label>
                                                    <select 
                                                        value={prod.category} 
                                                        onChange={(e) => updateListItem("products", "productList", idx, "category", e.target.value)}
                                                        style={{ background: "#1a1e29", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem", borderRadius: "8px", width: "100%" }}
                                                    >
                                                        {(draft.products?.categories || []).map((cat, cidx) => (
                                                            <option key={cidx} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Image Cover Path / URL</label>
                                                    <input 
                                                        type="text" 
                                                        value={prod.image} 
                                                        onChange={(e) => updateListItem("products", "productList", idx, "image", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Product Description</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={prod.desc} 
                                                        onChange={(e) => updateListItem("products", "productList", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>

                                            {/* Feature list highlights */}
                                            <div className="submenu-editor-section" style={{ marginTop: "1.5rem", paddingLeft: "1.5rem", borderLeft: "2px solid rgba(0, 194, 255, 0.2)" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                                    <h5 style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>Key Features & Highlights</h5>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => addProductFeature(idx)} 
                                                        className="btn btn-secondary btn-sm"
                                                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                                                    >
                                                        <FaPlus /> Add Feature
                                                    </button>
                                                </div>
                                                {(!prod.features || prod.features.length === 0) ? (
                                                    <p style={{ color: "var(--gray)", fontSize: "0.85rem", fontStyle: "italic" }}>No feature highlights configured.</p>
                                                ) : (
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                                        {prod.features.map((feat, fidx) => (
                                                            <div key={fidx} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                                                <div className="form-group" style={{ flex: 1 }}>
                                                                    <input 
                                                                        type="text" 
                                                                        value={feat} 
                                                                        onChange={(e) => updateProductFeature(idx, fidx, e.target.value)} 
                                                                        style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                                                                    />
                                                                </div>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => deleteProductFeature(idx, fidx)} 
                                                                    className="delete-btn-icon" 
                                                                    style={{ padding: "0.4rem" }}
                                                                >
                                                                    <FaTrash size={14} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Product details */}
                            {draft.products?.featuredProduct && (
                                <div className="dashboard-card">
                                    <h3>Featured Product Section Details</h3>
                                    <div className="form-grid">
                                        <div className="form-group col-span-2">
                                            <label>Featured Product Title</label>
                                            <input 
                                                type="text" 
                                                value={draft.products.featuredProduct.title || ""} 
                                                onChange={(e) => updateField("products.featuredProduct.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Featured Image Cover URL</label>
                                            <input 
                                                type="text" 
                                                value={draft.products.featuredProduct.image || ""} 
                                                onChange={(e) => updateField("products.featuredProduct.image", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Product Overview Text</label>
                                            <textarea 
                                                rows={4} 
                                                value={draft.products.featuredProduct.overview || ""} 
                                                onChange={(e) => updateField("products.featuredProduct.overview", e.target.value)} 
                                            />
                                        </div>
                                    </div>

                                    {/* Applications */}
                                    <div className="submenu-editor-section" style={{ marginTop: "2rem", paddingLeft: "1.5rem", borderLeft: "2px solid rgba(0, 194, 255, 0.2)" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                            <h5 style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>Target Applications</h5>
                                            <button 
                                                type="button" 
                                                onClick={addFeaturedApp} 
                                                className="btn btn-secondary btn-sm"
                                                style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                                            >
                                                <FaPlus /> Add Application
                                            </button>
                                        </div>
                                        {(!draft.products.featuredProduct.applications || draft.products.featuredProduct.applications.length === 0) ? (
                                            <p style={{ color: "var(--gray)", fontSize: "0.85rem", fontStyle: "italic" }}>No applications configured.</p>
                                        ) : (
                                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                                {draft.products.featuredProduct.applications.map((app, fidx) => (
                                                    <div key={fidx} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                                        <div className="form-group" style={{ flex: 1 }}>
                                                            <input 
                                                                type="text" 
                                                                value={app} 
                                                                onChange={(e) => updateFeaturedApp(fidx, e.target.value)} 
                                                                style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                                                            />
                                                        </div>
                                                        <button 
                                                            type="button"
                                                            onClick={() => deleteFeaturedApp(fidx)} 
                                                            className="delete-btn-icon" 
                                                            style={{ padding: "0.4rem" }}
                                                        >
                                                            <FaTrash size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Specifications Table */}
                                    <div className="submenu-editor-section" style={{ marginTop: "2rem", paddingLeft: "1.5rem", borderLeft: "2px solid rgba(0, 194, 255, 0.2)" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                            <h5 style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>Technical Specifications Table</h5>
                                            <button 
                                                type="button" 
                                                onClick={addFeaturedSpec} 
                                                className="btn btn-secondary btn-sm"
                                                style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                                            >
                                                <FaPlus /> Add Specification Row
                                            </button>
                                        </div>
                                        {(!draft.products.featuredProduct.specs || draft.products.featuredProduct.specs.length === 0) ? (
                                            <p style={{ color: "var(--gray)", fontSize: "0.85rem", fontStyle: "italic" }}>No specifications configured.</p>
                                        ) : (
                                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                                {draft.products.featuredProduct.specs.map((spec, sidx) => (
                                                    <div key={sidx} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                                        <div className="form-group" style={{ flex: 1 }}>
                                                            <label style={{ fontSize: "0.75rem" }}>Parameter Name</label>
                                                            <input 
                                                                type="text" 
                                                                value={spec.name} 
                                                                onChange={(e) => updateFeaturedSpec(sidx, "name", e.target.value)} 
                                                                style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                                                            />
                                                        </div>
                                                        <div className="form-group" style={{ flex: 1.5 }}>
                                                            <label style={{ fontSize: "0.75rem" }}>Details Value</label>
                                                            <input 
                                                                type="text" 
                                                                value={spec.value} 
                                                                onChange={(e) => updateFeaturedSpec(sidx, "value", e.target.value)} 
                                                                style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                                                            />
                                                        </div>
                                                        <button 
                                                            type="button"
                                                            onClick={() => deleteFeaturedSpec(sidx)} 
                                                            className="delete-btn-icon" 
                                                            style={{ marginTop: "1.2rem", padding: "0.4rem" }}
                                                        >
                                                            <FaTrash size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Why Choose Our Products */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Why Choose Our Products Section</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("products", "whyChooseList", { icon: "FaIndustry", title: "New Advantage Point", desc: "Short detailed explanations.", compliance: "CE compliant standards", percentage: 100, bullets: ["Feature bullet 1"] })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Advantage Item
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.products?.whyChooseList || []).map((feat, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Item #{idx + 1}: {feat.title}</h4>
                                                <button type="button" onClick={() => deleteListItem("products", "whyChooseList", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Item Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={feat.title} 
                                                        onChange={(e) => updateListItem("products", "whyChooseList", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>React Icon String Name (e.g. FaIndustry, FaTools, FaCogs)</label>
                                                    <input 
                                                        type="text" 
                                                        value={feat.icon} 
                                                        onChange={(e) => updateListItem("products", "whyChooseList", idx, "icon", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Compliance Tag Label</label>
                                                    <input 
                                                        type="text" 
                                                        value={feat.compliance} 
                                                        onChange={(e) => updateListItem("products", "whyChooseList", idx, "compliance", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Factory Quality Level Percentage</label>
                                                    <input 
                                                        type="number" 
                                                        value={feat.percentage} 
                                                        onChange={(e) => updateListItem("products", "whyChooseList", idx, "percentage", parseInt(e.target.value) || 0)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Advantage Details Description</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={feat.desc} 
                                                        onChange={(e) => updateListItem("products", "whyChooseList", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>

                                            {/* Supporting Points & Bullets */}
                                            <div className="submenu-editor-section" style={{ marginTop: "1.5rem", paddingLeft: "1.5rem", borderLeft: "2px solid rgba(0, 194, 255, 0.2)" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                                    <h5 style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>Supporting Points & Bullets</h5>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => addWhyBullet(idx)} 
                                                        className="btn btn-secondary btn-sm"
                                                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                                                    >
                                                        <FaPlus /> Add Bullet
                                                    </button>
                                                </div>
                                                {(!feat.bullets || feat.bullets.length === 0) ? (
                                                    <p style={{ color: "var(--gray)", fontSize: "0.85rem", fontStyle: "italic" }}>No bullet points configured.</p>
                                                ) : (
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                                        {feat.bullets.map((bullet, bidx) => (
                                                            <div key={bidx} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                                                <div className="form-group" style={{ flex: 1 }}>
                                                                    <input 
                                                                        type="text" 
                                                                        value={bullet} 
                                                                        onChange={(e) => updateWhyBullet(idx, bidx, e.target.value)} 
                                                                        style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                                                                    />
                                                                </div>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => deleteWhyBullet(idx, bidx)} 
                                                                    className="delete-btn-icon" 
                                                                    style={{ padding: "0.4rem" }}
                                                                >
                                                                    <FaTrash size={14} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Industries Served */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Industries Served Section</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("products", "industries", { icon: "FaIndustry", name: "New Industry Domain", desc: "Short detailed explanations.", systems: "MCC panels, SCADA integrations" })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Industry Node
                                    </button>
                                </div>
                                <div className="items-list-editor">
                                    {(draft.products?.industries || []).map((ind, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Industry #{idx + 1}: {ind.name}</h4>
                                                <button type="button" onClick={() => deleteListItem("products", "industries", idx)} className="delete-btn-icon">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Industry Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={ind.name} 
                                                        onChange={(e) => updateListItem("products", "industries", idx, "name", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>React Icon String Name (e.g. FaIndustry, FaTint, FaBolt, FaBuilding)</label>
                                                    <input 
                                                        type="text" 
                                                        value={ind.icon} 
                                                        onChange={(e) => updateListItem("products", "industries", idx, "icon", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Key Systems & Applications Tags</label>
                                                    <input 
                                                        type="text" 
                                                        value={ind.systems} 
                                                        onChange={(e) => updateListItem("products", "industries", idx, "systems", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Industry Description</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={ind.desc} 
                                                        onChange={(e) => updateListItem("products", "industries", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="dashboard-card">
                                <h3>Custom Solution CTA & Footer CTA Details</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Custom Solution Card Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.products?.customSolution?.title || ""} 
                                            onChange={(e) => updateField("products.customSolution.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Custom Solution Card Description</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.products?.customSolution?.desc || ""} 
                                            onChange={(e) => updateField("products.customSolution.desc", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "1rem", paddingTop: "1.5rem" }}>
                                        <label>Footer Specs Call To Action Header</label>
                                        <input 
                                            type="text" 
                                            value={draft.products?.footerCta?.title || ""} 
                                            onChange={(e) => updateField("products.footerCta.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Footer Specs CTA Paragraph</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.products?.footerCta?.desc || ""} 
                                            onChange={(e) => updateField("products.footerCta.desc", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 7. TAB: DOWNLOADS CENTER EDITOR */}
                    {activeTab === "downloads" && (
                        <div className="tab-pane" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                            {/* Hero Section */}
                            <div className="dashboard-card">
                                <h3>Hero Section Copy</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Hero Title Line</label>
                                        <input 
                                            type="text" 
                                            value={draft.downloads?.hero?.title || ""} 
                                            onChange={(e) => updateField("downloads.hero.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Subtitle / Description</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.downloads?.hero?.lead || ""} 
                                            onChange={(e) => updateField("downloads.hero.lead", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Resource Categories Editor */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Resource Categories</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("downloads", "categories", { index: "0" + ((draft.downloads?.categories?.length || 0) + 1), icon: "FaFileAlt", title: "New Category", desc: "Category description details", targetFilter: "New Filter" })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Category
                                    </button>
                                </div>

                                <div className="items-list-editor">
                                    {(draft.downloads?.categories || []).map((cat, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Category #{idx + 1}: {cat.title}</h4>
                                                <button 
                                                    type="button" 
                                                    onClick={() => deleteListItem("downloads", "categories", idx)} 
                                                    className="delete-btn-icon"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Index Label (e.g. 01, 02)</label>
                                                    <input 
                                                        type="text" 
                                                        value={cat.index} 
                                                        onChange={(e) => updateListItem("downloads", "categories", idx, "index", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Category Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={cat.title} 
                                                        onChange={(e) => updateListItem("downloads", "categories", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Filter Slug Name (e.g. Brochures, Manuals)</label>
                                                    <input 
                                                        type="text" 
                                                        value={cat.targetFilter} 
                                                        onChange={(e) => updateListItem("downloads", "categories", idx, "targetFilter", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>FontAwesome Icon Class (e.g. FaBuilding, FaBookOpen)</label>
                                                    <input 
                                                        type="text" 
                                                        value={cat.icon} 
                                                        onChange={(e) => updateListItem("downloads", "categories", idx, "icon", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Description Box</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={cat.desc} 
                                                        onChange={(e) => updateListItem("downloads", "categories", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Documents Directory Editor */}
                            <div className="dashboard-card">
                                <div className="card-header-actions">
                                    <h3>Technical Documents Directory</h3>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("downloads", "documents", { title: "New Technical Specification Sheet", category: "Brochures", desc: "Detailed specifications sheet explaining engineering components.", size: "1.5 MB", updatedDate: "Jul 2026", downloadUrl: "" })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Document Entry
                                    </button>
                                </div>

                                <div className="items-list-editor">
                                    {(draft.downloads?.documents || []).map((doc, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Document #{idx + 1}: {doc.title}</h4>
                                                <button 
                                                    type="button" 
                                                    onClick={() => deleteListItem("downloads", "documents", idx)} 
                                                    className="delete-btn-icon"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group col-span-2">
                                                    <label>Document Title Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={doc.title} 
                                                        onChange={(e) => updateListItem("downloads", "documents", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Category Grouping</label>
                                                    <select 
                                                        value={doc.category} 
                                                        onChange={(e) => updateListItem("downloads", "documents", idx, "category", e.target.value)}
                                                        style={{ width: "100%", padding: "0.85rem", background: "#04070d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff" }}
                                                    >
                                                        {(draft.downloads?.categories || []).map((c, cIdx) => (
                                                            <option key={cIdx} value={c.targetFilter}>{c.targetFilter}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>File Ingress Size (e.g. 4.2 MB)</label>
                                                    <input 
                                                        type="text" 
                                                        value={doc.size} 
                                                        onChange={(e) => updateListItem("downloads", "documents", idx, "size", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Updated Date / Month (e.g. May 2026)</label>
                                                    <input 
                                                        type="text" 
                                                        value={doc.updatedDate} 
                                                        onChange={(e) => updateListItem("downloads", "documents", idx, "updatedDate", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Direct PDF File Link (Upload in Media tab first)</label>
                                                    <input 
                                                        type="text" 
                                                        value={doc.downloadUrl || ""} 
                                                        placeholder="e.g. /Images/uploads/178254-file.pdf (Leave blank to simulate alert)"
                                                        onChange={(e) => updateListItem("downloads", "documents", idx, "downloadUrl", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Short Description of Document</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={doc.desc} 
                                                        onChange={(e) => updateListItem("downloads", "documents", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why Download Benefits Editor */}
                            <div className="dashboard-card">
                                <h3>"Why Download From Vertex" Benefits Section</h3>
                                <div className="items-list-editor">
                                    {(draft.downloads?.whyFeatures || []).map((feat, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Benefit #{idx + 1}: {feat.title}</h4>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Benefit Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={feat.title} 
                                                        onChange={(e) => updateListItem("downloads", "whyFeatures", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>FontAwesome Icon Class (e.g. FaCheckCircle, FaLock)</label>
                                                    <input 
                                                        type="text" 
                                                        value={feat.icon} 
                                                        onChange={(e) => updateListItem("downloads", "whyFeatures", idx, "icon", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Description Detail</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={feat.desc} 
                                                        onChange={(e) => updateListItem("downloads", "whyFeatures", idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 8. TAB: CONTACT US PAGE EDITOR */}
                    {activeTab === "contact" && (
                        <div className="tab-pane" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                            {/* Hero Section */}
                            <div className="dashboard-card">
                                <h3>Hero Section Copy</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Standard Site Badge Text</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hero?.pulseBadge || ""} 
                                            onChange={(e) => updateField("contact.hero.pulseBadge", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Hero Title Line</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hero?.title || ""} 
                                            onChange={(e) => updateField("contact.hero.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Hero Subtitle / Let's Connect</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hero?.subtitle || ""} 
                                            onChange={(e) => updateField("contact.hero.subtitle", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Lead text</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.contact?.hero?.lead || ""} 
                                            onChange={(e) => updateField("contact.hero.lead", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Hero Phone Action link (e.g. tel:+971554962866)</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hero?.phoneUrl || ""} 
                                            onChange={(e) => updateField("contact.hero.phoneUrl", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Hero Phone Action text</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hero?.phoneText || ""} 
                                            onChange={(e) => updateField("contact.hero.phoneText", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information Card */}
                            <div className="dashboard-card">
                                <h3>Contact Information Card</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Card Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.infoCard?.title || ""} 
                                            onChange={(e) => updateField("contact.infoCard.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Company Legal Name</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.infoCard?.companyName || ""} 
                                            onChange={(e) => updateField("contact.infoCard.companyName", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Physical Office Address</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.infoCard?.address || ""} 
                                            onChange={(e) => updateField("contact.infoCard.address", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Country / State line</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.infoCard?.country || ""} 
                                            onChange={(e) => updateField("contact.infoCard.country", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Contact Phone Number</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.infoCard?.phone || ""} 
                                            onChange={(e) => updateField("contact.infoCard.phone", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Sales Email Address</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.infoCard?.email || ""} 
                                            onChange={(e) => updateField("contact.infoCard.email", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Website URL (e.g. www.vertex-controls.com)</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.infoCard?.website || ""} 
                                            onChange={(e) => updateField("contact.infoCard.website", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours Card */}
                            <div className="dashboard-card">
                                <h3>Business Hours Card</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Card Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hoursCard?.title || ""} 
                                            onChange={(e) => updateField("contact.hoursCard.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weekdays Label (e.g. Monday – Saturday)</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hoursCard?.weekDaysTitle || ""} 
                                            onChange={(e) => updateField("contact.hoursCard.weekDaysTitle", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weekdays Hours (e.g. 8:00 AM – 6:00 PM)</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hoursCard?.weekDaysHours || ""} 
                                            onChange={(e) => updateField("contact.hoursCard.weekDaysHours", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weekend Label (e.g. Sunday)</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hoursCard?.sundayTitle || ""} 
                                            onChange={(e) => updateField("contact.hoursCard.sundayTitle", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weekend Hours / Status (e.g. Closed)</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.hoursCard?.sundayHours || ""} 
                                            onChange={(e) => updateField("contact.hoursCard.sundayHours", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>SLA Support Footer Disclaimer</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.contact?.hoursCard?.disclaimer || ""} 
                                            onChange={(e) => updateField("contact.hoursCard.disclaimer", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Google Map Card */}
                            <div className="dashboard-card">
                                <h3>Google Location Map</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Card Heading</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.mapCard?.title || ""} 
                                            onChange={(e) => updateField("contact.mapCard.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Google Maps Iframe Embed Source URL</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.mapCard?.embedUrl || ""} 
                                            onChange={(e) => updateField("contact.mapCard.embedUrl", e.target.value)} 
                                            style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Inquiry Quote Services Section */}
                            <div className="dashboard-card">
                                <h3>Request Quote Services Form Checklist</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Quote Sidebar Heading</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.quoteSection?.title || ""} 
                                            onChange={(e) => updateField("contact.quoteSection.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Quote Sidebar Sub-lead Text</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.contact?.quoteSection?.lead || ""} 
                                            onChange={(e) => updateField("contact.quoteSection.lead", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Offered Services List (One service title per line)</label>
                                        <textarea 
                                            rows={12} 
                                            value={(draft.contact?.quoteSection?.servicesList || []).join("\n")} 
                                            onChange={(e) => updateField("contact.quoteSection.servicesList", e.target.value.split("\n").filter(Boolean))} 
                                            style={{ fontFamily: "monospace", lineHeight: 1.4 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bento Grid Header & Items */}
                            <div className="dashboard-card">
                                <h3>Advantage Bento Grid Header</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Bento Sub-tag Name (e.g. The Vertex Advantage)</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.bentoHeader?.subTag || ""} 
                                            onChange={(e) => updateField("contact.bentoHeader.subTag", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Bento Main Title</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.bentoHeader?.title || ""} 
                                            onChange={(e) => updateField("contact.bentoHeader.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Bento Header Description</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.contact?.bentoHeader?.desc || ""} 
                                            onChange={(e) => updateField("contact.bentoHeader.desc", e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <div className="card-header-actions" style={{ marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                                    <h4>Advantage Bento Card Grid Blocks</h4>
                                    <button 
                                        type="button"
                                        onClick={() => addListItem("contact", "bentoItems", { icon: "FaLightbulb", title: "New Advantage", description: "Bespoke engineering solutions...", colSpan: "bento-cols-4" })} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Bento Item
                                    </button>
                                </div>

                                <div className="items-list-editor">
                                    {(draft.contact?.bentoItems || []).map((item, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Bento Item #{idx + 1}: {item.title}</h4>
                                                <button 
                                                    type="button" 
                                                    onClick={() => deleteListItem("contact", "bentoItems", idx)} 
                                                    className="delete-btn-icon"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Block Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={item.title} 
                                                        onChange={(e) => updateListItem("contact", "bentoItems", idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>FontAwesome Icon Class (e.g. FaClock, FaTools)</label>
                                                    <input 
                                                        type="text" 
                                                        value={item.icon} 
                                                        onChange={(e) => updateListItem("contact", "bentoItems", idx, "icon", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Layout Column Width Span</label>
                                                    <select 
                                                        value={item.colSpan} 
                                                        onChange={(e) => updateListItem("contact", "bentoItems", idx, "colSpan", e.target.value)}
                                                        style={{ width: "100%", padding: "0.85rem", background: "#04070d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff" }}
                                                    >
                                                        <option value="bento-cols-4">Compact (1/3 Width - Span 4)</option>
                                                        <option value="bento-cols-6">Medium (1/2 Width - Span 6)</option>
                                                        <option value="bento-cols-8">Wide (2/3 Width - Span 8)</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Description Detail</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={item.description} 
                                                        onChange={(e) => updateListItem("contact", "bentoItems", idx, "description", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Final Call to Action Section */}
                            <div className="dashboard-card">
                                <h3>Final Call to Action Section</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>CTA Section Header</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.finalCta?.title || ""} 
                                            onChange={(e) => updateField("contact.finalCta.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>CTA Supporting Copy</label>
                                        <textarea 
                                            rows={3} 
                                            value={draft.contact?.finalCta?.desc || ""} 
                                            onChange={(e) => updateField("contact.finalCta.desc", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CTA Highlight Tagline</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.finalCta?.tagline || ""} 
                                            onChange={(e) => updateField("contact.finalCta.tagline", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CTA Phone Connection Number (e.g. tel:+971554962866)</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.finalCta?.phoneUrl || ""} 
                                            onChange={(e) => updateField("contact.finalCta.phoneUrl", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CTA Phone button text</label>
                                        <input 
                                            type="text" 
                                            value={draft.contact?.finalCta?.phoneText || ""} 
                                            onChange={(e) => updateField("contact.finalCta.phoneText", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 9. TAB: REQUEST A QUOTE PAGE EDITOR */}
                    {activeTab === "quote" && (
                        <div className="tab-pane" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                            {/* Hero Section */}
                            <div className="dashboard-card">
                                <h3>Hero Section Copy</h3>
                                <div className="form-grid">
                                    <div className="form-group col-span-2">
                                        <label>Hero Title Line</label>
                                        <input 
                                            type="text" 
                                            value={draft.quote?.hero?.title || ""} 
                                            onChange={(e) => updateField("quote.hero.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Hero Subtitle text</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.quote?.hero?.subtitle || ""} 
                                            onChange={(e) => updateField("quote.hero.subtitle", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Side Information Card & Contacts */}
                            <div className="dashboard-card">
                                <h3>Advantage Information Panel</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Panel Header title</label>
                                        <input 
                                            type="text" 
                                            value={draft.quote?.infoCard?.title || ""} 
                                            onChange={(e) => updateField("quote.infoCard.title", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2">
                                        <label>Panel Lead text</label>
                                        <textarea 
                                            rows={2} 
                                            value={draft.quote?.infoCard?.lead || ""} 
                                            onChange={(e) => updateField("quote.infoCard.lead", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group col-span-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "1rem", paddingTop: "1.5rem" }}>
                                        <h4>Direct Quick Connections</h4>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Connection Label (e.g. Talk to an Engineer directly)</label>
                                        <input 
                                            type="text" 
                                            value={draft.quote?.infoCard?.phoneLabel || ""} 
                                            onChange={(e) => updateField("quote.infoCard.phoneLabel", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone URL link (e.g. tel:+971554962866)</label>
                                        <input 
                                            type="text" 
                                            value={draft.quote?.infoCard?.phoneUrl || ""} 
                                            onChange={(e) => updateField("quote.infoCard.phoneUrl", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Display Text (e.g. +971 55 496 2866)</label>
                                        <input 
                                            type="text" 
                                            value={draft.quote?.infoCard?.phoneText || ""} 
                                            onChange={(e) => updateField("quote.infoCard.phoneText", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>WhatsApp URL (e.g. https://wa.me/971554962866)</label>
                                        <input 
                                            type="text" 
                                            value={draft.quote?.infoCard?.whatsappUrl || ""} 
                                            onChange={(e) => updateField("quote.infoCard.whatsappUrl", e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>WhatsApp Button Text (e.g. Chat on WhatsApp)</label>
                                        <input 
                                            type="text" 
                                            value={draft.quote?.infoCard?.whatsappText || ""} 
                                            onChange={(e) => updateField("quote.infoCard.whatsappText", e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <div className="card-header-actions" style={{ marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                                    <h4>Advantage Checkmark Features</h4>
                                    <button 
                                        type="button"
                                        onClick={addQuoteFeature} 
                                        className="btn btn-secondary add-item-btn"
                                    >
                                        <FaPlus /> Add Feature
                                    </button>
                                </div>

                                <div className="items-list-editor">
                                    {(draft.quote?.infoCard?.features || []).map((feat, idx) => (
                                        <div key={idx} className="item-editor-block">
                                            <div className="item-editor-header">
                                                <h4>Feature #{idx + 1}: {feat.title}</h4>
                                                <button 
                                                    type="button" 
                                                    onClick={() => deleteQuoteFeature(idx)} 
                                                    className="delete-btn-icon"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Feature Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={feat.title} 
                                                        onChange={(e) => updateQuoteFeature(idx, "title", e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group col-span-2">
                                                    <label>Feature Explanation Copy</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={feat.desc} 
                                                        onChange={(e) => updateQuoteFeature(idx, "desc", e.target.value)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 10. TAB: SERVICES SUBPAGES EDITOR */}
                    {activeTab === "services-subpages" && (() => {
                        const defaultSub = defaultServicesSubpages[selectedServiceKey] || {
                            seo: { title: "", description: "" },
                            hero: { badgeText: "", title: "", lead: "" },
                            overview: { subTag: "", title: "", lead: "", body: "", imageSrc: "" },
                            solutions: [],
                            whyChoose: [],
                            cta: { title: "", desc: "", phone: "", email: "", location: "" }
                        };

                        const subData = draft.servicesSubpages?.[selectedServiceKey] || defaultSub;

                        const updateSubField = (path: string, val: any) => {
                            const newSubpages = { ...(draft.servicesSubpages || {}) };
                            const targetPage = JSON.parse(JSON.stringify(newSubpages[selectedServiceKey] || defaultSub));
                            
                            const parts = path.split(".");
                            if (parts.length === 1) {
                                targetPage[parts[0]] = val;
                            } else if (parts.length === 2) {
                                if (!targetPage[parts[0]]) targetPage[parts[0]] = {};
                                targetPage[parts[0]][parts[1]] = val;
                            } else if (parts.length === 3) {
                                if (!targetPage[parts[0]]) targetPage[parts[0]] = {};
                                if (!targetPage[parts[0]][parts[1]]) targetPage[parts[0]][parts[1]] = {};
                                targetPage[parts[0]][parts[1]][parts[2]] = val;
                            }

                            newSubpages[selectedServiceKey] = targetPage;
                            updateField("servicesSubpages", newSubpages);
                        };

                        const updateSubListItem = (arrayKey: "solutions" | "whyChoose", index: number, field: string, val: any) => {
                            const newSubpages = { ...(draft.servicesSubpages || {}) };
                            const targetPage = JSON.parse(JSON.stringify(newSubpages[selectedServiceKey] || defaultSub));
                            const list = [...(targetPage[arrayKey] || [])];
                            list[index] = { ...list[index], [field]: val };
                            targetPage[arrayKey] = list;
                            newSubpages[selectedServiceKey] = targetPage;
                            updateField("servicesSubpages", newSubpages);
                        };

                        const addSubListItem = (arrayKey: "solutions" | "whyChoose", newItem: any) => {
                            const newSubpages = { ...(draft.servicesSubpages || {}) };
                            const targetPage = JSON.parse(JSON.stringify(newSubpages[selectedServiceKey] || defaultSub));
                            targetPage[arrayKey] = [...(targetPage[arrayKey] || []), newItem];
                            newSubpages[selectedServiceKey] = targetPage;
                            updateField("servicesSubpages", newSubpages);
                        };

                        const deleteSubListItem = (arrayKey: "solutions" | "whyChoose", index: number) => {
                            const newSubpages = { ...(draft.servicesSubpages || {}) };
                            const targetPage = JSON.parse(JSON.stringify(newSubpages[selectedServiceKey] || defaultSub));
                            targetPage[arrayKey] = (targetPage[arrayKey] || []).filter((_: any, i: number) => i !== index);
                            newSubpages[selectedServiceKey] = targetPage;
                            updateField("servicesSubpages", newSubpages);
                        };

                        return (
                            <div className="tab-pane" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                                <div className="dashboard-card" style={{ borderLeft: "4px solid var(--primary)" }}>
                                    <h3>Select Service Subpage to Edit</h3>
                                    <p style={{ color: "var(--gray)", marginBottom: "1rem" }}>
                                        Choose one of the 8 dynamic service subpages from the list below to update its specific copywriting and list components.
                                    </p>
                                    <select 
                                        value={selectedServiceKey} 
                                        onChange={(e) => setSelectedServiceKey(e.target.value)}
                                        style={{ width: "100%", padding: "1rem", background: "#04070d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff", fontSize: "1rem" }}
                                    >
                                        <option value="control-panels">Automation & Control Systems (/services/control-panels)</option>
                                        <option value="industrial-automation">Industrial Automation & SCADA (/services/industrial-automation)</option>
                                        <option value="electrical-engineering">Electrical Engineering Services (/services/electrical-engineering)</option>
                                        <option value="mechanical-engineering">Mechanical & MEP Solutions (/services/mechanical-engineering)</option>
                                        <option value="smart-infrastructure">Smart Infrastructure & ELV (/services/smart-infrastructure)</option>
                                        <option value="ai-iot">AI & Industrial IoT (/services/ai-iot)</option>
                                        <option value="energy-management">Energy Management Solutions (/services/energy-management)</option>
                                        <option value="maintenance-operation">Annual Maintenance Contracts (/services/maintenance-operation)</option>
                                    </select>
                                </div>

                                {/* SEO Metadata */}
                                <div className="dashboard-card">
                                    <h3>SEO Metadata Settings</h3>
                                    <div className="form-grid">
                                        <div className="form-group col-span-2">
                                            <label>Browser Page Title (Appears in Tab)</label>
                                            <input 
                                                type="text" 
                                                value={subData.seo?.title || ""} 
                                                onChange={(e) => updateSubField("seo.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Meta Description Content (Search Engines)</label>
                                            <textarea 
                                                rows={2} 
                                                value={subData.seo?.description || ""} 
                                                onChange={(e) => updateSubField("seo.description", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Hero Copy */}
                                <div className="dashboard-card">
                                    <h3>Hero Copy</h3>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Hero Badge Tagline</label>
                                            <input 
                                                type="text" 
                                                value={subData.hero?.badgeText || ""} 
                                                onChange={(e) => updateSubField("hero.badgeText", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Hero Main Title</label>
                                            <input 
                                                type="text" 
                                                value={subData.hero?.title || ""} 
                                                onChange={(e) => updateSubField("hero.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Hero Lead Description</label>
                                            <textarea 
                                                rows={2} 
                                                value={subData.hero?.lead || ""} 
                                                onChange={(e) => updateSubField("hero.lead", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Overview Section */}
                                <div className="dashboard-card">
                                    <h3>Service Overview Section</h3>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Overview Sub-Tag</label>
                                            <input 
                                                type="text" 
                                                value={subData.overview?.subTag || ""} 
                                                onChange={(e) => updateSubField("overview.subTag", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Overview Main Title</label>
                                            <input 
                                                type="text" 
                                                value={subData.overview?.title || ""} 
                                                onChange={(e) => updateSubField("overview.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Overview Lead Sentence</label>
                                            <textarea 
                                                rows={2} 
                                                value={subData.overview?.lead || ""} 
                                                onChange={(e) => updateSubField("overview.lead", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Overview Body Paragraph</label>
                                            <textarea 
                                                rows={4} 
                                                value={subData.overview?.body || ""} 
                                                onChange={(e) => updateSubField("overview.body", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Overview Showcase Image URL</label>
                                            <input 
                                                type="text" 
                                                value={subData.overview?.imageSrc || ""} 
                                                onChange={(e) => updateSubField("overview.imageSrc", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Solutions List */}
                                <div className="dashboard-card">
                                    <div className="card-header-actions">
                                        <h3>Our Custom Solutions Cards</h3>
                                        <button 
                                            type="button" 
                                            onClick={() => addSubListItem("solutions", { icon: "FaMicrochip", title: "New Solution", desc: "Solution details", features: [] })}
                                            className="btn btn-secondary add-item-btn"
                                        >
                                            <FaPlus /> Add Solution Card
                                        </button>
                                    </div>

                                    <div className="items-list-editor">
                                        {(subData.solutions || []).map((sol, index) => (
                                            <div key={index} className="item-editor-block">
                                                <div className="item-editor-header">
                                                    <h4>Solution #{index + 1}: {sol.title}</h4>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => deleteSubListItem("solutions", index)} 
                                                        className="delete-btn-icon"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Card Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={sol.title || ""} 
                                                            onChange={(e) => updateSubListItem("solutions", index, "title", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>FontAwesome Icon Class (e.g. FaMicrochip, FaServer)</label>
                                                        <input 
                                                            type="text" 
                                                            value={sol.icon || ""} 
                                                            onChange={(e) => updateSubListItem("solutions", index, "icon", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group col-span-2">
                                                        <label>Description copy</label>
                                                        <textarea 
                                                            rows={2} 
                                                            value={sol.desc || ""} 
                                                            onChange={(e) => updateSubListItem("solutions", index, "desc", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group col-span-2">
                                                        <label>Feature Bullet points (One per line)</label>
                                                        <textarea 
                                                            rows={4} 
                                                            value={(sol.features || []).join("\n")} 
                                                            onChange={(e) => updateSubListItem("solutions", index, "features", e.target.value.split("\n").filter(Boolean))} 
                                                            style={{ fontFamily: "monospace" }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Why Choose Grid */}
                                <div className="dashboard-card">
                                    <div className="card-header-actions">
                                        <h3>Advantage Badges</h3>
                                        <button 
                                            type="button" 
                                            onClick={() => addSubListItem("whyChoose", { icon: "FaTools", title: "New Advantage", desc: "Advantage copy details" })}
                                            className="btn btn-secondary add-item-btn"
                                        >
                                            <FaPlus /> Add Advantage Card
                                        </button>
                                    </div>

                                    <div className="items-list-editor">
                                        {(subData.whyChoose || []).map((why, index) => (
                                            <div key={index} className="item-editor-block">
                                                <div className="item-editor-header">
                                                    <h4>Advantage #{index + 1}: {why.title}</h4>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => deleteSubListItem("whyChoose", index)} 
                                                        className="delete-btn-icon"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Advantage Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={why.title || ""} 
                                                            onChange={(e) => updateSubListItem("whyChoose", index, "title", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>FontAwesome Icon Class (e.g. FaTools, FaCheckCircle)</label>
                                                        <input 
                                                            type="text" 
                                                            value={why.icon || ""} 
                                                            onChange={(e) => updateSubListItem("whyChoose", index, "icon", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group col-span-2">
                                                        <label>Description Detail</label>
                                                        <textarea 
                                                            rows={2} 
                                                            value={why.desc || ""} 
                                                            onChange={(e) => updateSubListItem("whyChoose", index, "desc", e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Call to Action Block */}
                                <div className="dashboard-card">
                                    <h3>Bottom Call to Action Box</h3>
                                    <div className="form-grid">
                                        <div className="form-group col-span-2">
                                            <label>CTA Title Heading</label>
                                            <input 
                                                type="text" 
                                                value={subData.cta?.title || ""} 
                                                onChange={(e) => updateSubField("cta.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>CTA Supporting Copy</label>
                                            <textarea 
                                                rows={2} 
                                                value={subData.cta?.desc || ""} 
                                                onChange={(e) => updateSubField("cta.desc", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CTA Target Phone Number</label>
                                            <input 
                                                type="text" 
                                                value={subData.cta?.phone || ""} 
                                                onChange={(e) => updateSubField("cta.phone", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CTA Target Sales Email</label>
                                            <input 
                                                type="text" 
                                                value={subData.cta?.email || ""} 
                                                onChange={(e) => updateSubField("cta.email", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CTA Location label (e.g. Dubai, UAE)</label>
                                            <input 
                                                type="text" 
                                                value={subData.cta?.location || ""} 
                                                onChange={(e) => updateSubField("cta.location", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* 11. TAB: PROJECTS SUBPAGES EDITOR */}
                    {activeTab === "projects-subpages" && (() => {
                        const defaultProj = defaultProjectsSubpages[selectedProjectKey] || {
                            seo: { title: "", description: "" },
                            hero: { badgeText: "", title: "", lead: "" },
                            overview: { subTag: "", title: "", lead: "", imageSrc: "", statusText: "", locationText: "", objectives: [], scopeTags: [] },
                            servicesDelivered: [],
                            highlights: [],
                            gallery: [],
                            cta: { title: "", desc: "", phone: "", email: "" }
                        };

                        const projData = draft.projectsSubpages?.[selectedProjectKey] || defaultProj;

                        const updateProjField = (path: string, val: any) => {
                            const newProjpages = { ...(draft.projectsSubpages || {}) };
                            const targetPage = JSON.parse(JSON.stringify(newProjpages[selectedProjectKey] || defaultProj));
                            
                            const parts = path.split(".");
                            if (parts.length === 1) {
                                targetPage[parts[0]] = val;
                            } else if (parts.length === 2) {
                                if (!targetPage[parts[0]]) targetPage[parts[0]] = {};
                                targetPage[parts[0]][parts[1]] = val;
                            } else if (parts.length === 3) {
                                if (!targetPage[parts[0]]) targetPage[parts[0]] = {};
                                if (!targetPage[parts[0]][parts[1]]) targetPage[parts[0]][parts[1]] = {};
                                targetPage[parts[0]][parts[1]][parts[2]] = val;
                            }

                            newProjpages[selectedProjectKey] = targetPage;
                            updateField("projectsSubpages", newProjpages);
                        };

                        const updateProjListItem = (arrayKey: "overview.objectives" | "servicesDelivered" | "highlights" | "gallery", index: number, field: string, val: any) => {
                            const newProjpages = { ...(draft.projectsSubpages || {}) };
                            const targetPage = JSON.parse(JSON.stringify(newProjpages[selectedProjectKey] || defaultProj));
                            
                            if (arrayKey === "overview.objectives") {
                                const list = [...(targetPage.overview.objectives || [])];
                                list[index] = { ...list[index], [field]: val };
                                targetPage.overview.objectives = list;
                            } else {
                                const list = [...(targetPage[arrayKey] || [])];
                                list[index] = { ...list[index], [field]: val };
                                targetPage[arrayKey] = list;
                            }

                            newProjpages[selectedProjectKey] = targetPage;
                            updateField("projectsSubpages", newProjpages);
                        };

                        const addProjListItem = (arrayKey: "overview.objectives" | "servicesDelivered" | "highlights" | "gallery", newItem: any) => {
                            const newProjpages = { ...(draft.projectsSubpages || {}) };
                            const targetPage = JSON.parse(JSON.stringify(newProjpages[selectedProjectKey] || defaultProj));
                            
                            if (arrayKey === "overview.objectives") {
                                targetPage.overview.objectives = [...(targetPage.overview.objectives || []), newItem];
                            } else {
                                targetPage[arrayKey] = [...(targetPage[arrayKey] || []), newItem];
                            }

                            newProjpages[selectedProjectKey] = targetPage;
                            updateField("projectsSubpages", newProjpages);
                        };

                        const deleteProjListItem = (arrayKey: "overview.objectives" | "servicesDelivered" | "highlights" | "gallery", index: number) => {
                            const newProjpages = { ...(draft.projectsSubpages || {}) };
                            const targetPage = JSON.parse(JSON.stringify(newProjpages[selectedProjectKey] || defaultProj));
                            
                            if (arrayKey === "overview.objectives") {
                                targetPage.overview.objectives = (targetPage.overview.objectives || []).filter((_: any, i: number) => i !== index);
                            } else {
                                targetPage[arrayKey] = (targetPage[arrayKey] || []).filter((_: any, i: number) => i !== index);
                            }

                            newProjpages[selectedProjectKey] = targetPage;
                            updateField("projectsSubpages", newProjpages);
                        };

                        return (
                            <div className="tab-pane" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                                <div className="dashboard-card" style={{ borderLeft: "4px solid var(--primary)" }}>
                                    <h3>Select Project Subpage (Case Study) to Edit</h3>
                                    <p style={{ color: "var(--gray)", marginBottom: "1rem" }}>
                                        Choose one of the 10 dynamic project case studies from the list below to update its specific parameters, scope tags, objectives, and image gallery.
                                    </p>
                                    <select 
                                        value={selectedProjectKey} 
                                        onChange={(e) => setSelectedProjectKey(e.target.value)}
                                        style={{ width: "100%", padding: "1rem", background: "#04070d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff", fontSize: "1rem" }}
                                    >
                                        <option value="control-panels-automation">Control Panels Automation (/projects/control-panels-automation)</option>
                                        <option value="pump-station-automation">Pump Station Automation (/projects/pump-station-automation)</option>
                                        <option value="electrical-infrastructure">Electrical Infrastructure (/projects/electrical-infrastructure)</option>
                                        <option value="power-cable-installation">Power Cable Installation (/projects/power-cable-installation)</option>
                                        <option value="led-display-power">LED Display Power Grid (/projects/led-display-power)</option>
                                        <option value="smart-lighting">Smart Lighting Systems (/projects/smart-lighting)</option>
                                        <option value="energy-monitoring">Energy Monitoring SCADA (/projects/energy-monitoring)</option>
                                        <option value="industrial-iot">Industrial IoT Gateways (/projects/industrial-iot)</option>
                                        <option value="water-treatment">Water Treatment & Control (/projects/water-treatment)</option>
                                        <option value="mechanical-installation">Mechanical Installations (/projects/mechanical-installation)</option>
                                    </select>
                                </div>

                                {/* SEO Metadata */}
                                <div className="dashboard-card">
                                    <h3>SEO Metadata Settings</h3>
                                    <div className="form-grid">
                                        <div className="form-group col-span-2">
                                            <label>Browser Page Title</label>
                                            <input 
                                                type="text" 
                                                value={projData.seo?.title || ""} 
                                                onChange={(e) => updateProjField("seo.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Meta Description Content</label>
                                            <textarea 
                                                rows={2} 
                                                value={projData.seo?.description || ""} 
                                                onChange={(e) => updateProjField("seo.description", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Hero Section */}
                                <div className="dashboard-card">
                                    <h3>Hero Copy</h3>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Hero Badge Tagline</label>
                                            <input 
                                                type="text" 
                                                value={projData.hero?.badgeText || ""} 
                                                onChange={(e) => updateProjField("hero.badgeText", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Hero Main Title</label>
                                            <input 
                                                type="text" 
                                                value={projData.hero?.title || ""} 
                                                onChange={(e) => updateProjField("hero.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Hero Lead Subtitle</label>
                                            <textarea 
                                                rows={2} 
                                                value={projData.hero?.lead || ""} 
                                                onChange={(e) => updateProjField("hero.lead", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Overview & Objectives */}
                                <div className="dashboard-card">
                                    <h3>Case Study Overview</h3>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Overview Sub-Tag</label>
                                            <input 
                                                type="text" 
                                                value={projData.overview?.subTag || ""} 
                                                onChange={(e) => updateProjField("overview.subTag", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Overview Main Title</label>
                                            <input 
                                                type="text" 
                                                value={projData.overview?.title || ""} 
                                                onChange={(e) => updateProjField("overview.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Overview Summary Description</label>
                                            <textarea 
                                                rows={3} 
                                                value={projData.overview?.lead || ""} 
                                                onChange={(e) => updateProjField("overview.lead", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Status Badge (e.g. STATUS: COMPLETED)</label>
                                            <input 
                                                type="text" 
                                                value={projData.overview?.statusText || ""} 
                                                onChange={(e) => updateProjField("overview.statusText", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Location Badge (e.g. LOCATION: DUBAI, UAE)</label>
                                            <input 
                                                type="text" 
                                                value={projData.overview?.locationText || ""} 
                                                onChange={(e) => updateProjField("overview.locationText", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Showcase Terminal Image URL</label>
                                            <input 
                                                type="text" 
                                                value={projData.overview?.imageSrc || ""} 
                                                onChange={(e) => updateProjField("overview.imageSrc", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Deliverable Scope Tags (Comma separated, e.g. Cable pull, FAT testing)</label>
                                            <input 
                                                type="text" 
                                                value={(projData.overview?.scopeTags || []).join(", ")} 
                                                onChange={(e) => updateProjField("overview.scopeTags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} 
                                            />
                                        </div>
                                    </div>

                                    {/* Objectives */}
                                    <div className="card-header-actions" style={{ marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                                        <h4>Project Key Objectives</h4>
                                        <button 
                                            type="button" 
                                            onClick={() => addProjListItem("overview.objectives", { icon: "FaCheckCircle", title: "New Objective", desc: "Objective details" })}
                                            className="btn btn-secondary add-item-btn"
                                        >
                                            <FaPlus /> Add Objective
                                        </button>
                                    </div>

                                    <div className="items-list-editor">
                                        {(projData.overview?.objectives || []).map((obj, index) => (
                                            <div key={index} className="item-editor-block">
                                                <div className="item-editor-header">
                                                    <h4>Objective #{index + 1}: {obj.title}</h4>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => deleteProjListItem("overview.objectives", index)} 
                                                        className="delete-btn-icon"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Objective Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={obj.title || ""} 
                                                            onChange={(e) => updateProjListItem("overview.objectives", index, "title", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>FontAwesome Icon Class (e.g. FaCheckCircle)</label>
                                                        <input 
                                                            type="text" 
                                                            value={obj.icon || ""} 
                                                            onChange={(e) => updateProjListItem("overview.objectives", index, "icon", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group col-span-2">
                                                        <label>Description</label>
                                                        <textarea 
                                                            rows={2} 
                                                            value={obj.desc || ""} 
                                                            onChange={(e) => updateProjListItem("overview.objectives", index, "desc", e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Services Delivered */}
                                <div className="dashboard-card">
                                    <div className="card-header-actions">
                                        <h3>Services Delivered & Engineering Solutions</h3>
                                        <button 
                                            type="button" 
                                            onClick={() => addProjListItem("servicesDelivered", { icon: "FaBolt", title: "New Service", desc: "Service description copy" })}
                                            className="btn btn-secondary add-item-btn"
                                        >
                                            <FaPlus /> Add Service Block
                                        </button>
                                    </div>

                                    <div className="items-list-editor">
                                        {(projData.servicesDelivered || []).map((ser, index) => (
                                            <div key={index} className="item-editor-block">
                                                <div className="item-editor-header">
                                                    <h4>Service #{index + 1}: {ser.title}</h4>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => deleteProjListItem("servicesDelivered", index)} 
                                                        className="delete-btn-icon"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Service Block Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={ser.title || ""} 
                                                            onChange={(e) => updateProjListItem("servicesDelivered", index, "title", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>FontAwesome Icon Class (e.g. FaBolt, FaCogs)</label>
                                                        <input 
                                                            type="text" 
                                                            value={ser.icon || ""} 
                                                            onChange={(e) => updateProjListItem("servicesDelivered", index, "icon", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group col-span-2">
                                                        <label>Description Detail</label>
                                                        <textarea 
                                                            rows={2} 
                                                            value={ser.desc || ""} 
                                                            onChange={(e) => updateProjListItem("servicesDelivered", index, "desc", e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Highlights / KPIs */}
                                <div className="dashboard-card">
                                    <div className="card-header-actions">
                                        <h3>Project KPIs & Highlights</h3>
                                        <button 
                                            type="button" 
                                            onClick={() => addProjListItem("highlights", { icon: "FaCheckCircle", title: "New KPI", value: "KPI value" })}
                                            className="btn btn-secondary add-item-btn"
                                        >
                                            <FaPlus /> Add KPI Card
                                        </button>
                                    </div>

                                    <div className="items-list-editor">
                                        {(projData.highlights || []).map((hig, index) => (
                                            <div key={index} className="item-editor-block">
                                                <div className="item-editor-header">
                                                    <h4>KPI #{index + 1}: {hig.title}</h4>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => deleteProjListItem("highlights", index)} 
                                                        className="delete-btn-icon"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>KPI Heading</label>
                                                        <input 
                                                            type="text" 
                                                            value={hig.title || ""} 
                                                            onChange={(e) => updateProjListItem("highlights", index, "title", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>FontAwesome Icon Class (e.g. FaIndustry, FaCheckCircle)</label>
                                                        <input 
                                                            type="text" 
                                                            value={hig.icon || ""} 
                                                            onChange={(e) => updateProjListItem("highlights", index, "icon", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group col-span-2">
                                                        <label>KPI value outcome details</label>
                                                        <input 
                                                            type="text" 
                                                            value={hig.value || ""} 
                                                            onChange={(e) => updateProjListItem("highlights", index, "value", e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Gallery Images */}
                                <div className="dashboard-card">
                                    <div className="card-header-actions">
                                        <h3>Visual Showcase Gallery</h3>
                                        <button 
                                            type="button" 
                                            onClick={() => addProjListItem("gallery", { src: "/Images/Project/mcc_showcase.webp", caption: "Image Caption" })}
                                            className="btn btn-secondary add-item-btn"
                                        >
                                            <FaPlus /> Add Gallery Image
                                        </button>
                                    </div>

                                    <div className="items-list-editor">
                                        {(projData.gallery || []).map((img, index) => (
                                            <div key={index} className="item-editor-block">
                                                <div className="item-editor-header">
                                                    <h4>Image #{index + 1}: {img.caption}</h4>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => deleteProjListItem("gallery", index)} 
                                                        className="delete-btn-icon"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Image Source URL</label>
                                                        <input 
                                                            type="text" 
                                                            value={img.src || ""} 
                                                            onChange={(e) => updateProjListItem("gallery", index, "src", e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Brief Caption Description</label>
                                                        <input 
                                                            type="text" 
                                                            value={img.caption || ""} 
                                                            onChange={(e) => updateProjListItem("gallery", index, "caption", e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Call to Action Block */}
                                <div className="dashboard-card">
                                    <h3>Bottom Call to Action Box</h3>
                                    <div className="form-grid">
                                        <div className="form-group col-span-2">
                                            <label>CTA Title Heading</label>
                                            <input 
                                                type="text" 
                                                value={projData.cta?.title || ""} 
                                                onChange={(e) => updateProjField("cta.title", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>CTA Supporting Copy</label>
                                            <textarea 
                                                rows={2} 
                                                value={projData.cta?.desc || ""} 
                                                onChange={(e) => updateProjField("cta.desc", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CTA Target Phone Number</label>
                                            <input 
                                                type="text" 
                                                value={projData.cta?.phone || ""} 
                                                onChange={(e) => updateProjField("cta.phone", e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CTA Target Sales Email</label>
                                            <input 
                                                type="text" 
                                                value={projData.cta?.email || ""} 
                                                onChange={(e) => updateProjField("cta.email", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* 7. TAB: MEDIA ASSET MANAGER */}
                    {activeTab === "media" && (
                        <div className="tab-pane">
                            <div className="dashboard-card">
                                <h3>Direct Upload Media Manager</h3>
                                <p style={{ color: "var(--gray)", marginBottom: "1.5rem" }}>
                                    Upload new images (`.png`, `.jpg`, `.webp`) or documents (`.pdf`) to the project assets folder. Once uploaded, copy the resulting asset URL and paste it into the respective page inputs.
                                </p>

                                <div className="media-uploader-box">
                                    <label className="uploader-drop-target">
                                        <FaImage className="uploader-icon" />
                                        <span>{uploading ? "Uploading file..." : "Click to select a file for upload"}</span>
                                        <input 
                                            type="file" 
                                            accept="image/*,application/pdf" 
                                            onChange={handleFileUpload} 
                                            disabled={uploading} 
                                            style={{ display: "none" }} 
                                        />
                                    </label>
                                </div>

                                {uploadedUrl && (
                                    <div className="upload-results-card">
                                        <div className="upload-success-icon"><FaCheck /></div>
                                        <div className="upload-results-info">
                                            <h4>File Uploaded Successfully!</h4>
                                            <div className="copy-link-group">
                                                <input type="text" readOnly value={uploadedUrl} />
                                                <button onClick={() => copyToClipboard(uploadedUrl)} className="btn btn-secondary">
                                                    {copied ? "Copied!" : <FaClipboard />}
                                                </button>
                                            </div>
                                            <p className="hint-p">Paste this value into any Category Image or Background Cover input above.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {uploadedFilesList.length > 0 && (
                                <div className="dashboard-card">
                                    <h3>Uploaded Files Log (Current Session)</h3>
                                    <div className="uploaded-files-deck">
                                        {uploadedFilesList.map((fileUrl, index) => (
                                            <div key={index} className="uploaded-file-row">
                                                <span className="file-url-span">{fileUrl}</span>
                                                <button onClick={() => copyToClipboard(fileUrl)} className="btn btn-secondary btn-sm">
                                                    Copy Path
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
