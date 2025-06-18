'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [showSplash, setShowSplash] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Sayfa yenilenme kontrolü - eğer daha önce ziyaret edilmişse splash gösterme
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (hasVisited) {
            setShowSplash(false);
        } else {
            sessionStorage.setItem('hasVisited', 'true');
        }
    }, []);

    const handleSplashFinish = () => {
        setShowSplash(false);
    };

    useEffect(() => {
        if (isClient) {
            // Metadata'yı dinamik olarak ayarla
            document.title = "Av. Mehmet Can Çelimli | Hukuk Bürosu";

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Profesyonel hukuki danışmanlık ve avukatlık hizmetleri');
            } else {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = 'Profesyonel hukuki danışmanlık ve avukatlık hizmetleri';
                document.head.appendChild(meta);
            }

            // Favicon ayarla
            const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
            if (favicon) {
                favicon.href = '/favicon.png';
            } else {
                const link = document.createElement('link');
                link.rel = 'icon';
                link.href = '/favicon.png';
                document.head.appendChild(link);
            }
        }
    }, [isClient]);

    if (!isClient) {
        return <>{children}</>; // Server-side rendering sırasında sadece children'ı göster
    }

    return (
        <>
            {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
            {children}
        </>
    );
} 