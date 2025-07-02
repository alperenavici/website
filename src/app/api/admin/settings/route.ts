import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Site ayarlarını getir
export async function GET() {
    try {
        const { data: settings, error } = await supabase
            .from('site_settings')
            .select('*')
            .order('key', { ascending: true });

        if (error) {
            console.error('Settings fetch error:', error);
            return NextResponse.json({ error: 'Ayarlar yüklenemedi' }, { status: 500 });
        }

        // Ayarları key-value formatında döndür
        const settingsObj = settings?.reduce((acc: Record<string, string>, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {} as Record<string, string>) || {};

        return NextResponse.json(settingsObj);
    } catch (error) {
        console.error('Settings GET error:', error);
        return NextResponse.json({ error: 'Server hatası' }, { status: 500 });
    }
}

// Site ayarlarını güncelle
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { settings } = body;

        if (!settings || typeof settings !== 'object') {
            return NextResponse.json({ error: 'Geçersiz ayar verisi' }, { status: 400 });
        }

        // Her ayarı ayrı ayrı güncelle
        console.log('Updating settings:', settings);
        const updatePromises = Object.entries(settings).map(async ([key, value]) => {
            console.log(`Updating setting: ${key} = ${value}`);
            const { error } = await supabase
                .from('site_settings')
                .upsert({
                    key,
                    value: value as string,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'key'
                });

            if (error) {
                console.error(`Error updating setting ${key}:`, error);
                throw error;
            }
        });

        await Promise.all(updatePromises);

        return NextResponse.json({
            success: true,
            message: 'Ayarlar başarıyla güncellendi'
        });
    } catch (error) {
        console.error('Settings PUT error:', error);
        return NextResponse.json({ error: 'Ayarlar güncellenemedi' }, { status: 500 });
    }
} 