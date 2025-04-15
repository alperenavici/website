import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { getPostById, updatePost, deletePost } from '@/lib/admin';

// Direkt session kontrolü
async function checkAdminAuth() {
  try {
    const cookiesList = await cookies();
    const sessionCookie = await cookiesList.get('session');
    
    if (!sessionCookie) {
      return false;
    }
    
    const session = JSON.parse(sessionCookie.value);
    
    if (!session || !session.user || !session.user.id) {
      return false;
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (error || !data || data.role !== 'ADMIN') {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const isAdmin = await checkAdminAuth();
    
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    const post = await getPostById(id);
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const isAdmin = await checkAdminAuth();
    
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    const post = await updatePost(id, body);
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const isAdmin = await checkAdminAuth();
    
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    await deletePost(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 