import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
    try {
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
        const extension = path.extname(file.name);
        const fileName = `${category}_${timestamp}${extension}`;

        // Upload klasörünü kontrol et ve oluştur
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Dosyayı kaydet
        const filePath = path.join(uploadDir, fileName);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await writeFile(filePath, buffer);

        // URL'i döndür
        const fileUrl = `/uploads/${fileName}`;

        return NextResponse.json({
            success: true,
            url: fileUrl,
            fileName: fileName
        });

    } catch (error) {
        console.error('Dosya yükleme hatası:', error);
        return NextResponse.json({
            error: 'Dosya yüklenirken bir hata oluştu'
        }, { status: 500 });
    }
} 