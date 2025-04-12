'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaCalendarAlt, FaUser, FaFolder } from 'react-icons/fa';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { getBlogPostBySlug } from '@/data/blogPosts';
import { getBlogCategories } from '@/data/blogCategories';
import { BlogPost, BlogCategory } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    const postData = getBlogPostBySlug(slug);
    const categoriesData = getBlogCategories();
    setPost(postData);
    setCategories(categoriesData);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaFolder />
                  <Link
                    href={`/blog/category/${post.category.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.category.name}
                  </Link>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 