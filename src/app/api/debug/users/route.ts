import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json(
        { message: 'Error fetching users', error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Users fetched successfully',
      count: data?.length || 0,
      data
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 