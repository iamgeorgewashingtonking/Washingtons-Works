import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: 'Shop', href: '#products' },
  { label: 'Shipping', href: '#' },
  { label: 'Returns', href: '#' },
  { label: 'Privacy', href: '#' },
];

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'TikTok', href: '#', icon: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )},
  { label: 'X', href: '#', icon: Twitter },
];

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        if (panel) {
          gsap.fromTo(panel,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: i * 0.1,
              scrollTrigger: {
                trigger: panel,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-[#6B6BFF] py-16 px-[5vw] z-[100]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Panel - Contact */}
          <div
            ref={el => { panelsRef.current[0] = el; }}
            className="rounded-[28px] bg-white/10 backdrop-blur-sm border border-white/20 p-8"
          >
            <h3 className="text-white text-[clamp(1.5rem,2.5vw,2rem)] font-black uppercase tracking-[-0.02em] leading-[0.92] mb-6">
              Let's Talk
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="ww-text-mono text-white/60 text-xs block mb-1">Email</span>
                <a 
                  href="mailto:hello@washingtonsworks.com" 
                  className="text-white font-medium hover:underline"
                >
                  hello@washingtonsworks.com
                </a>
              </div>
              
              <div>
                <span className="ww-text-mono text-white/60 text-xs block mb-1">Hours</span>
                <p className="text-white font-medium">Mon–Fri, 9am–6pm ET</p>
              </div>
            </div>
          </div>

          {/* Right Panel - Links & Socials */}
          <div
            ref={el => { panelsRef.current[1] = el; }}
            className="rounded-[28px] bg-white/10 backdrop-blur-sm border border-white/20 p-8"
          >
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <span className="ww-text-mono text-white/60 text-xs block mb-4">Quick Links</span>
                <ul className="space-y-3">
                  {footerLinks.map(link => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className="text-white font-medium hover:text-white/80 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Socials */}
              <div>
                <span className="ww-text-mono text-white/60 text-xs block mb-4">Follow Us</span>
                <div className="flex gap-3">
                  {socialLinks.map(social => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2025 Washington's Works. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Curated gadgets, real prices.
          </p>
        </div>
      </div>
    </footer>
  );
}
