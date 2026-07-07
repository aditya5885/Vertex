import React, { createContext, useState, useEffect, useContext } from "react";
import type { SiteContent } from "../data/defaultContent";
import { defaultContent } from "../data/defaultContent";

interface ContentContextType {
    content: SiteContent;
    loading: boolean;
    error: string | null;
    saveContent: (newContent: SiteContent) => Promise<boolean>;
    isLoggedIn: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // Load content on mount
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch("/api/content");
                if (res.ok) {
                    const data = await res.json();
                    setContent(data);
                } else {
                    console.warn("Failed to load CMS content, using default data fallbacks.");
                }
            } catch (err) {
                console.error("Error fetching content, using fallback static copy:", err);
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        // Check if admin is logged in from session storage
        const token = sessionStorage.getItem("adminToken");
        if (token) {
            setIsLoggedIn(true);
        }

        fetchContent();
    }, []);

    // Save content updates to disk via server API
    const saveContent = async (newContent: SiteContent): Promise<boolean> => {
        try {
            const token = sessionStorage.getItem("adminToken") || "";
            const res = await fetch("/api/content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newContent)
            });

            if (res.ok) {
                setContent(newContent);
                return true;
            } else {
                const data = await res.json().catch(() => ({}));
                console.error("Failed to save content updates:", data.message || "Unknown error");
                return false;
            }
        } catch (err) {
            console.error("Network error during save operation:", err);
            return false;
        }
    };

    // Authenticate Admin
    const login = async (password: string): Promise<boolean> => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                const data = await res.json();
                sessionStorage.setItem("adminToken", data.token);
                setIsLoggedIn(true);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Login request failed:", err);
            return false;
        }
    };

    const logout = () => {
        sessionStorage.removeItem("adminToken");
        setIsLoggedIn(false);
    };

    return (
        <ContentContext.Provider value={{ content, loading, error, saveContent, isLoggedIn, login, logout }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
};
