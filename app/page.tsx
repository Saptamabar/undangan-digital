"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { 
  BiHeart, BiPlayCircle, BiPauseCircle, BiEnvelopeOpen, BiCalendarHeart, 
  BiTime, BiSolidMap, BiSolidGift, BiSolidBank, BiSolidPackage 
} from "react-icons/bi";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 data-aos="fade-up" className="font-heading text-5xl md:text-6xl text-center text-brand-dark">
    {children}
  </h2>
);

export default function WeddingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGiftInfo, setShowGiftInfo] = useState<'bank' | 'address' | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const weddingDate = new Date("Dec 21, 2025 09:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      if (distance < 0) {
        clearInterval(interval); return;
      }
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    audioRef.current?.play().catch(err => console.error("Audio play failed:", err));
    setIsPlaying(true);
  };
  
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="font-body text-brand-gray bg-brand-light">
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {isOpen && (
        <button onClick={toggleMusic} className="fixed bottom-5 right-5 z-50 w-12 h-12 bg-gold/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-gold transition-all">
          {isPlaying ? <BiPauseCircle /> : <BiPlayCircle />}
        </button>
      )}

      <div className={`fixed top-0 left-0 w-full h-full bg-cover bg-center flex justify-center items-center z-50 transition-opacity duration-1000 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white p-5 animate-fade-in">
          <h4 className="text-lg tracking-widest">The Wedding of</h4>
          <h1 className="font-heading text-6xl my-4">Sasa & Mas Mas</h1>
          <p className="mt-8">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="font-bold text-lg">[Nama Tamu Undangan]</p>
          <button onClick={handleOpenInvitation} className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-gold text-white rounded-full hover:bg-opacity-80 transition-colors shadow-lg">
            <BiEnvelopeOpen /> Buka Undangan
          </button>
        </div>
      </div>

      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <header className="relative h-screen flex items-center justify-center text-white text-center bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale')" }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 p-5">
            <h4 data-aos="fade-down" className="tracking-widest">THE WEDDING OF</h4>
            <h1 data-aos="zoom-in" data-aos-delay="200" className="font-heading text-7xl my-4">Sasa & Mas Mas</h1>
            <p data-aos="fade-up" data-aos-delay="400" className="text-xl">21 Desember 2025</p>
            <div data-aos="fade-up" data-aos-delay="600" className="flex justify-center gap-4 mt-8">
              {Object.entries(countdown).map(([unit, value]) => (
                <div key={unit} className="p-4 bg-black/40 rounded-lg border border-white/20 min-w-[80px]">
                  <span className="block text-4xl font-bold">{String(value).padStart(2, '0')}</span> <span className="capitalize">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="py-20 px-5 bg-gray-50/50">
            <div data-aos="fade-up" className="max-w-3xl mx-auto text-center italic">
                <p className="text-xl md:text-2xl leading-relaxed">"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."</p>
                <h4 className="font-heading text-2xl mt-6">- QS. Ar-Rum: 21 -</h4>
            </div>
        </section>

        {/* ✅ PERUBAHAN: Menambahkan background bunga di Couple Section */}
        <section className="py-20 px-5 overflow-hidden relative bg-floral-pattern bg-cover bg-center">
            <div className="absolute inset-0 bg-white/80 z-0"></div>
            <div className="relative z-10">
                <SectionTitle>Dengan Rahmat Tuhan</SectionTitle>
                <p data-aos="fade-up" className="text-center max-w-2xl mx-auto mt-4 mb-16">Kami bersatu dalam ikatan suci pernikahan, putra dan putri dari keluarga:</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
                    <div data-aos="fade-right" className="text-center">
                        <div className="relative w-48 h-48 mx-auto">
                            <div className="absolute inset-0 bg-gold/20 rounded-full"></div>
                            <Image src="https://picsum.photos/id/1027/400/400" alt="Sasa" width={192} height={192} className="rounded-full relative filter grayscale brightness-50 contrast-200" />
                        </div>
                        <h3 className="font-heading text-4xl mt-6">Sasa Putri</h3>
                        <p className="mt-2 text-lg">Bapak John Doe & Ibu Jane Doe</p>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="300" className="font-heading text-7xl text-gold">&</div>
                    <div data-aos="fade-left" className="text-center">
                        <div className="relative w-48 h-48 mx-auto">
                            <div className="absolute inset-0 bg-gold/20 rounded-full"></div>
                            <Image src="https://picsum.photos/id/1005/400/400" alt="Mas Mas" width={192} height={192} className="rounded-full relative filter grayscale brightness-50 contrast-200" />
                        </div>
                        <h3 className="font-heading text-4xl mt-6">Mas Mas Siregar</h3>
                        <p className="mt-2 text-lg">Bapak James Siregar & Ibu Sarah Siregar</p>
                    </div>
                </div>
            </div>
        </section>

        <section data-aos="fade-up" className="py-20 px-5 bg-floral-pattern bg-cover bg-center relative">
            <div className="absolute inset-0 bg-white/80 z-0"></div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-10">
                <SectionTitle>Save The Date</SectionTitle>
                 <div data-aos="zoom-in-up" className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-left relative overflow-hidden">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 font-heading font-bold text-gold/70 text-7xl select-none">21</div>
                    <div className="ml-24">
                        <h3 className="font-heading text-4xl text-brand-dark mb-4 text-center">Akad Nikah</h3>
                        <p className="flex items-center gap-3 mb-2"><BiCalendarHeart className="text-gold text-2xl"/> Minggu, 21 Des 2025</p>
                        <p className="flex items-center gap-3 mb-2"><BiTime className="text-gold text-2xl"/> 09:00 WIB</p>
                        <p className="flex items-start gap-3"><BiSolidMap className="text-gold text-2xl flex-shrink-0 mt-1"/> Balai Kota Bandung</p>
                    </div>
                </div>
                <div data-aos="zoom-in" className="text-gold text-5xl"><BiHeart /></div>
                <div data-aos="zoom-in-up" className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-left relative overflow-hidden">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 font-heading font-bold text-gold/70 text-7xl select-none">21</div>
                    <div className="ml-24">
                        <h3 className="font-heading text-4xl text-brand-dark mb-4 text-center">Resepsi</h3>
                        <p className="flex items-center gap-3 mb-2"><BiCalendarHeart className="text-gold text-2xl"/> Minggu, 21 Des 2025</p>
                        <p className="flex items-center gap-3 mb-2"><BiTime className="text-gold text-2xl"/> 12:00 s.d Selesai</p>
                        <p className="flex items-start gap-3"><BiSolidMap className="text-gold text-2xl flex-shrink-0 mt-1"/> Balai Kota Bandung</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* ✅ PERUBAHAN: Menambahkan background bunga di Love Story Section */}
        <section className="py-20 px-5 relative bg-floral-pattern bg-cover bg-center">
            <div className="absolute inset-0 bg-white/80 z-0"></div>
            <div className="relative z-10">
                <SectionTitle>Our Love Story</SectionTitle>
                <div data-aos="fade-up" className="relative max-w-2xl mx-auto mt-16">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/30"></div>
                    {[
                      { year: 2019, title: "First Met", desc: "Awal dari sebuah cerita yang tak terduga, di mana dua pasang mata bertemu untuk pertama kalinya." },
                      { year: 2022, title: "Relationship", desc: "Sebuah komitmen terucap, mengukir janji untuk berjalan bersama dalam suka dan duka." },
                      { year: 2025, title: "Engagement", desc: "Cincin melingkar di jari manis, menjadi simbol cinta yang lebih serius dan abadi." },
                      { year: 2025, title: "Marriage", desc: "Di bawah langit yang menjadi saksi, kami mengikat janji suci untuk selamanya." },
                    ].map((item, index) => (
                        <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                <h3 className="font-heading text-3xl text-gold">{item.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{item.year}</p>
                                <p>{item.desc}</p>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-gold rounded-full border-4 border-white shadow-md"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>        

        <section className="py-20 px-5 text-center">
            <div className="max-w-3xl mx-auto">
                <BiSolidGift data-aos="zoom-in" className="text-gold text-7xl mx-auto mb-4" />
                <SectionTitle>Wedding Gift</SectionTitle>
                <p data-aos="fade-up" className="mt-4 text-lg max-w-2xl mx-auto">Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih, kami dengan senang hati menerimanya.</p>
                {/* ✅ PERUBAHAN: Mengganti warna tombol */}
                <div data-aos="fade-up" data-aos-delay="200" className="flex justify-center gap-4 mt-8">
                    <button onClick={() => setShowGiftInfo(showGiftInfo === 'bank' ? null : 'bank')} className="px-6 py-3 bg-black text-white rounded-full inline-flex items-center gap-2 hover:bg-opacity-80 transition-colors">
                        <BiSolidBank /> Kirim Amplop
                    </button>
                    <button onClick={() => setShowGiftInfo(showGiftInfo === 'address' ? null : 'address')} className="px-6 py-3 bg-brand-chocolate text-white rounded-full inline-flex items-center gap-2 hover:bg-opacity-80 transition-colors">
                        <BiSolidPackage /> Kirim Kado
                    </button>
                </div>
                {showGiftInfo === 'bank' && (
                    <div data-aos="fade-up" className="mt-8 p-6 bg-gray-100 rounded-lg max-w-sm mx-auto">
                        <h4 className="font-heading text-xl">Transfer Bank</h4>
                        <p>BCA: 1234567890 a/n Sasa Putri</p>
                        <button onClick={() => navigator.clipboard.writeText('1234567890')} className="mt-2 text-sm bg-gol text-white px-3 py-1 rounded-full">Salin No. Rek</button>
                    </div>
                )}
                {showGiftInfo === 'address' && (
                     <div data-aos="fade-up" className="mt-8 p-6 bg-gray-100 rounded-lg max-w-sm mx-auto">
                        <h4 className="font-heading text-xl">Alamat Pengiriman</h4>
                        <p>Jl. Bahagia Selamanya No. 21, Bandung, Jawa Barat, 40123 a/n Sasa & Mas Mas</p>
                    </div>
                )}
            </div>
        </section>

        {/* ✅ SECTION: LOKASI */}
        <section className="py-20 px-5 bg-white">
            <SectionTitle>Lokasi Acara</SectionTitle>
            <p data-aos="fade-up" className="text-center mt-4 text-lg">Kami menantikan kehadiran Anda di hari bahagia kami.</p>

            <div data-aos="zoom-in-up" className="max-w-3xl mx-auto mt-10 rounded-xl overflow-hidden shadow-xl border border-gold/20">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3949.2093002678507!2d113.67000307500926!3d-8.181658991849693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMTAnNTQuMCJTIDExM8KwNDAnMjEuMyJF!5e0!3m2!1sid!2sid!4v1761397135149!5m2!1sid!2sid"
                    width="100%"
                    height="350"
                    className="border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="flex justify-center mt-6">
                <a
                    href="https://maps.app.goo.gl/ndw7iU3xA4ZzezCn6"
                    target="_blank"
                    className="px-8 py-3 bg-gold text-white rounded-full shadow-lg hover:bg-opacity-80 transition-colors"
                >
                    Buka di Google Maps
                </a>
            </div>
        </section>

        {/* ✅ SECTION: RSVP */}
        <section className="py-20 px-5 bg-gray-50/50 text-center">
            <SectionTitle>Konfirmasi Kehadiran</SectionTitle>
            <form data-aos="fade-up" className="max-w-lg mx-auto mt-10 text-left grid gap-4">
                <input type="text" placeholder="Nama Lengkap"
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold outline-none"/>
                <select className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold outline-none">
                    <option>Jumlah Tamu</option>
                    <option>1 Orang</option>
                    <option>2 Orang</option>
                    <option>3 Orang</option>
                </select>
                <select className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold outline-none">
                    <option>Status Kehadiran</option>
                    <option>Hadir</option>
                    <option>Belum Pasti</option>
                    <option>Tidak Hadir</option>
                </select>

                <button type="submit"
                    className="mt-2 w-full px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-opacity-80 transition-colors">
                    Kirim RSVP
                </button>
            </form>
        </section>      

        <footer className="py-20 px-5 bg-brand-dark text-center text-white/80 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}>
            <div className="relative z-10">
                <p className="max-w-2xl mx-auto text-xl">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir untuk memberikan doa restu.</p>
                <h3 className="font-heading text-gold text-5xl mt-8">Sasa & Mas Mas</h3>
            </div>
        </footer>
      </div>
    </main>
  );
}