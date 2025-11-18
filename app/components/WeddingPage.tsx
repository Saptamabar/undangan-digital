"use client";

import { useState, useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { 
  BiPlayCircle, BiPauseCircle, BiEnvelopeOpen, BiCalendarHeart, BiHeart,BiCheckSquare, BiUser,
  BiTime, BiSolidGift, BiSolidBank, BiSolidPackage,BiLinkExternal, BiCopy, BiSolidQuoteLeft, BiChat
} from "react-icons/bi";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 data-aos="fade-up" className="font-heading text-5xl md:text-6xl text-center text-brand-dark">
    {children}
  </h2>
);
import { addGuestbookEntry, type GuestbookEntry } from '@/app/actions';

type WeddingPageProps = {
  guestName: string;
  slug: string;
  initialEntries: GuestbookEntry[]; 
};

function RsvpSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit"
      disabled={pending}
      className="mt-2 w-full px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-opacity-80 transition-colors inline-flex items-center justify-center gap-2 disabled:bg-gray-400"
    >
      {pending ? 'Mengirim...' : 'Kirim Konfirmasi & Ucapan'}
    </button>
  );
}

export default function WeddingPage({ guestName, slug, initialEntries }: WeddingPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGiftInfo, setShowGiftInfo] = useState<'bank' | 'address' | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });    

  const audioRef = useRef<HTMLAudioElement>(null);
  
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const rsvpFormInitialState = { success: false, message: '' };
  const [rsvpState, rsvpFormAction] = useActionState(addGuestbookEntry, rsvpFormInitialState);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    if (rsvpState.success) {
      
      formRef.current?.reset();
      
      alert(rsvpState.message); 
      
      router.refresh(); 
    } else if (rsvpState.message) {
      
      alert(rsvpState.message);
    }
  }, [rsvpState, router]);

  useEffect(() => {
    const weddingDate = new Date("Dec 05, 2025 09:00:00").getTime();
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

      <div className={`fixed top-0 left-0 w-full h-full hero-bg flex justify-center items-center z-50 transition-opacity duration-1000 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ` }>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white p-5 animate-fade-in">
          <h4 className="text-lg tracking-widest">The Wedding of</h4>
          <h1 className="font-heading text-6xl my-4">M & R</h1>
          <p className="mt-8">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="font-bold text-lg">{guestName}</p>
          <button onClick={handleOpenInvitation} className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-gold text-white rounded-full hover:bg-opacity-80 transition-colors shadow-lg">
            <BiEnvelopeOpen /> Buka Undangan
          </button>
        </div>
      </div>

      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <header className="relative hero-bg h-screen flex items-center justify-center text-white text-center bg-fixed">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 p-5 max-w-3xl mx-auto">
              <h4 data-aos="fade-down" className="tracking-widest">
                  THE WEDDING OF
              </h4>
              <h1 data-aos="zoom-in" data-aos-delay="200" className="font-heading text-7xl md:text-8xl my-4">
                  Marisa <br />& <br /> Rivaldi
              </h1>
              <p data-aos="fade-up" data-aos-delay="400" className="text-xl">
                  Jumat, 05 Desember 2025
              </p>              
          </div>
      </header>

      {/* ✅ SECTION GABUNGAN: Ayat Suci & Perkenalan Mempelai */}
      <section
        className="py-24 px-5 relative overflow-hidden"
        // Latar belakang konsisten dengan section lainnya
        style={{
          backgroundColor: '#FAF8F5',
          backgroundImage: `radial-gradient(#D4AF37 0.5px, transparent 0.5px)`,
          backgroundSize: `15px 15px`,
          backgroundPosition: `0 0, 5px 5px`,
        }}
      >
        {/* 🌸 Dekorasi Bunga Kiri */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-24 z-0 opacity-50">
          <svg width="300" height="400" viewBox="0 0 250 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 md:w-64 text-gold/30">
              <path d="M125 0C158.5 58.1 158.5 116.2 125 350 -33.5 221.9 8.5 70 125 0z" fill="currentColor" transform="rotate(-30 125 175)"/>
              <path d="M125 70C145.5 116.2 145.5 162.4 125 280 -3.5 186.2 41.5 116.2 125 70z" fill="currentColor" transform="rotate(-40 125 175)"/>
          </svg>
        </div>
        {/* 🌸 Dekorasi Bunga Kanan */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-24 z-0 opacity-50">
          <svg width="300" height="400" viewBox="0 0 250 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 md:w-64 text-gold/30" style={{ transform: 'scaleX(-1)' }}>
              <path d="M125 0C158.5 58.1 158.5 116.2 125 350 -33.5 221.9 8.5 70 125 0z" fill="currentColor" transform="rotate(-30 125 175)"/>
              <path d="M125 70C145.5 116.2 145.5 162.4 125 280 -3.5 186.2 41.5 116.2 125 70z" fill="currentColor" transform="rotate(-40 125 175)"/>
          </svg>
        </div>

        <div className="relative z-10">
          {/* --- Bingkai Ayat Suci --- */}
          <div data-aos="zoom-in-up" className="max-w-3xl mx-auto p-8 md:p-10 mb-20 bg-white/60 backdrop-blur-md rounded-lg shadow-lg border border-gold/20 text-center italic">
            <p className="text-xl md:text-2xl leading-relaxed text-brand-dark">
              "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang..."
            </p>
            <h4 className="font-heading text-2xl mt-6 text-brand-dark not-italic">- QS. Ar-Rum: 21 -</h4>
          </div>

          {/* --- Perkenalan Mempelai --- */}
          <div className="text-center">
            <h1 data-aos="fade-up" className="font-heading text-4xl md:text-5xl text-center text-brand-dark">
              Assalamualaikum Wr. Wb.
            </h1>
            <p data-aos="fade-up" className="text-center max-w-2xl mx-auto mt-4 mb-16 text-brand-dark">
              Dengan Memohon Rahmat dan Ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
              {/* --- Mempelai Wanita --- */}
              <div data-aos="fade-right" className="text-center">
                <h3 className="font-heading text-4xl text-brand-dark">Marisa Prima Putri</h3>
                <p className="mt-2 text-lg max-w-xs mx-auto text-brand-gray">
                  Putri Pertama dari Alm. Bapak Priyo Prayogi dan Ibu Fatmawati
                </p>
              </div>

              {/* --- Ampersand --- */}
              <div data-aos="zoom-in" data-aos-delay="300" className="font-heading text-7xl text-gold text-gold-glow">
                &
              </div>

              {/* --- Mempelai Pria --- */}
              <div data-aos="fade-left" className="text-center">
                <h3 className="font-heading text-4xl text-brand-dark">M. Trisda Rivaldi</h3>
                <p className="mt-2 text-lg max-w-xs mx-auto text-brand-gray">
                  Putra Pertama dari Bapak Trisno Budi dan Alm. Ibu Ida Irma Suryani
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* ✅ SECTION BARU: Countdown Timer */}
        <section className="relative py-20 px-5 hero-bg text-white text-center bg-fixed">
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10">
              <h2 data-aos="fade-up" className="font-heading text-5xl md:text-6xl tracking-tight">
                  Menghitung Hari
              </h2>

              <div data-aos="fade-up" data-aos-delay="200" className="flex justify-center gap-4 md:gap-8 mt-12">
                  {Object.entries(countdown).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                          <span className="block font-heading text-6xl md:text-7xl">
                              {String(value).padStart(2, '0')}
                          </span>
                          <span className="capitalize text-sm tracking-widest">{unit}</span>
                      </div>
                  ))}
              </div>

              <button 
                  data-aos="fade-up" 
                  data-aos-delay="400" 
                  className="mt-12 px-8 py-3 bg-gold text-white rounded-full hover:bg-opacity-80 transition-colors shadow-lg"
              >
                  Simpan Tanggal
              </button>
          </div>
        </section>

        <section className="py-24 px-5 bg-cover bg-center" style={{ backgroundImage: "url('/bg-senja.jpg')" }}>
            <div data-aos="zoom-in-up" className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl 
              rounded-tl-[150px] rounded-tr-[150px] rounded-b-2xl overflow-hidden text-center p-8 md:p-12">
              
              {/* --- Bagian Akad Nikah --- */}
              <div className="mb-10">
                <h3 className="font-heading text-4xl text-brand-dark">Akad Nikah</h3>
                
                {/* ✅ PERUBAHAN DI SINI: Format tanggal diubah menjadi satu baris */}
                <p className="my-6 flex items-center justify-center gap-3">                   
                    <span className="font-semibold text-lg text-brand-dark">Jumat, 05 Desember 2025</span>
                </p>
                
                <p className="flex items-center justify-center gap-3 mb-4"><BiTime className="text-gold text-xl"/> 08:00 WIB - Selesai</p>
                <p className="font-semibold">Kediaman Mempelai Wanita</p>
                <p className="text-sm px-4">
                    Jl. Gajah Mada XXIV No. 240 Kaliwates Jember Jawa Timur
                </p>
                <a 
                    href="https://maps.app.goo.gl/ndw7iU3xA4ZzezCn6"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-gold text-white text-sm rounded-full hover:bg-opacity-80 transition-colors shadow"
                >
                    <BiLinkExternal />
                    Lihat Lokasi
                </a>
              </div>

              {/* --- Bagian Resepsi --- */}
              <div>
                <h3 className="font-heading text-4xl text-brand-dark">Resepsi</h3>

                {/* ✅ PERUBAHAN DI SINI: Format tanggal diubah menjadi satu baris */}
                <p className="my-6 flex items-center justify-center gap-3">
                    <span className="font-semibold text-lg text-brand-dark">Jumat, 05 Desember 2025</span>
                </p>

                <p className="flex items-center justify-center gap-3 mb-4"><BiTime className="text-gold text-xl"/> 16:00 - 20:00 WIB</p>
                <p className="font-semibold">Kediaman Mempelai Wanita</p>
                <p className="text-sm px-4">
                    Jl. Gajah Mada XXIV No. 240 Kaliwates Jember Jawa Timur
                </p>
                <a 
                    href="https://maps.app.goo.gl/ndw7iU3xA4ZzezCn6"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-gold text-white text-sm rounded-full hover:bg-opacity-80 transition-colors shadow"
                >
                    <BiLinkExternal />
                    Lihat Lokasi
                </a>
              </div>
            </div>
        </section>
                    
        {/* ✅ SECTION: Wedding Gift */}
        <section
          className="py-24 px-5 text-center relative overflow-hidden"
          // Latar belakang konsisten dengan section lainnya
          style={{
            backgroundColor: '#FAF8F5',
            backgroundImage: `radial-gradient(#D4AF37 0.5px, transparent 0.5px)`,
            backgroundSize: `15px 15px`,
            backgroundPosition: `0 0, 5px 5px`,
          }}
        >

          <div className="max-w-3xl mx-auto relative z-10">
            <BiSolidGift data-aos="zoom-in" className="text-gold text-7xl mx-auto mb-4" />
            <SectionTitle>Wedding Gift</SectionTitle>
            <p data-aos="fade-up" className="mt-4 text-lg max-w-2xl mx-auto text-brand-dark">
              Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih, kami dengan senang hati menerimanya.
            </p>
            
            {/* ✅ Tombol dengan style aktif/inaktif */}
            <div data-aos="fade-up" data-aos-delay="200" className="flex justify-center gap-4 mt-8">
              <button 
                onClick={() => setShowGiftInfo(showGiftInfo === 'bank' ? null : 'bank')} 
                className={`px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all duration-300 shadow-lg ${
                  showGiftInfo === 'bank' ? 'bg-brand-dark text-white' : 'bg-white/80 text-brand-dark hover:bg-white'
                }`}
              >
                <BiSolidBank /> Kirim Amplop
              </button>
              <button 
                onClick={() => setShowGiftInfo(showGiftInfo === 'address' ? null : 'address')} 
                className={`px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all duration-300 shadow-lg ${
                  showGiftInfo === 'address' ? 'bg-brand-chocolate text-white' : 'bg-white/80 text-brand-chocolate hover:bg-white'
                }`}
              >
                <BiSolidPackage /> Kirim Kado
              </button>
            </div>

            {/* ✅ Kartu Informasi dengan Desain Baru */}
            <div className="mt-8 max-w-sm mx-auto">
              {showGiftInfo === 'bank' && (
                <div className="space-y-4" data-aos="fade-up">
                  {/* --- Rekening Bank Mandiri --- */}
                  <div className="text-left p-6 rounded-lg bg-white/70 backdrop-blur-md shadow-lg border border-gold/20">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" alt="Logo Bank Mandiri" className="h-5 mb-3" />
                    <p className="text-brand-dark font-semibold text-lg tracking-wider">1430028223343</p>
                    <p className="text-brand-gray text-sm">a.n Mohammad Trisda Rivaldi</p>
                    <button onClick={() => navigator.clipboard.writeText('1430028223343')} className="mt-3 text-sm text-gold hover:text-gold/80 inline-flex items-center gap-1 font-medium transition-colors">
                      <BiCopy /> Salin No. Rekening
                    </button>
                  </div>
                  {/* --- Rekening Bank BRI --- */}
                  <div className="text-left p-6 rounded-lg bg-white/70 backdrop-blur-md shadow-lg border border-gold/20">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png" alt="Logo Bank BRI" className="h-6 mb-3" />
                    <p className="text-brand-dark font-semibold text-lg tracking-wider">220301007739501</p>
                    <p className="text-brand-gray text-sm">a.n Marisa Prima Putri</p>
                    <button onClick={() => navigator.clipboard.writeText('220301007739501')} className="mt-3 text-sm text-gold hover:text-gold/80 inline-flex items-center gap-1 font-medium transition-colors">
                      <BiCopy /> Salin No. Rekening
                    </button>
                  </div>
                </div>
              )}

              {showGiftInfo === 'address' && (
                <div data-aos="fade-up" className="p-6 rounded-lg bg-white/70 backdrop-blur-md shadow-lg border border-gold/20">
                  <h4 className="font-heading text-2xl text-brand-chocolate">Alamat Pengiriman</h4>
                  <p className="mt-3 text-brand-dark">
                    Jl. Gajah Mada XXIV No. 240 Kaliwates Jember Jawa Timur
                  </p>
                  <p className="text-sm text-brand-gray mt-1">a/n Marisa & Rivaldi</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ✅ SECTION: LOKASI */}
        <section
          className="py-24 px-5 relative overflow-hidden"
          // ✅ PERUBAHAN: Latar belakang dengan warna hangat dan pola samar
          style={{
            backgroundColor: '#FAF8F5',
            backgroundImage: `radial-gradient(#D4AF37 0.5px, transparent 0.5px)`,
            backgroundSize: `15px 15px`,
            backgroundPosition: `0 0, 5px 5px`,
          }}
        >
          {/* 🌸 Dekorasi Bunga Kiri Atas - Lebih Detail */}
          <div className="absolute -top-12 -left-16 md:-top-10 md:-left-12 z-0">
            <svg
              width="300"
              height="300"
              viewBox="0 0 250 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-48 md:w-64 text-gold/30" // Menggunakan warna gold
            >
              <path
                d="M125 0C158.5 41.5 158.5 83 125 250-33.5 158.5 8.5 50 125 0z"
                fill="currentColor"
                transform="rotate(-45 125 125)"
              />
              <path
                d="M125 50C145.5 83 145.5 117 125 200-3.5 133 41.5 83 125 50z"
                fill="currentColor"
                transform="rotate(-55 125 125)"
              />
            </svg>
          </div>

          {/* 🌸 Dekorasi Bunga Kanan Bawah - Lebih Detail */}
          <div className="absolute -bottom-12 -right-16 md:-bottom-10 md:-right-12 z-0">
            <svg
              width="300"
              height="300"
              viewBox="0 0 250 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-48 md:w-64 text-gold/30" 
              style={{ transform: 'rotate(180deg)' }} 
            >
              <path
                d="M125 0C158.5 41.5 158.5 83 125 250-33.5 158.5 8.5 50 125 0z"
                fill="currentColor"
                transform="rotate(-45 125 125)"
              />
              <path
                d="M125 50C145.5 83 145.5 117 125 200-3.5 133 41.5 83 125 50z"
                fill="currentColor"
                transform="rotate(-55 125 125)"
              />
            </svg>
          </div>

          {/* 🌸 Konten utama */}
          <div className="relative z-10">
            <SectionTitle>Lokasi Acara</SectionTitle>
            <p
              data-aos="fade-up"
              className="text-center mt-4 text-lg text-brand-dark"
            >
              Kami menantikan kehadiran Anda di hari bahagia kami.
            </p>

            {/* ✅ PERUBAHAN: Menambahkan efek bingkai pada peta */}
            <div
              data-aos="zoom-in-up"
              className="max-w-3xl mx-auto mt-10 p-2 bg-white rounded-xl shadow-2xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3949.2093002678507!2d113.67000307500926!3d-8.181658991849693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMTAnNTQuMCJTIDExM8KwNDAnMjEuMyJF!5e0!3m2!1sid!2sid!4v1761397135149!5m2!1sid!2sid"
                width="100%"
                height="350"
                className="border-0 rounded-md" // sedikit rounded di dalam frame
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div data-aos="fade-up" className="flex justify-center mt-8">
              <a
                href="https://maps.app.goo.gl/ndw7iU3xA4ZzezCn6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gold text-white rounded-full shadow-lg hover:bg-opacity-80 transition-colors"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* ✅ SECTION GABUNGAN: Buku Tamu & RSVP */}
        <section
          className="py-24 px-5 relative overflow-hidden"
          // Latar belakang konsisten dengan section sebelumnya
          style={{
            backgroundColor: '#FAF8F5',
            backgroundImage: `radial-gradient(#D4AF37 0.5px, transparent 0.5px)`,
            backgroundSize: `15px 15px`,
            backgroundPosition: `0 0, 5px 5px`,
          }}
        >
          {/* 🌸 Dekorasi Bunga Kiri Atas */}
          <div className="absolute -top-12 -left-16 md:-top-10 md:-left-12 z-0">
            <svg width="300" height="300" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 md:w-64 text-gold/30">
              <path d="M125 0C158.5 41.5 158.5 83 125 250-33.5 158.5 8.5 50 125 0z" fill="currentColor" transform="rotate(-45 125 125)" />
              <path d="M125 50C145.5 83 145.5 117 125 200-3.5 133 41.5 83 125 50z" fill="currentColor" transform="rotate(-55 125 125)" />
            </svg>
          </div>
          {/* 🌸 Dekorasi Bunga Kanan Bawah */}
          <div className="absolute -bottom-12 -right-16 md:-bottom-10 md:-right-12 z-0">
            <svg width="300" height="300" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 md:w-64 text-gold/30" style={{ transform: 'rotate(180deg)' }}>
              <path d="M125 0C158.5 41.5 158.5 83 125 250-33.5 158.5 8.5 50 125 0z" fill="currentColor" transform="rotate(-45 125 125)" />
              <path d="M125 50C145.5 83 145.5 117 125 200-3.5 133 41.5 83 125 50z" fill="currentColor" transform="rotate(-55 125 125)" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <SectionTitle>Buku Tamu & RSVP</SectionTitle>
            <p data-aos="fade-up" className="mt-4 max-w-lg mx-auto text-brand-dark">
              Mohon konfirmasi kehadiran Anda dan berikan doa restu untuk kami di hari bahagia nanti.
            </p>

            {/* --- Form Gabungan dengan Ikon --- */}
            {/* ✅ 7. PERBARUI FORM RSVP */}
          <form 
            ref={formRef}
            action={rsvpFormAction}
            className="mt-10 max-w-lg mx-auto text-left grid gap-4"
          >
            {/* Input Nama */}
            <div className="relative">
              <BiUser className="absolute z-100 left-4 top-1/2 -translate-y-1/2 text-gold/80" />
              <input 
                type="text" 
                name="guestName" // TAMBAHKAN name
                placeholder="Nama Anda"
                className="w-full p-3 pl-12 rounded-lg border border-gold/30 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none placeholder:text-gray-500"
                required // Tambahkan validasi
              />
            </div>
            
            {/* Pilihan Kehadiran */}
            <div className="relative">
              <BiCheckSquare className="absolute z-100 left-4 top-1/2 -translate-y-1/2 text-gold" />
              <select 
                name="presence" // TAMBAHKAN name
                className="w-full p-3 pl-12 rounded-lg border border-gold/30 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                defaultValue=""
                required // Tambahkan validasi
              >
                <option value="" disabled>Status Kehadiran</option>
                <option value="Hadir">Hadir</option>
                <option value="Belum Pasti">Belum Pasti</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
              </select>
            </div>

            {/* Input Ucapan & Doa */}
            <div className="relative">
              <BiChat className="absolute z-100 left-4 top-4 text-gold/80" />
              <textarea 
                name="message" // TAMBAHKAN name
                placeholder="Tuliskan ucapan & doa Anda... (Opsional)"
                rows={4}
                className="w-full p-3 pl-12 rounded-lg border border-gold/30 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none placeholder:text-gray-500"
              ></textarea>
            </div>
            
            {/* Input Tersembunyi untuk Slug */}
            <input type="hidden" name="slug" value={slug} />

            {/* Tombol Submit Kustom */}
            <RsvpSubmitButton />
          </form>

          {/* --- Daftar Ucapan yang Tampil (Scrollable) --- */}
          <div className="mt-16 text-left" data-aos="fade-up" data-aos-delay="300">
            <h3 className="font-heading text-3xl text-brand-dark mb-6 text-center">
              Ucapan & Doa Restu
            </h3>
            
            <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
              
              {/* ✅ 8. UBAH MENJADI DAFTAR DINAMIS */}
              {initialEntries.length === 0 ? (
                <p className="text-center text-gray-500 italic">
                  Jadilah yang pertama mengirim ucapan!
                </p>
              ) : (
                initialEntries.map((entry) => (
                  <div key={entry.id} className="relative p-4 pl-12 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
                    <BiSolidQuoteLeft className="absolute top-4 left-4 text-gold/30 text-2xl" />
                    
                    <div className="flex justify-between items-center">
                      <p className="font-heading text-lg text-brand-dark">{entry.name}</p>
                      <span className="text-xs text-gray-500 bg-gold/10 px-2 py-0.5 rounded-full">
                        {entry.presence}
                      </span>
                    </div>

                    <p className="text-gray-600 mt-1">{entry.message || "..."}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

        <footer 
          // ✅ PERUBAHAN UTAMA ADA DI BARIS INI
          className="relative h-screen hero-2-bg bg-fixed flex items-center justify-center px-5 text-center text-white/90" 
        >
          <div className="absolute inset-0 bg-black/70 z-0"></div>
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            
            <h2 data-aos="fade-up" className="font-heading text-5xl">
              Terima Kasih
            </h2>

            <p data-aos="fade-up" data-aos-delay="200" className="mt-4 max-w-xl mx-auto text-white/80">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran serta doa restu yang Anda berikan.
            </p>

            {/* --- Inisial & Tanggal --- */}
            <div data-aos="fade-up" data-aos-delay="400" className="mt-12">
              <h3 className="font-heading text-4xl tracking-widest flex items-center gap-4">
                M <div data-aos="zoom-in" data-aos-delay="300" className="font-heading text-4xl text-gold">&</div> R
              </h3>
              <p className="mt-2 text-sm opacity-80">
                05 DESEMBER 2025
              </p>
            </div>
            
            {/* --- Credit Vendor --- */}
            {/* <div data-aos="fade-up" data-aos-delay="600" className="mt-16 text-xs text-white/60"> */}
              {/* <p>Made by</p> */}
              {/* Ganti href dan nama vendor sesuai kebutuhan */}
              {/* <a  */}
                {/* href="#" */}
                {/* target="_blank" */}
                {/* rel="noopener noreferrer" */}
                {/* className="font-semibold hover:text-white transition-colors duration-300" */}
              {/* > */}
                {/* SevenDigiSoulution */}
              {/* </a> */}
            {/* </div>  */}
          </div>
        </footer>
      </div>
    </main>
  );
}