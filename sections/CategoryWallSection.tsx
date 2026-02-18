import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: 'Audio', image: '/images/category_audio.jpg' },
  { name: 'Gaming', image: '/images/category_gaming.jpg' },
  { name: 'Productivity', image: '/images/category_productivity.jpg' },
  { name: 'Smart Home', image: '/images/category_smarthome.jpg' },
];

export function CategoryWallSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTallRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(leftTallRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(gridContainerRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      
      gridCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(card,
            { scale: 0.86, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'none' },
            0.08 + i * 0.04
          );
        }
      });

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(leftTallRef.current,
        { y: 0, opacity: 1 },
        { y: '-30vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      gridCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(card,
            { y: 0, opacity: 1 },
            { y: '30vh', opacity: 0, ease: 'power2.in' },
            0.7 + i * 0.03
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative w-full h-screen bg-[#0B0B0D] overflow-hidden z-40"
    >
      {/* Left Tall Photo Card */}
      <div
        ref={leftTallRef}
        className="absolute left-[5vw] top-[10vh] w-[30vw] h-[80vh] rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
      >
        <img
          src="/images/workspace_tall.jpg"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6">
          <span className="text-[#F5F5F7] text-xl font-bold">Workspace</span>
        </div>
      </div>

      {/* Right 2x2 Grid */}
      <div
        ref={gridContainerRef}
        className="absolute left-[37vw] top-[10vh] w-[58vw] h-[80vh]"
      >
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
          {categories.map((category, index) => (
            <div
              key={category.name}
              ref={el => { gridCardsRef.current[index] = el; }}
              className="relative rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.45)] group cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[#F5F5F7] text-lg font-bold">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Shop all link */}
        <a
          href="#products"
          className="absolute -bottom-8 right-0 text-[#FF4D6D] text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all"
        >
          Shop all categories
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
