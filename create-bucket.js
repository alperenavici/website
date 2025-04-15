const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function createBucket() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Supabase URL veya ANON KEY bulunamadı');
    return;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase.storage.createBucket('images', {
    public: true
  });

  if (error) {
    console.error('Bucket oluşturma hatası:', error.message);
  } else {
    console.log('images bucket başarıyla oluşturuldu');
  }
}

createBucket().catch(console.error); 