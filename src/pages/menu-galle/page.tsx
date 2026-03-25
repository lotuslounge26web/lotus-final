import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuGallePage() {
  const navigate = useNavigate();

  // ページ表示時に必ずトップへ
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Treatments Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Poster / Card */}
          <div className="relative overflow-hidden rounded-[28px] border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
            {/* Back to Locations */}
            <div className="absolute left-3 sm:left-4 top-3 sm:top-6 z-40">
              <button
                type="button"
                aria-label="Back to Locations"
                onClick={() => navigate('/?scrollTo=locations')}
                className="text-white text-[22px] sm:text-[20px] font-light tracking-wide hover:opacity-70 transition-opacity duration-300"
              >
                ＜
              </button>
            </div>

            {/* Back to Top */}
            <div className="absolute right-3 sm:right-5 bottom-3 sm:bottom-5 z-40">
              <button
                type="button"
                aria-label="Back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-2xl sm:text-3xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
              >
                ∧
              </button>
            </div>

            {/* Ocean background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://static.readdy.ai/image/950ece443f523582842352d95e566920/6bb0d4d59c844555bf3533407b4f87d6.png')",
              }}
              aria-hidden="true"
            />
            {/* Soft blend */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10"
              aria-hidden="true"
            />
            {/* Logo set (smaller + tighter) */}
            <div className="absolute inset-x-0 top-6 sm:top-8 lg:top-10 z-30 flex flex-col items-center text-center px-4 pointer-events-none">
              <img
                src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/1e133a4171b04e00f2e2aa8fa3858ccc.png"
                alt="Lotus Lounge & Spa"
                className="h-7 sm:h-9 w-auto opacity-95 mb-2"
              />
              <div className="text-white/95 text-[10px] sm:text-[11px] tracking-[0.16em] ">
                Coastal Sanctuary
              </div>
            </div>

            <div className="absolute inset-x-0 top-0 z-10 h-[380px] sm:h-[400px] lg:h-[570px] overflow-hidden">
              {/* Mobile only (Galle = mirrored to match Colombo) */}
              <img
                src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/dd068d1e86a930cd551ab57083b43fa3.png"
                alt="Coastal Sanctuary signature treatment"
                className="absolute inset-0 h-full w-full object-cover sm:hidden"
                style={{
                  transform: "scale(1.02)",
                  objectPosition: "70% 55%",
                }}
              />
              {/* Desktop / Tablet */}
              <img
                src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/dd068d1e86a930cd551ab57083b43fa3.png"
                alt="Coastal Sanctuary signature treatment"
                className="absolute inset-0 hidden sm:block h-full w-full object-cover"
                style={{
                  transform: "scale(1.06)",
                  objectPosition: "50% 45%",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
            </div>

            {/* Content area (below header + model) */}
            <div className="relative z-10 px-5 sm:px-10 pb-10 sm:pb-12 pt-[360px] sm:pt-[420px] lg:pt-[535px]">
              {/* Frosted screen container */}
              <div className="mx-auto max-w-4xl bg-white/78 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-7 sm:pb-9">
                  {/* Header inside frosted screen */}
                  <div className="text-center mt-10 mb-16 sm:mt-12 sm:mb-20">
                    {/* 上ライン */}
                    <div className="flex items-center justify-center gap-3 mb-6 lg:mb-10">
                      <div className="w-12 lg:w-48 h-px bg-white"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      <div className="w-12 lg:w-48 h-px bg-white"></div>
                    </div>

                    {/* タイトル */}
                    <h2 className="text-white text-sm lg:text-[40px] font-bold tracking-[0.25em] uppercase">
                      TREATMENT MENU
                    </h2>

                    {/* 下ライン */}
                    <div className="flex items-center justify-center gap-3 mt-6 lg:mt-10">
                      <div className="w-12 lg:w-48 h-px bg-white"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      <div className="w-12 lg:w-48 h-px bg-white"></div>
                    </div>
                  </div>

                  {/* Menu List */}
                  <div
                    className={`
                      space-y-10

                      [&_.menu-card]:bg-white/80
                      [&_.menu-card]:rounded-2xl
                      [&_.menu-card]:p-7
                      [&_.menu-card]:sm:p-8
                      [&_.menu-card]:border
                      [&_.menu-card]:border-[#A1887F]/30
                      [&_.menu-card]:shadow-[0_8px_30px_rgba(0,0,0,0.04)]

                      [&_.menu-name-local]:text-[#3E2723]
                      [&_.menu-name-local]:font-bold
                      [&_.menu-name-local]:text-xl
                      [&_.menu-name-local]:sm:text-2xl
                      [&_.menu-name-local]:leading-[1.15]
                      [&_.menu-name-local]:tracking-[0.01em]
                      [&_.menu-name-local]:mb-6

                      [&_.menu-name-sinhala]:block
                      [&_.menu-name-sinhala]:mt-0.5
                      [&_.menu-name-sinhala]:text-[#3E2723]
                      [&_.menu-name-sinhala]:text-lg
                      [&_.menu-name-sinhala]:sm:text-xl
                      [&_.menu-name-sinhala]:font-medium
                      [&_.menu-name-sinhala]:leading-[1.1]

                      [&_.menu-name-en]:block
                      [&_.menu-name-en]:mt-1.5
                      [&_.menu-name-en]:text-[#6B4F3A]
                      [&_.menu-name-en]:text-sm
                      [&_.menu-name-en]:sm:text-base
                      [&_.menu-name-en]:font-medium
                      [&_.menu-name-en]:tracking-[0.08em]
                      [&_.menu-name-en]:leading-snug

                      [&_.menu-desc]:text-[#4A4A4A]
                      [&_.menu-desc]:text-sm
                      [&_.menu-desc]:leading-relaxed
                      [&_.menu-desc]:mb-0

                      [&_.menu-meta]:mt-6
                      [&_.menu-meta]:pt-4
                      [&_.menu-meta]:border-t
                      [&_.menu-meta]:border-[#D9C9AF]/40

                      [&_.menu-options]:space-y-3
                      [&_.menu-option]:flex
                      [&_.menu-option]:items-start
                      [&_.menu-option]:justify-between
                      [&_.menu-option]:gap-6
                      [&_.menu-option-divider]:pt-2
                      [&_.menu-option-divider]:border-t
                      [&_.menu-option-divider]:border-[#D9C9AF]/45

                      [&_.menu-time]:text-[#6B4F3A]
                      [&_.menu-time]:text-sm
                      sm:[&_.menu-time]:text-base
                      [&_.menu-time]:font-medium
                      [&_.menu-time]:leading-snug

                      [&_.menu-price-wrap]:text-right
                      [&_.menu-price-wrap]:shrink-0

                      [&_.menu-price]:text-[#3E2723]
                      [&_.menu-price]:text-base
                      sm:[&_.menu-price]:text-lg
                      [&_.menu-price]:font-semibold
                      [&_.menu-price]:tracking-[0.03em]
                      [&_.menu-price]:leading-snug

                      [&_.menu-price-sub]:block
                      [&_.menu-price-sub]:mt-1
                      [&_.menu-price-sub]:text-[#3E2723]
                      [&_.menu-price-sub]:text-sm
                      sm:[&_.menu-price-sub]:text-base
                      [&_.menu-price-sub]:leading-snug

                      [&_.addon-label]:text-[#6B4F3A]
                      [&_.addon-label]:text-xs
                      [&_.addon-label]:sm:text-sm
                      [&_.addon-label]:font-semibold
                      [&_.addon-label]:tracking-[0.18em]
                      [&_.addon-label]:uppercase
                      [&_.addon-label]:mb-5
                    `}
                  >
                    {/* FOOT MASSAGE */}
                    <div className="menu-card">
                      <h3 className="menu-name-local">
                        PADA NAMASKARA
                        <span className="menu-name-sinhala font-sinhala">පාද නමස්කාර</span>
                        <span className="menu-name-en">FOOT MASSAGE</span>
                      </h3>

                      <p className="menu-desc">
                        A complete pampering for your feet to wash off the stress and weariness to provide the ultimate
                        relaxation and comfort. Each session continues with a relaxing massage using natural body oil
                        or body lotion, focusing on pressure points to result in instant stress relief and relaxation.
                      </p>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">30 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 9,000 </span>
                              <span className="menu-price-sub">( LKR 6,700 )</span>
                            </div>
                          </div>

                          <div className="menu-option menu-option-divider">
                            <span className="menu-time">45 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 14,200 </span>
                              <span className="menu-price-sub">( LKR 10,570 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* HEAD, NECK & SHOULDER MASSAGE */}
                    <div className="menu-card">
                      <h3 className="menu-name-local">
                        KARUNAWA
                        <span className="menu-name-sinhala font-sinhala">කරුණාව</span>
                        <span className="menu-name-en">HEAD, NECK &amp; SHOULDER MASSAGE</span>
                      </h3>

                      <p className="menu-desc">
                        A stress relieving and calming massage which begins at the head and continues to the neck and
                        shoulders, up to the hands, focusing on pressure points to remove and reduce stress and result
                        in better physical and mental relaxation.
                      </p>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">45 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 14,200 </span>
                              <span className="menu-price-sub">( LKR 10,570 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* HOT OIL SCALP MASSAGE */}
                    <div className="menu-card">
                      <h3 className="menu-name-local">
                        NIVAHAL
                        <span className="menu-name-sinhala font-sinhala">නිවහල්</span>
                        <span className="menu-name-en">HOT OIL SCALP MASSAGE</span>
                      </h3>

                      <p className="menu-desc">
                        A therapeutic head massage treatment focusing on total hair and scalp health, promoting hair
                        growth and a complete relaxation.
                      </p>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">45 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 14,200</span>
                              <span className="menu-price-sub">( LKR 10,570 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DIAMOND MASSAGE */}
                    <div className="menu-card">
                      <h3 className="menu-name-local">
                        VERALA
                        <span className="menu-name-sinhala font-sinhala">වෙරළ</span>
                        <span className="menu-name-en">DIAMOND MASSAGE</span>
                      </h3>

                      <p className="menu-desc">
                        An ultra relaxing body massage starting from the head and proceeding to the neck, shoulders,
                        up to the feet targeting all the pressure points along the way up to the lower back to relax
                        and remove stress on both upper and lower body.
                      </p>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">90 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 19,600 </span>
                              <span className="menu-price-sub">( LKR 14,590 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AROMA THERAPY MASSAGE */}
                    <div className="menu-card">
                      <h3 className="menu-name-local">
                        NINDA
                        <span className="menu-name-sinhala font-sinhala">නින්ද</span>
                        <span className="menu-name-en">AROMA THERAPY MASSAGE</span>
                      </h3>

                      <p className="menu-desc">
                        The self-healing powers of pure aroma oils, combined with soothing massage strokes of therapists
                        for a total relaxation that your body craves.
                      </p>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">60 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 16,900</span>
                              <span className="menu-price-sub">( LKR 12,580 )</span>
                            </div>
                          </div>

                          <div className="menu-option menu-option-divider">
                            <span className="menu-time">
                              90 min
                              <span className="block mt-0.5 text-[11px] sm:text-xs text-[#6B4F3A]/80 leading-tight whitespace-nowrap">
                                (incl. head)
                              </span>
                            </span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 21,900</span>
                              <span className="menu-price-sub">( LKR 16,302 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DEEP TISSUE MASSAGE */}
                    <div className="menu-card">
                      <h3 className="menu-name-local">
                        MAYTHRIYA
                        <span className="menu-name-sinhala font-sinhala">මෛත්‍රීය</span>
                        <span className="menu-name-en">DEEP TISSUE MASSAGE</span>
                      </h3>

                      <p className="menu-desc">
                        Helps release knots and strains in the deeper layers of muscle and connective tissue. The
                        treatment will leave you with a revitalized feeling of wellbeing.
                      </p>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">60 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 17,400</span>
                              <span className="menu-price-sub">( LKR 12,952 )</span>
                            </div>
                          </div>

                          <div className="menu-option menu-option-divider">
                            <span className="menu-time">
                              90 min
                              <span className="block mt-0.5 text-[11px] sm:text-xs text-[#6B4F3A]/80 leading-tight whitespace-nowrap">
                                (incl. head)
                              </span>
                            </span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 22,100</span>
                              <span className="menu-price-sub">( LKR 16,451 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PLATINUM FULL BODY MASSAGE */}
                    <div className="menu-card">
                      <h3 className="menu-name-local">
                        SAUBHAGYA
                        <span className="menu-name-sinhala font-sinhala">සෞභාග්‍යය</span>
                        <span className="menu-name-en">PLATINUM FULL BODY MASSAGE</span>
                      </h3>

                      <p className="menu-desc">
                        Hot herbal compress focusing on the lower back area, proceeding on to a complete 360 massage
                        from head to toe starting from the upper back to legs, focusing on the pressure points on the
                        lower back up to the legs and the feet. As the next step, the massage will continue from head
                        to toe and back to head, ending with a relaxing head massage.
                      </p>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">90 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 27,000 </span>
                              <span className="menu-price-sub">( LKR 20,098 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BODY SCRUB */}
                    <div className="menu-card">
                      <h3 className="menu-name-local">
                        VANNAMA
                        <span className="menu-name-sinhala font-sinhala">වන්නම</span>
                        <span className="menu-name-en">BODY SCRUB</span>
                      </h3>

                      <p className="menu-desc">
                        Carefully removing dead skin cells and drawing out impurities from your skin, for a glowing
                        and soothing skin.
                      </p>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">60 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 14,200 </span>
                              <span className="menu-price-sub">( LKR 10,570 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ADD ONS */}
                    <div className="menu-card">
                      <div className="addon-label pb-3">Add On</div>

                      <h3 className="menu-name-local pt-3">
                        KASHEIRU
                        <span className="menu-name-sinhala font-sinhala">කශේරු</span>
                        <span className="menu-name-en">BACK RELIEF</span>
                      </h3>

                      <div className="menu-meta">
                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">30 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR 6,000</span>
                              <span className="menu-price-sub">( LKR 4,466 )</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="menu-meta">
                        <h3 className="menu-name-local">
                          UNUSUMA
                          <span className="menu-name-sinhala font-sinhala">උණුසුම</span>
                          <span className="menu-name-en">HOT HERBAL COMPRESS</span>
                        </h3>

                        <div className="menu-options">
                          <div className="menu-option">
                            <span className="menu-time">15 min</span>
                            <div className="menu-price-wrap">
                              <span className="menu-price">LKR  3,900 </span>
                              <span className="menu-price-sub">( LKR 2,903 )</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer note */}
                  <p className="text-center text-white/70 text-[11px] sm:text-xs mt-12 leading-relaxed">
                    All prices are inclusive of applicable taxes. The base price (excluding tax) is indicated in brackets.
                  </p>
                </div>
              </div>

              {/* Rounded corners highlight */}
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}