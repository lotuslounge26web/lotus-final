import { useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/* -------------------------------------------------
   Testimonials Data & Auto Slider Component
   ------------------------------------------------- */
const testimonials = [
  {
    country: "Japan",
    text:
      "As a mature guest, I loved the quiet elegance and the gentle, respectful service. Everything felt composed and unhurried. I left calm, safe, and restored.",
  },
  {
    country: "India",
    text:
      "More than a massage — it felt deeply nurturing. Warm therapists, intuitive touch, and a soothing flow from start to finish. I walked out lighter.",
  },
  {
    country: "Russia",
    text:
      "Powerful technique, clean professionalism, and visible results. Privacy was respected and the session felt expertly handled. Truly effective.",
  },
  {
    country: "Australia",
    text:
      "Easy, smooth, and genuinely relaxing. Great organization, no fuss, and an excellent massage. Perfect reset after sightseeing.",
  },
  {
    country: "France",
    text:
      "Refined in every detail — scent, space, and touch. Calm, sensorial, and beautifully designed. A moment of true serenity.",
  },
  {
    country: "UAE",
    text:
      "Ideal between meetings: discreet, efficient, and perfectly timed. Premium comfort, excellent technique, zero wasted moments.",
  },
];

function TestimonialsAutoSlider() {
  const groupSize = 2;
  const groups = useMemo(() => {
    const result = [];
    for (let i = 0; i < testimonials.length; i += groupSize) {
      result.push(testimonials.slice(i, i + groupSize));
    }
    return result;
  }, []);

  const [groupIndex, setGroupIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const holdMs = 7000;
    const fadeMs = 1400;
    const gapMs = 150;
    const fadeInMs = 1400;

    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;
    let timeout3: ReturnType<typeof setTimeout>;

    const run = () => {
      timeout1 = setTimeout(() => {
        setIsTransitioning(true);
        timeout2 = setTimeout(() => {
          setGroupIndex((prev) => (prev + 1) % groups.length);
          timeout3 = setTimeout(() => {
            setIsTransitioning(false);
          }, gapMs);
        }, fadeMs);
      }, holdMs);
    };

    run();
    const interval = setInterval(run, holdMs + fadeMs + gapMs + fadeInMs);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [groups.length]);

  const currentGroup = groups[groupIndex];

  return (
    <div>
      {/* 2 items display + fade */}
      <div
        key={groupIndex}
        className={[
          "transition-all ease-in-out",
          "duration-[1200ms]",
          isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {currentGroup.map((t, idx) => {
            const plainTextLength = t.text.replace(/\s+/g, " ").trim().length;

            const textSizeClass =
              plainTextLength >= 280
                ? "text-[13px] sm:text-base"
                : plainTextLength >= 220
                ? "text-sm sm:text-lg"
                : "text-base sm:text-lg";

            const guestLabel =
              t.country === "UAE"
                ? "A Guest from the UAE"
                : `A Guest from ${t.country}`;

            return (
              <div key={idx} className="text-left">
                <p
                  className={[
                    "text-[#4A4A4A] leading-relaxed italic whitespace-pre-line mb-6",
                    textSizeClass,
                  ].join(" ")}
                >
                  “{t.text}”
                </p>
                <div className="text-[#3E2723]/70 text-xs tracking-wide">{guestLabel}</div>
                <div className="w-16 h-px bg-[#D4AF37]/40 mt-6"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center gap-2 mt-12">
        {groups.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonials ${i + 1}`}
            onClick={() => setGroupIndex(i)}
            className={[
              "h-2 w-2 rounded-full transition-all",
              i === groupIndex ? "bg-[#D4AF37]" : "bg-[#D4AF37]/30",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------
   Home Page Component
   ------------------------------------------------- */
export default function HomePage() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState<null | 'cancellation' | 'etiquette'>(null);

  /* Scroll handling for deep‑linking */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get('scrollTo');

    if (scrollTarget === 'locations') {
      setTimeout(() => {
        const el = document.getElementById('locations');
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 250);
    }
  }, [location]);

  /* Layout effect for same purpose – keep both for smooth experience */
  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get('scrollTo');

    if (scrollTarget === 'locations') {
      const el = document.getElementById('locations');
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  }, [location]);

  /* Navbar colour change on scroll */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 240);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!scrolled && mobileOpen) {
      setMobileOpen(false);
    }
  }, [scrolled, mobileOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      setMobileOpen(false);
    }, 150);
  };

  const galleryImages = [
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/fe17438489001c72152df17b9aaa634a.jpeg", alt: "Treatment Room" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/1ec4ce36a6bd4e2f6faecf7e597c2eed.jpeg", alt: "Relaxation Lounge" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/d5013d4b2a9a7616190966ffbca6c57b.jpeg", alt: "Ocean View" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/68c0ebe3bdba45131d66a03661fe86de.jpeg", alt: "Spa Details" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/50cf83d2ce2c0219f3324ecc9979f12a.jpeg", alt: "Evening Atmosphere" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/cc40976487a3fb22da3e1cee25eca427.jpeg", alt: "Placeholder 6" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/948ca65651492c7d99e1bb62740fdd01.jpeg", alt: "Placeholder 7" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/c149196d6e12fd64848762caaa3b40a2.jpeg", alt: "Placeholder 8" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/ada1250dcb8ff2bc4959da92e52baee7.jpeg", alt: "Placeholder 9" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/111821ef57b703044e545b88ca7127b3.jpeg", alt: "Placeholder 10" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/7940094db549fadf7b22b947a8592c28.jpeg", alt: "Placeholder 11" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/249a33aa06d0b0f6197ef033c48e34f2.jpeg", alt: "Placeholder 12" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/9789abc3a2879a62970bfd653a23fac3.jpeg", alt: "Placeholder 13" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/737847ff99237e6100e034b013a7681d.jpeg", alt: "Placeholder 14" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/c3067db3eda0d5048b38c82cfe05000f.jpeg", alt: "Placeholder 15" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/0887fde53188848feee5a43d9a96d761.jpeg", alt: "Spa Detail 16" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/cd9a5643635194a25bcc2174c72b9cca.jpeg", alt: "Spa Detail 17" },
    { url: "https://static.readdy.ai/image/950ece443f523582842352d95e566920/e464c2d0d931d1ce28379b1eeca78ec1.jpeg", alt: "Spa Detail 18" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-b from-[#3E2723]/95 to-[#3E2723]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent backdrop-blur-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/302fb6d132b3fb98ed6e256e13ecd84e.png"
              alt="Lotus Lounge & Spa"
              className={`
                h-9 sm:h-10 w-auto transform
                sm:scale-[1.2]
                origin-left
                transition-all duration-500 ease-out
                ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
              `}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {["TOP", "PHILOSOPHY", "GALLERY", "LOCATIONS"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#F5F1E8] text-sm tracking-widest font-light hover:text-[#D4AF37] transition-colors duration-300 relative group whitespace-nowrap cursor-pointer"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`
              md:hidden text-[#F5F1E8] hover:text-[#D4AF37]
              transition-all duration-500 ease-out
              ${scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
            `}
          >
            <i className={mobileOpen ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"} />
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 sm:px-8 pb-4 pt-2 bg-[#3E2723]/95 backdrop-blur-md border-t border-white/10">
            <div className="flex flex-col gap-3">
              {["Top", "Philosophy", "Gallery", "Locations"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-[#F5F1E8] text-sm tracking-widest font-light hover:text-[#D4AF37] transition-colors duration-300 py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="top"
        className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="
            absolute inset-0
            w-full h-full
            object-cover
            object-center
          "
        >
          <source src="https://lglkinxkmddtucmebszr.supabase.co/storage/v1/object/public/Hero-videos/SPA%20HERO%20VIDEO%20FINAL.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20" />

        <div className="relative z-10 text-center px-6 flex flex-col items-center justify-center h-full pt-[80px]">
          <div className="flex flex-col items-center mb-6 sm:mb-8 -translate-y-[72px] sm:-translate-y-[20px]">
            <img
              src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/8400fe8e1f29c1b11a99952188d6a36a.png"
              alt="Lotus Lounge & Spa"
              className="h-[58px] sm:h-[84px] lg:h-[92px] w-auto mb-2 opacity-95"
            />
            <div
              className="font-serif font-medium tracking-[0.25em] mb-[2px] text-[12px] sm:text-[16px]"
              style={{ color: "#c7a04b", textShadow: "0 1px 16px rgba(0,0,0,0.38)" }}
            >
              LOTUS LOUNGE & SPA
            </div>
            <div
              className="font-serif font-normal tracking-[0.28em] text-[10px] sm:text-[13px]"
              style={{ color: "#c7a04b", textShadow: "0 1px 16px rgba(0,0,0,0.34)" }}
            >
              Beauty Thru Asia
            </div>
          </div>

          <h1 className="mb-4 text-center">
            <div className="text-[#F5F1E8] font-serif font-light text-3xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 tracking-wide leading-tight">
              Ocean Sanctuary
            </div>
            <div
              className="text-[#F5F1E8]/90 font-serif font-light text-xl sm:text-2xl lg:text-3xl tracking-wide"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
            >
              Spa
              <br className="block sm:hidden" />
              <span className="hidden sm:inline"> </span>
              by the Indian Ocean.
            </div>
          </h1>

          <button
            onClick={() => scrollToSection("locations")}
            className="
              mt-6 sm:mt-10
              bg-[#C4A57B]/25
              text-white
              px-5 sm:px-10 py-2 sm:py-3
              rounded-full
              text-xs sm:text-base
              font-medium tracking-wide
              hover:bg-[#C4A57B]/60
              transition-all duration-300
              inline-flex items-center gap-3
              shadow-sm
              whitespace-nowrap
              cursor-pointer
            "
          >
            Our Locations
          </button>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-16 sm:py-24 lg:py-32 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-2/5">
              <div className="mb-6 sm:mb-8 text-center sm:text-left">
                <span className="text-[#3E2723] text-xs tracking-widest font-light">
                  OUR PHILOSOPHY
                </span>
              </div>
              <h2 className="text-[#3E2723] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-center">
                A Sanctuary
                <br />
                In Every Detail
              </h2>
              <div className="text-[#4A4A4A] text-sm sm:text-base leading-relaxed space-y-4 lg:pr-8 text-center sm:text-left">
                <p>
                  Every guest experience is guided by a quiet commitment to excellence. Our
                  therapists combine refined technical skill with attentive hospitality, delivering
                  treatments with calm professionalism and a reassuring presence.
                </p>
                <p>
                  Through continuous training and close teamwork, we constantly improve our
                  service, aiming to exceed expectations and nurture lasting satisfaction for each
                  visitor.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-3/5 relative mt-8 lg:mt-0">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:h-[520px]">
                <div
                  className="
                    relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl
                    lg:absolute lg:top-0 lg:left-0 lg:w-80
                  "
                >
                  <img
                    src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/f6ed9d4cb0ef07a42ffbf749875922c0.jpeg"
                    alt="Relaxation Lounge"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div
                  className="
                    relative mt-6 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl
                    lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-80
                  "
                >
                  <img
                    src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/b9af32b7fce1116a50c290a7c28aedbe.png"
                    alt="Ocean View"
                    className="w-full h-full object-cover object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[#3E2723] font-light text-3xl sm:text-4xl lg:text-5xl mb-4">
              Gallery
            </h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto" />
          </div>

          {/* Slider */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <div className="w-full h-80 sm:h-[460px] lg:h-[600px]">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 border border-[#3E2723] rounded-full flex items-center justify-center bg-white/90 hover:bg-[#D4AF37] transition-colors duration-300"
            >
              <i className="ri-arrow-left-line text-xl text-[#3E2723]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 border border-[#3E2723] rounded-full flex items-center justify-center bg-white/90 hover:bg-[#D4AF37] transition-colors duration-300"
            >
              <i className="ri-arrow-right-line text-xl text-[#3E2723]" />
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-3 mt-8 sm:mt-12">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-8 bg-[#D4AF37]" : "w-2 bg-[#D4AF37]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 lg:py-36 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <div className="text-[#D4AF37] text-sm tracking-widest mb-4">TESTIMONIALS</div>
            <h2 className="text-[#3E2723] font-bold text-3xl sm:text-4xl lg:text-5xl">
              Words from Our Guests
            </h2>
            <div className="w-16 h-px bg-[#D4AF37]/40 mx-auto mt-6" />
          </div>
          <TestimonialsAutoSlider />
        </div>
      </section>

      {/* Locations Section */}
      <section
        id="locations"
        className="py-16 sm:py-24 lg:py-32 bg-gradient-to-r from-[#F5F1E8] to-[#F0E5D8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[#3E2723] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
              Locations
            </h2>
            <p className="text-[#8B7355] font-light italic text-lg sm:text-xl">
              Two Sanctuaries, One Philosophy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Colombo Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="w-full h-56 sm:h-72">
                <img
                  src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/20cde88511eb287b62aa76920db8cbac.jpeg"
                  alt="Granbell Hotel Colombo"
                  className="w-full h-full object-cover object-[80%_center]"
                />
              </div>
              <div className="p-6 sm:p-10">
                <div className="text-[#D4AF37] text-xs tracking-widest mb-3">SKY SANCTUARY</div>
                <h3 className="text-[#3E2723] font-bold text-xl sm:text-2xl tracking-wide mb-2">
                  LOTUS LOUNGE & SPA
                </h3>
                <a
                  href="https://maps.app.goo.gl/MSv7Q5sQpAAt53yn8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#3E2723] text-base sm:text-lg mb-1 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  <i className="ri-map-pin-line text-[16px] opacity-70"></i>
                  <span>Granbell Hotel, Level 10</span>
                </a>
                <p className="text-[#4A4A4A] font-light text-sm mb-4 sm:mb-6">Colombo, Sri Lanka</p>
                <a
                  href="/menu-colombo"
                  className="inline-block bg-[#C4A57B] text-[#F5F1E8] px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  View Menu
                </a>
              </div>
            </div>

            {/* Galle Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="w-full h-56 sm:h-72">
                <img
                  src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/756dbd30e1ad3c0a954eadd9a827b5c4.png"
                  alt="Le Grand Hotel Galle"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 sm:p-10">
                <div className="text-[#D4AF37] text-xs tracking-widest mb-3">COASTAL SANCTUARY</div>
                <h3 className="text-[#3E2723] font-bold text-xl sm:text-2xl tracking-wide mb-2">
                  LOTUS LOUNGE & SPA
                </h3>
                <a
                  href="https://maps.app.goo.gl/2QBfEoa36Tsys5Nc9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#3E2723] text-base sm:text-lg mb-1 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  <i className="ri-map-pin-line text-[16px] opacity-70"></i>
                  <span>Le Grand Hotel, Level 2</span>
                </a>
                <p className="text-[#4A4A4A] font-light text-sm mb-4 sm:mb-6">Galle, Sri Lanka</p>
                <a
                  href="/menu-galle"
                  className="inline-block bg-[#C4A57B] text-[#F5F1E8] px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  View Menu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#3E2723] to-[#2C1810]">
        <div className="px-8 sm:px-16 lg:px-24 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
              {/* Brand Info */}
              <div className="lg:w-1/3">
                <img
                  src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/302fb6d132b3fb98ed6e256e13ecd84e.png"
                  alt="Lotus Lounge & Spa"
                  className="h-10 sm:h-12 w-auto mb-3 opacity-90"
                />
                <h3 className="text-[#D4AF37] font-serif text-2xl sm:text-3xl tracking-wider leading-tight">
                  LOTUS LOUNGE & SPA
                </h3>
                <p className="text-[#D4AF37] font-serif text-xs sm:text-sm tracking-[0.12em] mt-1">
                  Beauty Thru Asia
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <a
                    href="https://instagram.com/lotusloungeandspa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-[#F5F1E8]/65 hover:text-[#F5F1E8] transition-colors duration-300"
                  >
                    <i className="ri-instagram-line text-[18px]" />
                  </a>
                  <a
                    href="https://facebook.com/lotusloungeandspa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-[#F5F1E8]/65 hover:text-[#F5F1E8] transition-colors duration-300"
                  >
                    <i className="ri-facebook-circle-line text-[18px]" />
                  </a>
                </div>
              </div>

              {/* Locations */}
              <div className="lg:w-1/3">
                <h4 className="text-[#D4AF37] text-xs tracking-widest mb-6">LOCATIONS</h4>
                <div className="space-y-6">
                  <div>
                    <a
                      href="https://maps.app.goo.gl/MSv7Q5sQpAAt53yn8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#F5F1E8] text-sm font-medium mb-1 hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      <i className="ri-map-pin-line text-[15px]" />
                      <span>Colombo – Granbell Hotel, Level 10</span>
                    </a>
                    <p className="text-[#F5F1E8]/80 text-sm">Hours: 09:00 – 21:00</p>
                    <p className="text-xs text-[#F5F1E8]/60">(Last entry 20:00)</p>
                  </div>

                  <div>
                    <a
                      href="https://maps.app.goo.gl/2QBfEoa36Tsys5Nc9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#F5F1E8] text-sm font-medium mb-1 hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      <i className="ri-map-pin-line text-[15px]" />
                      <span>Galle – Le Grand Hotel, Level 2</span>
                    </a>
                    <p className="text-[#F5F1E8]/80 text-sm">Hours: 09:00 – 21:00</p>
                    <p className="text-xs text-[#F5F1E8]/60">(Last entry 20:00)</p>
                  </div>
                </div>
              </div>

              {/* Navigation & Policies */}
              <div className="lg:w-1/3">
                <h4 className="text-[#D4AF37] text-xs tracking-widest mb-6">NAVIGATION</h4>
                <div className="space-y-3 mb-8">
                  {["Top", "Philosophy", "Gallery", "Locations"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block text-[#F5F1E8] text-sm hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <h4 className="text-[#D4AF37] text-xs tracking-widest mb-4">POLICIES</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setPolicyOpen("cancellation")}
                    className="block text-[#F5F1E8] text-sm hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Cancellation Policy
                  </button>
                  <button
                    onClick={() => setPolicyOpen("etiquette")}
                    className="block text-[#F5F1E8] text-sm hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Spa Etiquette
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/20">
          <div className="px-8 sm:px-16 lg:px-24 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <p className="text-[#F5F1E8]/60 text-xs text-center">
                  © 2026 Lotus Lounge & SPA. All rights reserved.
                </p>
                <p className="text-[#8B7355]/70 text-[11px] tracking-[0.2em] uppercase">
                  By Lotus Lounge & SPA
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {policyOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4 sm:px-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setPolicyOpen(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-auto rounded-2xl bg-[#F5F1E8] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#F5F1E8] border-b border-black/10 px-6 sm:px-8 py-4 flex items-center justify-between">
              <h3 className="text-[#3E2723] font-serif text-lg sm:text-xl tracking-wide">
                {policyOpen === "cancellation"
                  ? "Cancellation Policy"
                  : "Spa Etiquette"}
              </h3>
              <button
                onClick={() => setPolicyOpen(null)}
                className="text-[#3E2723]/70 hover:text-[#3E2723] transition-colors"
                aria-label="Close"
                type="button"
              >
                <i className="ri-close-line text-2xl" />
              </button>
            </div>
            <div className="px-6 sm:px-8 py-6 text-[#4A4A4A] text-sm leading-relaxed space-y-6">
              {policyOpen === "cancellation" ? (
                <>
                  <p>
                    We understand that plans may change. To ensure we can accommodate
                    all our guests, we kindly request advance notice for cancellations.
                  </p>
                  <p>
                    <strong className="text-[#3E2723]">
                      Cancellation Notice:
                    </strong>{" "}
                    Please provide at least 24 hours notice if you need to cancel or
                    reschedule your appointment.
                  </p>
                  <p>
                    <strong className="text-[#3E2723]">Late Cancellations:</strong>{" "}
                    Cancellations made with less than 24 hours notice or no‑shows may
                    incur a 50% charge of the scheduled treatment price.
                  </p>
                  <p>
                    We appreciate your understanding and cooperation in helping us
                    serve all our guests effectively.
                  </p>
                  <p>
                    For cancellations or rescheduling, please contact us directly at the
                    spa or through the hotel reception.
                  </p>
                <div>
                    <p className="font-semibold text-[#3E2723] mb-2">
                      Pricing &amp; Service Updates
                    </p>
                    <p>
                      Treatment prices and services are subject to change without
                      prior notice. Please confirm current pricing directly with
                      our team at the time of booking.
                    </p>
                  </div>
                
                </>
              ) : (
                <>
                  <p>
                    To ensure a peaceful and restorative experience for all guests,
                    we kindly ask you to observe the following spa etiquette
                    guidelines.
                  </p>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">
                      Arrival Time
                    </p>
                    <p>
                      Please arrive at least 15 minutes before your scheduled
                      appointment. This allows time to complete any necessary forms
                      and begin your treatment on time.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">
                      Mobile Phones
                    </p>
                    <p>
                      To maintain a tranquil atmosphere, please ensure your mobile
                      phone is silenced or switched off during your visit.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">
                      Health Conditions
                    </p>
                    <p>
                      Please inform our therapists of any health conditions,
                      allergies, injuries, or areas of sensitivity before the
                      treatment begins. This helps us provide the safest and most
                      effective care.
                    </p>
                  </div>
<div>
                    <p className="font-semibold text-[#3E2723] mb-2">
                      Right to Modify Treatment
                    </p>
                    <p>
                      For your safety, our therapists reserve the right to adjust
                      or discontinue a treatment if a health condition is
                      identified during the session. In such cases, the full
                      treatment fee may still apply.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">
                      Valuables
                    </p>
                    <p>
                      We recommend leaving valuables in your hotel room. The spa
                      is not responsible for lost or stolen items.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">
                      Gratuities
                    </p>
                    <p>
                      Gratuities are appreciated but not mandatory. If you wish to
                      show appreciation for exceptional service, you may do so at
                      your discretion.
                    </p>
                  </div>
<div>
                    <p className="font-semibold text-[#3E2723] mb-2">
                      Disclaimer
                    </p>
                    <p>
                      Lotus Lounge &amp; Spa makes every effort to ensure a safe
                      and effective experience. However, individual results from
                      treatments may vary. We are not liable for reactions arising
                      from undisclosed health conditions, allergies, or
                      sensitivities. By proceeding with a treatment, guests
                      acknowledge they have informed our therapists of any
                      relevant health information.
                    </p>
                    <p className="mt-3">
                      All content on this website — including text, images, and
                      branding — is the property of Lotus Lounge &amp; Spa and
                      may not be reproduced without written permission. Any
                      disputes arising from the use of this website or our
                      services shall be governed by the laws of Sri Lanka.
                    </p>
                  </div>
                  <p>
                    Thank you for helping us maintain a serene and respectful
                    environment for all our guests.
                  </p>
                </>
              )}
            </div>
            <div className="px-6 sm:px-8 py-4 border-t border-black/10 flex justify-end bg-[#F5F1E8]">
              <button
                onClick={() => setPolicyOpen(null)}
                className="bg-[#3E2723] text-[#F5F1E8] px-5 py-2 rounded-full text-xs tracking-widest hover:opacity-90 transition"
                type="button"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
