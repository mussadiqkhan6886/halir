import React from 'react'
import { ekate, magdaLig } from '@/lib/font'

const ServiceProtocol = () => {
  return (
    <main className="bg-light text-zinc-900 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-20 border-b border-zinc-100">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase ">
            Shipping & Returns
          </h1>
         
        </header>

        <article className={`space-y-24 ${magdaLig.className} text-zinc-600 leading-relaxed text-sm md:text-base`}>
          
          {/* Section 1: Shipping */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs">01. Delivery Logistics</h2>
               <div className="h-px flex-grow bg-zinc-100"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-zinc-900 font-bold text-sm mb-2 uppercase">Domestic Shipping</h3>
                    <p>We offer <strong>Free Standard Shipping</strong> on all orders above PKR 4,000. For orders below this threshold, a flat rate of PKR 300 applies.</p>
                </div>
                <div>
                    <h3 className="text-zinc-900 font-bold text-sm mb-2 uppercase">Timeline</h3>
                    <p>Deliveries typically arrive within 4-6 working days. Please note that while we strive for speed, these are estimates.</p>
                </div>
            </div>

            <div className="bg-zinc-50 p-6 rounded-sm border border-zinc-100">
                <h3 className="text-zinc-900 font-bold text-sm mb-2 uppercase">Studio Pickup</h3>
                <p>In-store collection is available Wednesday – Thursday, 11 AM – 7 PM. Please coordinate via WhatsApp at +92 335 7375999 before arrival.</p>
            </div>
          </section>

          {/* Section 2: Returns & Exchanges */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs">02. Returns & Exchanges</h2>
               <div className="h-px flex-grow bg-zinc-100"></div>
            </div>

            <p>
              We accept returns of non-damaged, significantly unused perfume bottles in their original packaging within <strong>30 days</strong> of purchase. 
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ul className="space-y-3 list-none">
                    <li className="flex gap-3"><span className="text-red-600">/</span> Traceable courier returns are at the customer&apos;s expense.</li>
                    <li className="flex gap-3"><span className="text-red-600">/</span> Delivery charges are non-refundable.</li>
                    <li className="flex gap-3"><span className="text-red-600">/</span> Bundle packs must be returned in full.</li>
                </ul>
                <ul className="space-y-3 list-none">
                    <li className="flex gap-3"><span className="text-zinc-400">/</span> Sample Sets are non-refundable.</li>
                    <li className="flex gap-3"><span className="text-zinc-400">/</span> &quot;Buy 2 Get 1&quot; deals are final sale.</li>
                    <li className="flex gap-3"><span className="text-zinc-400">/</span> Refunds process within 7 working days.</li>
                </ul>
            </div>
          </section>

          {/* Section 3: Return Address */}
          <section className="bg-black text-white p-8 md:p-12 relative overflow-hidden">
            <h2 className="font-bold uppercase tracking-widest text-xs mb-8 text-zinc-500">03. Return Destination</h2>
            <address className="not-italic space-y-2">
                <p className="text-xl font-bold tracking-tight">Halir Perfumes</p>
                <p className="text-zinc-400">House # 261-O, Ground Portion</p>
                <p className="text-zinc-400">PECHS, Block 6, Karachi, Pakistan</p>
            </address>
            
            <div className="mt-10 pt-10 border-t border-zinc-800">
                <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4">Concierge Support</p>
                <p className="text-lg font-bold">+92 335 7375999</p>
            </div>

            {/* Subtle aesthetic watermark */}
            <span className={`${ekate.className} absolute -right-4 -bottom-10 text-[12rem] opacity-[0.05] pointer-events-none`}>
                H
            </span>
          </section>

        </article>

        {/* Brand Sign-off */}
        <footer className="mt-24 pt-10 border-t border-zinc-100 text-center">
            <p className={`${ekate.className} text-4xl text-black mb-2`}>Halir</p>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400">
              Identity through scent
            </p>
        </footer>
      </div>
    </main>
  )
}

export default ServiceProtocol