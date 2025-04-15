import { login } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email ve şifre gereklidir' },
        { status: 400 }
      );
    }

    const result = await login(email, password);

    if (result.status) {
      return NextResponse.json({ message: 'Giriş başarılı' });
    } else {
      return NextResponse.json(
        { message: 'Geçersiz email veya şifre' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Giriş işlemi sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
} 