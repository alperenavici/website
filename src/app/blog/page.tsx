import BlogPageClient from "./page-client";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const selectedCategory = (await searchParams).category as string;
  return <BlogPageClient selectedCategory={selectedCategory} />;
}
