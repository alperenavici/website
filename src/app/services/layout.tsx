import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hizmetlerimiz | Av. Mehmet Can Çelimli Bürosu',
    description: 'Hukuk büromuzun sunduğu hizmetler ve uzmanlık alanları hakkında bilgi edinin.',
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
} 