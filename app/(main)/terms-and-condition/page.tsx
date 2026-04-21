import React from 'react'
import { ekate, magdaLig } from '@/lib/font'

const TermsAndConditions = () => {
  return (
    <main className="bg-light text-zinc-900 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-10 border-b border-zinc-100 ">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase">
            Terms & Condition
          </h1>
        </div>

        {/* Content Body */}
        <article className={`space-y-16 ${magdaLig.className} text-zinc-600 leading-relaxed text-sm md:text-base`}>
          
          {/* Section 1 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">01. Acceptance</h2>
            <p>
              By accessing the <strong>Halir</strong> studio (halir.pk), you agree to be bound by these Terms of Service. 
              These terms govern your use of our platform and the purchase of our premium fragrances. If you do not 
              agree with any part of these terms, we kindly ask you to discontinue use of our services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">02. Purchases & Payments</h2>
            <p className="mb-4">
              When making a purchase, you agree to provide accurate and complete information. 
              We reserve the right to refuse or cancel any order for reasons including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Limited product availability or stock depletion.</li>
              <li>Discrepancies in pricing or product descriptions.</li>
              <li>Suspicion of unauthorized or fraudulent transactions.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">03. Intellectual Property</h2>
            <p>
              All aesthetic content, including imagery, custom fonts, brand identity, and the fragrances themselves, 
              are the exclusive property of <strong>Halir</strong>. You may not distribute, modify, or use our digital 
              assets for commercial gain without express written permission from our studio.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">04. Delivery & Returns</h2>
            <p>
              We aim for excellence in fulfillment. Standard delivery within Pakistan is typically completed 
              within 3 working days. For information regarding our 20hr+ scent longevity guarantee and our 
              return protocols, please refer to our dedicated Exchange & Return page.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">05. Limitation of Liability</h2>
            <p>
              Halir provides its services on an &quot;as is&quot; basis. While we strive for perfection in every bottle, 
              our total liability is limited to the amount paid for the products purchased. We are not responsible 
              for any indirect damages resulting from the use of our website or products.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-zinc-50 p-8 md:p-12 border border-zinc-100">
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">06. Governing Law</h2>
            <p className="mb-6">
              These Terms are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan.
            </p>
            <div className="space-y-2">
              <p className="text-zinc-900 font-bold italic underline underline-offset-4 tracking-tighter">
                hello@halir.pk
              </p>
            </div>
          </section>

        </article>
      </div>
    </main>
  )
}

export default TermsAndConditions