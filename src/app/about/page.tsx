'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { FaBalanceScale, FaClock, FaHandshake, FaGraduationCap } from 'react-icons/fa';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  image_url: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8">Yükleniyor...</div>;
  }

  return (
    <>
      {/* Hero section */}
      <section className="relative h-[400px] bg-[#8B7D6B] text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about2.jpg"
            alt="Hakkımızda Sayfası Arka Plan"
            fill
            className="object-cover opacity-110"
            priority
          />
        </div>
        <div className="container mx-auto px-2 z-10 pt-0 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-6xl font-bold mb-4 text-[#e0e0e0]">Hakkımızda</h1>
          </div>
        </div>
      </section>

      {/* About content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#8B7D6B]">Hukuk Büromuz</h2>
              <p className="text-lg text-[#4A4A4A] mb-6">
                2003 yılında Av. Mehmet Can Çelimli tarafından kurulan hukuk büromuz, hukuki sorunlara profesyonel ve etkili çözümler sunmak amacıyla faaliyetlerine başlamıştır. Müvekkillerimizin haklarını korumak ve hukuki süreçleri en etkili şekilde yönetmek temel prensiplerimizdendir.
              </p>
              <p className="text-lg text-[#4A4A4A] mb-6">
                Deneyimli avukat kadromuz ile ceza hukuku, aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku gibi birçok alanda hizmet vermekteyiz. Her davayı titizlikle ele alıyor, müvekkillerimize özel çözümler sunuyoruz.
              </p>
              <p className="text-lg text-[#4A4A4A]">
                Uzun yıllara dayanan deneyimimiz ve alanında uzman avukatlarımızla, müvekkillerimize hukuki süreçlerde rehberlik etmekten ve haklarını korumaktan gurur duyuyoruz.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/ofis.jpg"
                  alt="Hukuk Bürosu Ofis Görseli"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16 bg-[#8B7D6B]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#8B7D6B]">Değerlerimiz</h2>
            <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto">
              Müvekkillerimize sunduğumuz hizmetin kalitesini belirleyen temel değerlerimiz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                <FaBalanceScale size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Adalet</h3>
              <p className="text-[#4A4A4A]">
                Her müvekkilimize adil ve eşit davranır, hak ettikleri hukuki temsili sağlarız.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                <FaHandshake size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Güven</h3>
              <p className="text-[#4A4A4A]">
                Müvekkillerimizle güvene dayalı ilişkiler kurar, her zaman şeffaf iletişim sağlarız.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                <FaGraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Uzmanlık</h3>
              <p className="text-[#4A4A4A]">
                Sürekli kendimizi geliştirerek hukukun her alanında uzmanlığımızı pekiştiririz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#8B7D6B] text-white p-4 rounded-full inline-block mb-4">
                <FaClock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#8B7D6B]">Dakiklik</h3>
              <p className="text-[#4A4A4A]">
                Hukuki süreçleri zamanında takip eder, müvekkillerimizi sürekli bilgilendiririz.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      

      {/* CTA section */}
      <section className="bg-[#8B7D6B] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hukuki Danışmanlık İçin Hemen İletişime Geçin</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[#E8E2D9]">
            Profesyonel ekibimiz, hukuki sorunlarınıza çözüm bulmak için hazır. İlk görüşme ücretsizdir.
          </p>
          <Link href="/contact" className="bg-white text-[#8B7D6B] hover:bg-[#E8E2D9] px-8 py-4 rounded-md font-medium text-lg transition-colors inline-block">
            Randevu Alın
          </Link>
        </div>
      </section>
    </>
  );
} 