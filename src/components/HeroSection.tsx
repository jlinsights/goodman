'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const t = useTranslations('hero');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 600;

    // Network nodes (major cities)
    const nodes = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, label: 'Seoul' },
      { x: canvas.width * 0.35, y: canvas.height * 0.5, label: 'Shanghai' },
      { x: canvas.width * 0.45, y: canvas.height * 0.35, label: 'Tokyo' },
      { x: canvas.width * 0.6, y: canvas.height * 0.6, label: 'Singapore' },
      { x: canvas.width * 0.75, y: canvas.height * 0.4, label: 'LA' },
      { x: canvas.width * 0.85, y: canvas.height * 0.55, label: 'NY' },
    ];

    let animationFrame = 0;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((node, index) => {
        const pulseSize = 8 + Math.sin(animationFrame * 0.05 + index) * 3;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6B35';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize + 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 107, 53, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationFrame++;
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Canvas Network */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#0A2463' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0A2463] z-1"></div>

      {/* Content */}
      <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center text-white px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-white mb-4 md:mb-6">
            {t('headline')}
          </h1>
          <p className="text-base md:text-xl lg:text-2xl mb-3 md:mb-4 max-w-3xl mx-auto font-light text-gray-100">
            {t('subheadline')}
          </p>
          <p className="text-sm md:text-base lg:text-lg mb-8 md:mb-10 max-w-2xl mx-auto text-gray-300">
            {t('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link href="#contact" className="btn btn-primary w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold">
              {t('ctaPrimary')}
            </Link>
            <Link href="#partner-hub" className="btn btn-outline w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold">
              {t('ctaSecondary')}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl md:text-4xl font-bold text-accent-foreground">20+</div>
              <div className="text-xs md:text-sm text-gray-300 mt-1">{t('stats.years')}</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-accent-foreground">50+</div>
              <div className="text-xs md:text-sm text-gray-300 mt-1">{t('stats.countries')}</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-accent-foreground">10K+</div>
              <div className="text-xs md:text-sm text-gray-300 mt-1">{t('stats.shipments')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
