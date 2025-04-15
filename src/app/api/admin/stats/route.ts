import { currentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if user is authenticated and is an admin
    const user = await currentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get posts count
    const { count: postsCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true });
    
    // Get categories count
    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });
    
    // Get comments count
    const { count: commentsCount } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true });
    
    // Get pending comments count
    const { count: pendingCommentsCount } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'PENDING');
    
    return NextResponse.json({
      postsCount: postsCount || 0,
      categoriesCount: categoriesCount || 0,
      commentsCount: commentsCount || 0,
      pendingCommentsCount: pendingCommentsCount || 0,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 