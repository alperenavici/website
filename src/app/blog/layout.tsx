export const metadata = {
  title: 'Blog | Av. Mehmet Yılmaz Hukuk Bürosu',
  description: 'Hukuki konularda bilgilendirici yazılar ve güncel hukuki gelişmeler.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 