import { useState, useEffect } from 'react';
import { SiteImages } from '@/types/blog';

// Varsayılan resim değerleri
const defaultImages: SiteImages = {
    home_hero: '/images/home1.jpg',
    home_person: '/images/person.jpg',
    about_hero: '/images/about2.jpg',
    about_office: '/images/ofis.jpg',
    services_hero: '/images/services.jpg',
    contact_hero: '/images/contact2.jpg',
    blog_hero: '/images/blog2.jpg',
};

// Site ayarlarını çek
export async function getSiteSettings(): Promise<SiteImages> {
    try {
        const response = await fetch('/api/admin/settings', {
            method: 'GET',
            cache: 'no-store', // Always get fresh data
        });

        if (!response.ok) {
            console.warn('Site ayarları yüklenemedi, varsayılan değerler kullanılıyor');
            return defaultImages;
        }

        const settings = await response.json();

        // Veritabanından gelen ayarları varsayılan değerlerle birleştir
        return {
            home_hero: settings.home_hero || defaultImages.home_hero,
            home_person: settings.home_person || defaultImages.home_person,
            about_hero: settings.about_hero || defaultImages.about_hero,
            about_office: settings.about_office || defaultImages.about_office,
            services_hero: settings.services_hero || defaultImages.services_hero,
            contact_hero: settings.contact_hero || defaultImages.contact_hero,
            blog_hero: settings.blog_hero || defaultImages.blog_hero,
        };
    } catch (error) {
        console.error('Site ayarları yükleme hatası:', error);
        return defaultImages;
    }
}

// Site ayarlarını güncelle
export async function updateSiteSettings(images: Partial<SiteImages>): Promise<boolean> {
    try {
        const response = await fetch('/api/admin/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ settings: images }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Site ayarları güncellenemedi:', response.status, errorText);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Site ayarları güncelleme hatası:', error);
        return false;
    }
}

// Browser-side hook
export function useSiteImages() {
    const [images, setImages] = useState<SiteImages>(defaultImages);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const siteImages = await getSiteSettings();
                setImages(siteImages);
            } catch (error) {
                console.error('Site resimleri yüklenemedi:', error);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    return { images, loading, setImages };
} 