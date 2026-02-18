import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(blockRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0B0B0D] py-20 px-[5vw] z-[90]"
    >
      <div
        ref={blockRef}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-[#F5F5F7] text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-[-0.04em] leading-[0.92] mb-4">
          Get The Drop
        </h2>
        
        <p className="text-[#B7B7C2] text-lg mb-8">
          New arrivals, restocks, and short-lived deals—once a week.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-3 text-[#FF4D6D]">
            <div className="w-10 h-10 rounded-full bg-[#FF4D6D]/10 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <span className="font-medium">You're on the list! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-[#141419] border border-white/[0.08] text-[#F5F5F7] placeholder:text-[#B7B7C2] focus:outline-none focus:border-[#FF4D6D] transition-colors"
              required
            />
            <button
              type="submit"
              className="ww-btn-primary flex items-center justify-center gap-2"
            >
              Subscribe
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[#B7B7C2] text-xs mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
