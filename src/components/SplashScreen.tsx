'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
    onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 2 saniye sonra splash screen'i kaldır
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Animasyon bitimini bekle
            setTimeout(() => {
                onFinish();
            }, 500); // Fade out animasyonu için ekstra süre
        }, 2000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!isVisible) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50 animate-fadeOut">
                <div className="text-center animate-scaleOut">
                    {/* Modern logo container */}
                    <div className="relative w-56 h-56 mx-auto mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl rotate-6 opacity-20"></div>
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/30 backdrop-blur-sm bg-white/10 shadow-2xl">
                            <Image
                                src="/images/musti.jpg"
                                alt="Av. Mehmet Can Çelimli"
                                fill
                                className="object-contain p-2"
                                priority
                                quality={95}
                                sizes="224px"
                            />
                        </div>
                    </div>

                    {/* Modern typography */}
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Av. Mehmet Can Çelimli
                        </h1>
                        <p className="text-xl text-blue-300 font-medium tracking-wide">
                            Hukuk Bürosu
                        </p>
                    </div>

                    {/* Modern loading */}
                    <div className="mt-12">
                        <div className="w-20 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-loadingBar"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            <div className="text-center animate-fadeIn relative z-10">
                {/* Modern logo container with animation */}
                <div className="relative w-56 h-56 mx-auto mb-8 animate-scaleIn">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl rotate-6 opacity-20 animate-pulse"></div>
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/30 backdrop-blur-sm bg-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300">
                        <Image
                            src="/images/musti.jpg"
                            alt="Av. Mehmet Can Çelimli"
                            fill
                            className="object-contain p-2"
                            priority
                            quality={95}
                            sizes="224px"
                        />
                    </div>
                </div>

                {/* Modern typography with staggered animation */}
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-slideUp">
                        Av. Mehmet Can Çelimli
                    </h1>
                    <p className="text-xl text-blue-300 font-medium tracking-wide animate-slideUp" style={{ animationDelay: '0.2s' }}>
                        Hukuk Bürosu
                    </p>
                    <div className="text-sm text-gray-400 font-light animate-slideUp" style={{ animationDelay: '0.4s' }}>
                        Profesyonel Hukuki Danışmanlık
                    </div>
                </div>

                {/* Modern loading with pulse */}
                <div className="mt-12 animate-slideUp" style={{ animationDelay: '0.6s' }}>
                    <div className="w-20 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-loadingBar"></div>
                    </div>
                    <div className="mt-4 text-xs text-gray-400 font-light animate-pulse">
                        Yükleniyor...
                    </div>
                </div>
            </div>
        </div>
    );
} 