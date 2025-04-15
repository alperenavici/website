import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Admin kullanıcısı var mı kontrol et
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@example.com')
      .single();
    
    if (existingUserError && existingUserError.code !== 'PGRST116') {
      console.error('Error checking admin user:', existingUserError);
      return NextResponse.json(
        { message: 'Error checking admin user', error: existingUserError.message },
        { status: 500 }
      );
    }
    
    // Admin kullanıcısı yoksa oluştur
    if (!existingUser) {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: 'admin@example.com',
          username: 'admin',
          role: 'ADMIN',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (createError) {
        console.error('Error creating admin user:', createError);
        return NextResponse.json(
          { message: 'Error creating admin user', error: createError.message },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        message: 'Admin user created successfully',
        user: newUser
      });
    }
    
    // Admin kullanıcısı zaten var
    return NextResponse.json({
      message: 'Admin user already exists',
      user: existingUser
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 