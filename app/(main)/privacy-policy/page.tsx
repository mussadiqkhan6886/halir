import React from 'react'
import { ekate, magdaLig } from '@/lib/font'

const PrivacyPolicy = () => {
  return (
    <main className="bg-light text-zinc-900 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        <section className="mb-10 border-b border-zinc-100">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase">
            Privacy Policy.
          </h1>
        </section>

        <article className={`space-y-16 ${magdaLig.className} text-zinc-600 leading-relaxed text-sm md:text-base`}>
          
          {/* Section 1 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">01. Introduction</h2>
            <p>
              Welcome to <strong>Halir</strong>. We respect your privacy and are committed to protecting your personal data. 
              This policy explains how we handle your information when you visit our studio online (halir.pk) and your rights regarding that data.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">02. Data Collection</h2>
            <p className="mb-4">We collect only what is necessary to provide you with the Halir experience:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Details:</strong> Name, email, phone number, and shipping address.</li>
              <li><strong>Usage Data:</strong> IP address, browser type, and interaction with our aesthetic visuals.</li>
              <li><strong>Cookies:</strong> Small files used to remember your selection in the cart.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">03. Use of Information</h2>
            <p>Your data allows us to:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Process and deliver your bespoke fragrance orders.</li>
              <li>Notify you of new olfactory releases (if opted in).</li>
              <li>Ensure the security and technical integrity of our platform.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">04. Payments & Security</h2>
            <p>
              Security is paramount. We use third-party payment processors to handle your transactions. 
              <strong> Halir does not store your credit card or bank details.</strong> All payment information 
              is handled by PCI-DSS compliant providers to ensure absolute safety.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">05. Your Rights</h2>
            <p>
              Whether you are in Pakistan, the EU (GDPR), or California (CCPA), you have the right to access, 
              correct, or request the deletion of your personal data at any time. Simply reach out to our concierge.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-zinc-50 p-8 md:p-12 border border-zinc-100">
            <h2 className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">06. Contact the Concierge</h2>
            <p className="mb-6">For any inquiries regarding your data privacy, please contact us directly:</p>
            <div className="space-y-2">
              <p className="text-zinc-900 font-bold">Email: hello@halir.pk</p>
              <p className="text-zinc-900 font-bold">Phone: +92 321 HALIR (01)</p>
            </div>
          </section>

        </article>
      </div>
    </main>
  )
}

export default PrivacyPolicy