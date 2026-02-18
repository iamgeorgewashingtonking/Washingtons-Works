import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const microRef = useRef<HTMLSpanElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Initial states
      gsap.set([leftCardRef.current, rightCardRef.current], { opacity: 0 });
      gsap.set(leftCardRef.current, { x: '-12vw', scale: 0.98 });
      gsap.set(rightCardRef.current, { x: '12vw', scale: 0.98 });
      gsap.set([headlineRef.current, subheadRef.current, bodyRef.current, ctaRef.current, microRef.current], { 
        opacity: 0, 
        y: 24 
      });

      // Entrance sequence
      tl.to([leftCardRef.current, rightCardRef.current], {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
      })
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, '-=0.4')
      .to(subheadRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, '-=0.3')
      .to(bodyRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, '-=0.3')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.6)',
      }, '-=0.2')
      .to(microRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([leftCardRef.current, rightCardRef.current], { opacity: 1, x: 0 });
            gsap.set([headlineRef.current, subheadRef.current, bodyRef.current, ctaRef.current, microRef.current], { 
              opacity: 1, 
              y: 0 
            });
          },
        },
      });

      // ENTRANCE (0% - 30%): Hold at settle state (already animated in on load)
      // No animation needed here

      // SETTLE (30% - 70%): Static
      // No animation

      // EXIT (70% - 100%): Cards slide out
      scrollTl.fromTo(leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0B0B0D] overflow-hidden z-10"
    >
      <div className="absolute inset-0 flex items-center justify-center px-[5vw]">
        {/* Left Photo Card */}
        <div
          ref={leftCardRef}
          className="absolute left-[5vw] top-[14vh] w-[42vw] h-[72vh] rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
        >
          <img
            src="/images/hero_gadgets.jpg"
            alt="Curated gadgets"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Text Card */}
        <div
          ref={rightCardRef}
          className="absolute left-[52vw] top-[14vh] w-[43vw] h-[72vh] rounded-[28px] bg-[#141419] border border-white/[0.08] shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex flex-col justify-center px-[6%]"
        >
          <h1
            ref={headlineRef}
            className="text-[#F5F5F7] text-[clamp(2rem,4vw,4rem)] font-black uppercase tracking-[-0.04em] leading-[0.92] mb-6"
          >
            Washington's Works
          </h1>
          
          <p
            ref={subheadRef}
            className="text-[#FF4D6D] text-[clamp(1rem,1.5vw,1.5rem)] font-bold uppercase tracking-[-0.02em] mb-4"
          >
            Neat tech. Real prices.
          </p>
          
          <p
            ref={bodyRef}
            className="text-[#B7B7C2] text-[clamp(0.875rem,1.1vw,1.125rem)] leading-relaxed max-w-[82%] mb-10"
          >
            A small, curated shop for gadgets that actually work—shipped fast, priced fair.
          </p>
          
          <button
            ref={ctaRef}
            onClick={scrollToProducts}
            className="ww-btn-primary flex items-center gap-2 w-fit mb-6"
          >
            Shop New Arrivals
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <span
            ref={microRef}
            className="ww-text-mono text-[#B7B7C2] text-xs"
          >
            Free Shipping Over $75
          </span>
        </div>
      </div>
    </section>
  );
}
