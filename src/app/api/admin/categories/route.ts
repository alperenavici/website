import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { getCategories, createCategory } from '@/lib/admin';

// Direkt session kontrolü
async function checkAdminAuth() {
  try {
    console.log('Checking admin auth...');
    const cookiesList = await cookies();
    console.log('Cookies retrieved');
    const sessionCookie = cookiesList.get('session');
    
    console.log('Session cookie:', sessionCookie ? 'Found' : 'Not found');
    
    if (!sessionCookie) {
      console.log('No session cookie found');
      return false;
    }
    
    const session = JSON.parse(sessionCookie.value);
    console.log('Session parsed, user id:', session?.user?.id);
    
    if (!session || !session.user || !session.user.id) {
      console.log('Invalid session structure');
      return false;
    }
    
    console.log('Checking user role in database...');
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return false;
    }
    
    if (!data) {
      console.log('No user data found');
      return false;
    }
    
    console.log('User role:', data.role);
    
    if (data.role !== 'ADMIN') {
      console.log('User is not an admin');
      return false;
    }
    
    console.log('User is admin, authentication successful');
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

export async function GET() {
  try {
    // Check if user is authenticated and is an admin
    const isAdmin = await checkAdminAuth();
    
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const categories = await getCategories();
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is an admin
    const isAdmin = await checkAdminAuth();
    
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json(
        { message: 'Category name is required' },
        { status: 400 }
      );
    }
    
    const category = await createCategory({ name });
    
    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 