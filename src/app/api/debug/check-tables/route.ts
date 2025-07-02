import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // site_settings tablosunu kontrol et
        const { data: tableCheck, error: tableError } = await supabase
            .from('site_settings')
            .select('*')
            .limit(1);

        if (tableError) {
            console.log('site_settings tablosu bulunamadı:', tableError);

            return NextResponse.json({
                success: false,
                message: 'site_settings tablosu bulunamadı',
                tableExists: false,
                error: tableError,
                sqlToCreateTable: `
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default values
INSERT INTO site_settings (key, value) VALUES
('home_hero', '/images/home1.jpg'),
('home_person', '/images/person.jpg'),
('about_hero', '/images/about2.jpg'),
('about_office', '/images/ofis.jpg'),
('services_hero', '/images/services.jpg'),
('contact_hero', '/images/contact2.jpg'),
('blog_hero', '/images/blog2.jpg')
ON CONFLICT (key) DO NOTHING;
                `
            });
        }

        return NextResponse.json({
            success: true,
            message: 'site_settings tablosu mevcut',
            tableExists: true,
            rowCount: tableCheck?.length || 0,
            data: tableCheck
        });

    } catch (error) {
        console.error('Table check error:', error);
        return NextResponse.json({
            success: false,
            error: 'Tablo kontrolü yapılamadı',
            details: error
        }, { status: 500 });
    }
}

// POST endpoint to create table manually
export async function POST() {
    try {
        // Try to create table using raw SQL
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS site_settings (
                id SERIAL PRIMARY KEY,
                key VARCHAR(255) UNIQUE NOT NULL,
                value TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const insertDefaultSQL = `
            INSERT INTO site_settings (key, value) VALUES
            ('home_hero', '/images/home1.jpg'),
            ('home_person', '/images/person.jpg'),
            ('about_hero', '/images/about2.jpg'),
            ('about_office', '/images/ofis.jpg'),
            ('services_hero', '/images/services.jpg'),
            ('contact_hero', '/images/contact2.jpg'),
            ('blog_hero', '/images/blog2.jpg')
            ON CONFLICT (key) DO NOTHING;
        `;

        // Note: This might not work with Supabase client
        // User will need to run SQL manually in Supabase dashboard

        return NextResponse.json({
            success: false,
            message: 'Lütfen Supabase Dashboard SQL Editor\'inde aşağıdaki SQL\'i çalıştırın',
            sql: createTableSQL + '\n\n' + insertDefaultSQL
        });

    } catch (error) {
        console.error('Table creation error:', error);
        return NextResponse.json({
            success: false,
            error: 'Tablo oluşturulamadı',
            details: error
        }, { status: 500 });
    }
} 