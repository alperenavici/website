import { logout } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const result = await logout();
    
    if (result.status) {
      return NextResponse.json({ message: 'Logout successful' });
    } else {
      return NextResponse.json(
        { message: 'Logout failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 