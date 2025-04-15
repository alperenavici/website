import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { getPosts, createPost } from '@/lib/admin';

// Direkt session kontrolü ve kullanıcı verisi döndürme
async function checkAdminAuth() {
  try {
    const cookiesList = await cookies();
    const sessionCookie = cookiesList.get('session');
    
    if (!sessionCookie) {
      return { isAdmin: false, userId: null };
    }
    
    const session = JSON.parse(sessionCookie.value);
    
    if (!session || !session.user || !session.user.id) {
      return { isAdmin: false, userId: null };
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', session.user.id)
      .single();
    
    if (error || !data || data.role !== 'ADMIN') {
      return { isAdmin: false, userId: null };
    }
    
    return { isAdmin: true, userId: data.id };
  } catch (error) {
    console.error('Auth check error:', error);
    return { isAdmin: false, userId: null };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is an admin
    const { isAdmin } = await checkAdminAuth();
    
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const q = searchParams.get('q') || undefined;
    const category = searchParams.get('category') || undefined;
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortDesc = searchParams.get('sortDesc') === 'true';
    const featured = searchParams.get('featured') === 'true' ? true :
                     searchParams.get('featured') === 'false' ? false : undefined;
    
    const posts = await getPosts({
      page,
      limit,
      q,
      category,
      sortBy,
      sortDesc,
      featured,
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is an admin
    const { isAdmin, userId } = await checkAdminAuth();
    
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { title, content, categoryId, coverImage } = body;
    
    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const post = await createPost({
      title,
      content,
      categoryId,
      coverImage: coverImage || '',
      authorId: userId || '',
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 