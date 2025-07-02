import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        // Auth kontrolü
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const category = formData.get('category') as string;

        if (!file) {
            return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
        }

        if (!category) {
            return NextResponse.json({ error: 'Kategori belirtilmeli' }, { status: 400 });
        }

        // Dosya türü kontrolü
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                error: 'Sadece JPEG, PNG, WebP ve AVIF dosyaları yüklenebilir'
            }, { status: 400 });
        }

        // Dosya boyutu kontrolü (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({
                error: 'Dosya boyutu 5MB\'dan büyük olamaz'
            }, { status: 400 });
        }

        // Dosya adını oluştur (benzersiz)
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const fileName = `${category}_${timestamp}.${extension}`;

        // Dosyayı ArrayBuffer'a çevir
        const bytes = await file.arrayBuffer();

        // Supabase Storage'a yükle
        const { error: uploadError } = await supabaseAdmin.storage
            .from('images')
            .upload(fileName, bytes, {
                contentType: file.type,
                upsert: true // Aynı isimde dosya varsa üzerine yaz
            });

        if (uploadError) {
            console.error('Supabase upload hatası:', uploadError);
            return NextResponse.json({
                error: 'Dosya Supabase\'e yüklenirken hata oluştu: ' + uploadError.message
            }, { status: 500 });
        }

        // Public URL'i al
        const { data: urlData } = supabaseAdmin.storage
            .from('images')
            .getPublicUrl(fileName);

        if (!urlData.publicUrl) {
            return NextResponse.json({
                error: 'Dosya URL\'i alınamadı'
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            url: urlData.publicUrl,
            fileName: fileName
        });

    } catch (error) {
        console.error('Dosya yükleme hatası:', error);
        return NextResponse.json({
            error: 'Dosya yüklenirken bir hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')
        }, { status: 500 });
    }
} 