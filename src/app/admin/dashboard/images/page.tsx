'use client';

import { useState, useEffect, useRef } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/siteSettings';
import { SiteImages } from '@/types/blog';
import Image from 'next/image';

export default function ImagesPage() {
    const [images, setImages] = useState<SiteImages>({
        home_hero: '',
        home_person: '',
        about_hero: '',
        about_office: '',
        services_hero: '',
        contact_hero: '',
        blog_hero: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    // Site resimlerini yükle
    useEffect(() => {
        const loadImages = async () => {
            try {
                const siteImages = await getSiteSettings();
                setImages(siteImages);
            } catch (error) {
                console.error('Resimler yüklenemedi:', error);
                setMessage({ text: 'Resimler yüklenemedi', type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    // Dosya yükleme işlemi
    const handleFileUpload = async (key: keyof SiteImages, file: File) => {
        setUploading(key);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('category', key);

            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setImages(prev => ({
                    ...prev,
                    [key]: result.url
                }));
                setMessage({ text: 'Resim başarıyla yüklendi!', type: 'success' });
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ text: result.error || 'Dosya yüklenirken hata oluştu', type: 'error' });
            }
        } catch (error) {
            console.error('Yükleme hatası:', error);
            setMessage({ text: 'Dosya yüklenirken hata oluştu', type: 'error' });
        } finally {
            setUploading(null);
        }
    };

    // Dosya seçme işlemi
    const handleFileSelect = (key: keyof SiteImages, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(key, file);
        }
    };

    // Dosya seçme butonuna tıklama
    const triggerFileSelect = (key: keyof SiteImages) => {
        fileInputRefs.current[key]?.click();
    };

    // Ayarları kaydet
    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            const success = await updateSiteSettings(images);

            if (success) {
                setMessage({ text: 'Tüm resimler başarıyla kaydedildi!', type: 'success' });
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ text: 'Resimler kaydedilirken hata oluştu', type: 'error' });
            }
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            setMessage({ text: 'Kaydetme işlemi başarısız', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    // Resmi sil
    const handleRemoveImage = (key: keyof SiteImages) => {
        setImages(prev => ({
            ...prev,
            [key]: ''
        }));
        setMessage({ text: 'Resim kaldırıldı. Değişiklikleri kaydetmeyi unutmayın.', type: 'success' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const imageConfig = [
        { key: 'home_hero' as keyof SiteImages, label: 'Ana Sayfa Hero', description: 'Ana sayfanın üst kısmındaki büyük resim (1200x600px önerilir)' },
        { key: 'home_person' as keyof SiteImages, label: 'Ana Sayfa Kişi', description: 'Ana sayfadaki avukat fotoğrafı (800x600px önerilir)' },
        { key: 'about_hero' as keyof SiteImages, label: 'Hakkımızda Hero', description: 'Hakkımızda sayfasının üst resmi (1200x600px önerilir)' },
        { key: 'about_office' as keyof SiteImages, label: 'Hakkımızda Ofis', description: 'Hakkımızda sayfasındaki ofis resmi (800x600px önerilir)' },
        { key: 'services_hero' as keyof SiteImages, label: 'Hizmetler Hero', description: 'Hizmetler sayfasının üst resmi (1200x600px önerilir)' },
        { key: 'contact_hero' as keyof SiteImages, label: 'İletişim Hero', description: 'İletişim sayfasının üst resmi (1200x600px önerilir)' },
        { key: 'blog_hero' as keyof SiteImages, label: 'Blog Hero', description: 'Blog sayfasının üst resmi (1200x600px önerilir)' },
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Site Resimleri</h1>
                <p className="text-gray-600">Web sitesinde kullanılan resimleri buradan yükleyebilir ve yönetebilirsiniz.</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-8">
                {imageConfig.map((config) => (
                    <div key={config.key} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Resim Önizleme */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{config.label}</h3>
                                <p className="text-sm text-gray-600 mb-4">{config.description}</p>

                                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                                    {images[config.key] ? (
                                        <>
                                            <Image
                                                src={images[config.key]}
                                                alt={config.label}
                                                fill
                                                className="object-cover"
                                                onError={() => {
                                                    console.error(`Resim yüklenemedi: ${images[config.key]}`);
                                                }}
                                            />
                                            {/* Resim kaldırma butonu */}
                                            <button
                                                onClick={() => handleRemoveImage(config.key)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                                title="Resmi kaldır"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm">Resim yüklenmedi</p>
                                        </div>
                                    )}

                                    {/* Yükleme göstergesi */}
                                    {uploading === config.key && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <div className="text-center text-white">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                                                <p className="text-sm">Yükleniyor...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dosya Yükleme Kontrolü */}
                            <div className="flex flex-col justify-center">
                                <div className="space-y-4">
                                    {/* Gizli dosya input'u */}
                                    <input
                                        ref={(el) => { fileInputRefs.current[config.key] = el; }}
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                                        onChange={(e) => handleFileSelect(config.key, e)}
                                        className="hidden"
                                    />

                                    {/* Dosya seçme butonu */}
                                    <button
                                        onClick={() => triggerFileSelect(config.key)}
                                        disabled={uploading === config.key}
                                        className={`w-full px-4 py-3 rounded-lg border-2 border-dashed transition-colors ${uploading === config.key
                                            ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                                            : 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 cursor-pointer'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center">
                                            <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="text-sm text-blue-700 font-medium">
                                                {uploading === config.key ? 'Yükleniyor...' : 'Resim Seç'}
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1">
                                                JPG, PNG, WebP, AVIF (Max 5MB)
                                            </p>
                                        </div>
                                    </button>

                                    {/* Mevcut resim bilgisi */}
                                    {images[config.key] && (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-600 font-medium mb-1">Mevcut resim:</p>
                                            <p className="text-xs text-gray-800 break-all">{images[config.key]}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Kaydet Butonu */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`px-6 py-3 rounded-lg font-semibold ${saving
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        }`}
                >
                    {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
            </div>

            {/* Kullanım Rehberi */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Kullanım Rehberi</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Resim seçmek için &ldquo;Resim Seç&rdquo; butonuna tıklayın</li>
                    <li>• Desteklenen formatlar: JPG, PNG, WebP, AVIF</li>
                    <li>• Maksimum dosya boyutu: 5MB</li>
                    <li>• Önerilen boyutlar: Hero resimler için 1200x600px, diğer resimler için 800x600px</li>
                    <li>• Yüklenen resimler otomatik olarak benzersiz isimle kaydedilir</li>
                    <li>• Resim değiştirdikten sonra &ldquo;Değişiklikleri Kaydet&rdquo; butonuna tıklamayı unutmayın</li>
                    <li>• Resimler tüm sayfalarda otomatik olarak güncellenecektir</li>
                </ul>
            </div>
        </div>
    );
} 