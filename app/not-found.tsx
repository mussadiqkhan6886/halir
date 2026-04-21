import Link from 'next/link';
import { magdaLig } from '@/lib/font';

export default function NotFound() {
  return (
    <main className={magdaLig.className}>
      <section>
           <div className="relative min-h-screen bg-white text-black flex flex-col items-center justify-center overflow-hidden px-6">
 
      {/* Corner decorations */}
      <span className="absolute top-8 left-8 w-14 h-14 border-t border-l border-black" />
      <span className="absolute top-8 right-8 w-14 h-14 border-t border-r border-black" />
      <span className="absolute bottom-8 left-8 w-14 h-14 border-b border-l border-black" />
      <span className="absolute bottom-8 right-8 w-14 h-14 border-b border-r border-black" />
 
      {/* Brand name */}
      <p className="absolute top-10 tracking-[0.45em] text-[11px] uppercase font-light">
        Halir
      </p>
 
      {/* Center content */}
      <div className="flex flex-col items-center text-center">
 
        {/* 404 */}
        <h1 className="text-[clamp(120px,20vw,200px)] font-thin leading-none tracking-tight select-none mb-5 ">
          404
        </h1>
 
 
        {/* Message */}
        <p className="text-[clamp(16px,2.5vw,22px)] font-light tracking-wide mb-3">
          This page has lost its scent.
        </p>
 
        <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 font-light mb-12">
          The page you're looking for doesn't exist
        </p>
 
        {/* CTA */}
        <Link
          href="/"
          className="inline-block border border-black px-10 py-3.5 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-300 hover:bg-black hover:text-white"
        >
          Return Home
        </Link>
      </div>
 
    </div>
      </section>
    </main>
   
  );
}