import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedSpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPhotoRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  
  const { addItem } = useCart();

  const featuredProduct = {
    id: 'headphones-001',
    name: 'Studio-Ready Headphones',
    price: 89,
    image: '/images/headphones_featured.jpg',
  };

  const handleAddToCart = () => {
    addItem(featuredProduct);
  };

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
      scrollTl.fromTo(leftPhotoRef.current,
        { x: '-70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: '70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(headlineRef.current?.children || [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, ease: 'none' },
        0.1
      );
      scrollTl.fromTo(ctaRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.4)' },
        0.2
      );

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(leftPhotoRef.current,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="deals"
      className="relative w-full h-screen bg-[#0B0B0D] overflow-hidden z-30"
    >
      {/* Left Photo Card */}
      <div
        ref={leftPhotoRef}
        className="absolute left-[5vw] top-[12vh] w-[54vw] h-[76vh] rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
      >
        <img
          src="/images/headphones_featured.jpg"
          alt="Studio-Ready Headphones"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Text Card */}
      <div
        ref={rightCardRef}
        className="absolute left-[61vw] top-[12vh] w-[34vw] h-[76vh] rounded-[28px] bg-[#141419] border border-white/[0.08] shadow-[0_18px_60px_rgba(0,0,0,0.45)] flex flex-col justify-center px-8"
      >
        {/* Badge */}
        <span className="ww-text-mono text-[#FF4D6D] text-xs mb-4">
          Staff Pick
        </span>
        
        <div ref={headlineRef}>
          <h2 className="text-[#F5F5F7] text-[clamp(1.25rem,2vw,1.75rem)] font-black uppercase tracking-[-0.02em] leading-[0.92] mb-3">
            Featured Find
          </h2>
          
          <h3 className="text-[#F5F5F7] text-[clamp(1.5rem,2.5vw,2rem)] font-bold mb-2">
            Studio-Ready Headphones
          </h3>
          
          <p className="text-[#FF4D6D] text-3xl font-bold mb-6">
            ${featuredProduct.price}
          </p>
          
          <p className="text-[#B7B7C2] text-[clamp(0.875rem,1vw,1rem)] leading-relaxed mb-10 max-w-[90%]">
            Clear sound, clean design, and a price that leaves room for cables.
          </p>
        </div>
        
        <button
          ref={ctaRef}
          onClick={handleAddToCart}
          className="ww-btn-primary flex items-center gap-2 w-fit mb-4"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        
        <a
          href="#"
          className="text-[#B7B7C2] text-sm flex items-center gap-1 hover:text-[#F5F5F7] transition-colors"
        >
          View specs
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
