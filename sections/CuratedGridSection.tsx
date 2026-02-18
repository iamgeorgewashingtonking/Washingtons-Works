import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Truck, RotateCcw, BadgeDollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CuratedGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(topLeftRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(topRightRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(bottomLeftRef.current,
        { x: '-60vw', y: '20vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0.06
      );
      scrollTl.fromTo(bottomRightRef.current,
        { x: '60vw', y: '20vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo([topLeftRef.current, topRightRef.current],
        { y: 0, opacity: 1 },
        { y: '-35vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo([bottomLeftRef.current, bottomRightRef.current],
        { y: 0, opacity: 1 },
        { y: '35vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0B0B0D] overflow-hidden z-20"
    >
      {/* Top Left - Headline Card */}
      <div
        ref={topLeftRef}
        className="absolute left-[5vw] top-[10vh] w-[44vw] h-[34vh] rounded-[28px] bg-[#141419] border border-white/[0.08] shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex flex-col justify-center px-8"
      >
        <h2 className="text-[#F5F5F7] text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase tracking-[-0.03em] leading-[0.92] mb-4">
          Curated For Real Life
        </h2>
        <p className="text-[#B7B7C2] text-[clamp(0.8rem,1vw,1rem)] leading-relaxed max-w-[90%] mb-4">
          We test what we stock. If it's here, it's because it's reliable, useful, and worth the price.
        </p>
        <a
          href="#products"
          className="text-[#FF4D6D] text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all"
        >
          See what's in stock
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Top Right - Keyboard Photo */}
      <div
        ref={topRightRef}
        className="absolute left-[51vw] top-[10vh] w-[44vw] h-[34vh] rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
      >
        <img
          src="/images/keyboard_closeup.jpg"
          alt="Mechanical keyboard"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Left - Controller Photo */}
      <div
        ref={bottomLeftRef}
        className="absolute left-[5vw] top-[48vh] w-[44vw] h-[42vh] rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
      >
        <img
          src="/images/controller_hand.jpg"
          alt="Gaming controller"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Right - Features Card */}
      <div
        ref={bottomRightRef}
        className="absolute left-[51vw] top-[48vh] w-[44vw] h-[42vh] rounded-[28px] bg-[#141419] border border-white/[0.08] shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex flex-col justify-center px-8"
      >
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FF4D6D]/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#FF4D6D]" />
            </div>
            <span className="text-[#F5F5F7] font-semibold">Fast shipping</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FF4D6D]/10 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-[#FF4D6D]" />
            </div>
            <span className="text-[#F5F5F7] font-semibold">30-day returns</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FF4D6D]/10 flex items-center justify-center">
              <BadgeDollarSign className="w-5 h-5 text-[#FF4D6D]" />
            </div>
            <span className="text-[#F5F5F7] font-semibold">Wholesale value</span>
          </div>
        </div>
      </div>
    </section>
  );
}
