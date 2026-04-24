"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillStar } from "react-icons/ai";
import { ekate, magdaLig, magdaReg } from '@/lib/font';
import Link from 'next/link';
import { reviewType } from '@/type';
import axios from 'axios';


const ReviewCard = ({ review }: { review: reviewType }) => (
  <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm mb-6 w-full">
    <div className="flex items-center gap-1 mb-3 text-amber-400">
      {[...Array(5)].map((_, i) => (
        <AiFillStar key={i} size={14} className={i < 5 ? "opacity-100" : "opacity-20"} />
      ))}
    </div>
    <p className="text-stone-600 leading-relaxed italic text-sm mb-4">"{review.message}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-stone-50">
      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold text-[#800000] text-sm">
        {review.name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-stone-800 text-xs tracking-tight">{review.name}</h4>
      </div>
    </div>
  </div>
);

const ReviewColumn = ({ reviews, duration, delay = 0 }: { reviews: reviewType[], duration: number, delay?: number }) => (
  <motion.div 
    initial={{ y: "0%" }}
    whileInView={{ y: "-50%" }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "linear",
      delay: delay
    }}
    className="flex flex-col"
  >
    {reviews.map((rev, i) => (
      <ReviewCard key={i} review={rev} />
    ))}
  </motion.div>
);

const Reviews = () => {

  const [reviews, setReviews] = useState<reviewType[] | null>(null)

  const fetchReviews = async () => {
    const res = await axios.get("/api/reviews")

    const data = res.data.testimonials

    const duplicate : reviewType[] = [...data, ...data, ...data]

    setReviews(duplicate)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  if(reviews === null) return null

  return (
    <section id="review" className="py-18 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16 relative z-20">
        
         <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`${ekate.className} text-4xl sm:text-5xl md:text-6xl text-stone-900 mb-3 md:mb-0`}
          >
            Letters of <span className="italic text-[#800000]"> Love</span>
          </motion.h3>
          <p className={`${magdaLig.className} text-stone-500 mt-6 text-sm sm:text-lg`}>
            A few kind words from those who have experienced the magic of HALIR Perfumery.
          </p>
        </div>

        <div className="relative h-[700px] overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FDFCFB] via-[#FDFCFB]/80 to-transparent z-10 backdrop-blur-[2px]" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFCFB] via-[#FDFCFB]/80 to-transparent z-10 backdrop-blur-[2px]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            
            <div className="relative">
              <ReviewColumn reviews={reviews} duration={30} />
            </div>

            <div className="relative hidden md:block">
              <ReviewColumn reviews={reviews} duration={40} delay={-5} />
            </div>

            <div className="relative hidden lg:block">
              <ReviewColumn reviews={reviews} duration={25} delay={-2} />
            </div>

          </div>
        </div>
      </div>
      <Link className={`block text-center mt-6 ${magdaReg.className} uppercase  text-zinc-600 tracking-wider`} href="/add-review">Add a Review</Link>
    </section>
  );
};

export default Reviews;