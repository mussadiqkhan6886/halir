'use client';

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ekate, magdaLig } from '@/lib/font'
import { HiPlus, HiMinus } from "react-icons/hi"

const faqs = [
  {
    question: "How long does a Halir fragrance typically last?",
    answer: "Our fragrances are formulated at 'Extrait de Parfum' concentration. Depending on the specific scent and your skin chemistry, you can expect a persistence of 12 to 24 hours."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we focus on delivering excellence within Pakistan. However, we are working on expanding our logistics to bring Halir to the global stage soon."
  },
  {
    question: "Can I return a fragrance if I don't like the scent?",
    answer: "Yes. We offer a 30-day return and exchange policy. To ensure a perfect match, we recommend trying our discovery sets before committing to a full-sized bottle."
  },
  {
    question: "Is the packaging sustainable?",
    answer: "Luxury and responsibility go hand-in-hand. Our boxes are 100% recyclable, and we use FSC-certified paper for all our bespoke gift packaging."
  },
  {
    question: "How should I store my perfume to maintain its quality?",
    answer: "To preserve the integrity of the essential oils, store your bottle in a cool, dark place away from direct sunlight and humidity."
  }
]

const FAQ = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section className='bg-white py-10 md:py-20 px-6 border-t border-zinc-100'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16'>
        
        {/* Left Side: Sticky Header */}
        <div className='lg:col-span-4 lg:sticky lg:top-32 h-fit'>
          
          <h2 className='text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9] mb-6'>
            Common <br className='hidden md:block' /> 
            Inquiries.
          </h2>
          <p className={`${magdaLig.className} text-zinc-500 text-sm max-w-xs leading-relaxed`}>
            Can't find what you're looking for? Reach out to our olfactory experts via WhatsApp or Email.
          </p>
        </div>

        {/* Right Side: Accordion */}
        <div className='lg:col-span-8 border-t border-zinc-100'>
          {faqs.map((faq, index) => (
            <div key={index} className='border-b border-zinc-100'>
              <button
                onClick={() => setActiveIdx(activeIdx === index ? null : index)}
                className='w-full py-7 flex justify-between items-center text-left group'
              >
                <span className='text-md sm:text-lg md:text-xl font-bold uppercase tracking-tight group-hover:pl-2 transition-all duration-300'>
                  {faq.question}
                </span>
                <div className='ml-3 flex-shrink-0'>
                  {activeIdx === index ? <HiMinus size={20} /> : <HiPlus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIdx === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className='overflow-hidden'
                  >
                    <p className={`${magdaLig.className} text-zinc-500 text-sm md:text-md pb-7 max-w-2xl md:leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ