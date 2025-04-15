import { cookies } from 'next/headers';
import { supabase } from './supabase';
import { User } from '@/types/supabase';

export const login = async (email: string, password: string) => {
  try {
    // E-posta ve şifreyi kontrol et
    if (email !== 'admin@example.com' || password !== 'admin123') {
      return { status: false, code: 'invalid-credentials' };
    }

    // Kullanıcıyı veritabanında kontrol et
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !userData) {
      return { status: false, code: 'invalid-credentials' };
    }

    // Session oluştur (basit bir token olarak userId kullanıyoruz)
    const session = {
      user: userData,
      token: userData.id
    };

    // Store session in cookies
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return { status: true, code: 'login-success' };
  } catch (error) {
    console.error('Login error:', error);
    return { status: false, code: 'server-error' };
  }
};

export const logout = async () => {
  try {
    // Clear session cookie
    const cookieStore = await cookies();
    cookieStore.delete('session');

    return { status: true, code: 'logout-success' };
  } catch (error) {
    console.error('Logout error:', error);
    return { status: false, code: 'logout-error' };
  }
};

export const currentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    // Await the get() call
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return null;
    }

    // Get session from cookie
    const session = JSON.parse(sessionCookie.value);

    // Get user data from Supabase
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error || !userData) {
      return null;
    }

    return userData as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}; 