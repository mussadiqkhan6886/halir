'use client';

import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ekate, magdaLig } from '@/lib/font'
import { HiOutlineArrowLongRight, HiOutlinePhone } from 'react-icons/hi2'
import { HiOutlineMail } from 'react-icons/hi';
import axios from 'axios';

const ContactUs = () => {
    const [response, setResponse] = useState<null | 'yes' | 'no'>(null);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        message:  ""
    })

    const handleNoHover = () => {
        if (response === 'yes') return; // Don't move if they already said yes
        
        const randomX = (Math.random() - 0.5) * 500;
        const randomY = (Math.random() - 0.5) * 300;
        
        setNoButtonPosition({ x: randomX, y: randomY });
    };


    useEffect(() => {
      if (!clicked) return;

      const timer = setTimeout(() => {
        setClicked(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, [clicked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value

        setData(prev => ({
            ...prev, [name]: value
        }))
    }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const name = data.name
        const email = data.email
        const message= data.message
        const body = {
            name, email, message
        }
        try{
            const res = await axios.post("/api/contact-us", body)
            if(res.data.success){
                setData({
                    name: "",
                    email: "",
                    message: "",
                })
            }
        }catch(err: any){
            console.log(err.message)
        }finally{
            setLoading(false)
        }
    
    }

    return (
        <main className='grid grid-cols-1 md:grid-cols-2 bg-black text-white min-h-screen overflow-hidden'>
            
            <section className='relative flex items-center justify-center p-6 md:p-12 overflow-hidden border-r border-zinc-900 h-[85vh] md:h-full'>
                
                <Image 
                    src="/contact.webp" 
                    alt="Atmospheric contact inspiration coffee image" 
                    fill 
                    priority
                    className='object-cover object-center opacity-80 select-none pointer-events-none' 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10' />

                <div className='relative z-20 text-center flex flex-col items-center max-w-lg'>
                    
                    <AnimatePresence mode="wait">
                        {response === null && (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8 }}
                                className='space-y-6'
                            >
                                <span className={`${ekate.className} text-4xl sm:text-5xl text-red-700 block mb-10 md:-mb-4`}>Quick question</span>
                                <h2 className='text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-none'>
                                    DO YOU
                                    LOVE <br />
                                    COFFEE?
                                
                                </h2>
                                
                                <div className='flex items-center justify-center gap-10 pt-10 relative'>
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => setResponse('yes')}
                                        className='bg-white text-black px-8 sm:px-12 py-4 sm:py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-black cursor-pointer hover:text-white transition-all duration-500 rounded-sm'
                                    >
                                        Yes, I do.
                                    </motion.button>

                                    {!clicked && <motion.button 
                                        animate={noButtonPosition}
                                        onMouseEnter={handleNoHover}
                                        onClick={() => setClicked(true)}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className='text-white/50 border-b border-white/20 pb-2 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-white hover:border-white transition-colors cursor-crosshair'
                                    >
                                        No
                                    </motion.button>}

                                    {clicked && <div className='bg-light shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-black p-20'>
                                        <p className="text-center font-semibold text-4xl">Wrong Answer</p>
                                      </div>}
                                </div>
                            </motion.div>
                        )}

                        {response === 'yes' && (
                            <motion.div
                                key="yes-response"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className='space-y-6'
                            >
                                <h2 className='text-7xl md:text-9xl font-black italic tracking-tighter '>Excellent.</h2>
                                <p className={`${magdaLig.className} text-zinc-200 text-md leading-relaxed max-w-md mx-auto`}>
                                    We believe coffee and fragrance share the same DNA: mood, depth, and memory. Our atelier smells exactly like fresh espresso right now.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <section className='p-8 md:p-16 lg:p-24 flex flex-col bg-black relative'>
                
                <div className='mb-16'>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter'>
                        Connect with <br />
                        <span className={`${ekate.className} text-zinc-200 capitalize font-light mb-2 md:mt-4 text-center block`}>Halir.</span>
                    </h1>
                </div>

                {/* Contact Links Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-12'>
                    <div className='border-l border-zinc-800 pl-6 group cursor-pointer'>
                        <HiOutlineMail className="text-zinc-700 mb-6 group-hover:text-white transition-colors" size={24} />
                        <h4 className='text-sm font-bold uppercase tracking-widest mb-2'>Email Us</h4>
                        <p className={`${magdaLig.className} text-zinc-500`}>halirperfumery@gmail.com</p>
                    </div>
                    <div className='border-l border-zinc-800 pl-6 group cursor-pointer'>
                        <HiOutlinePhone className="text-zinc-700 mb-6 group-hover:text-white transition-colors" size={24} />
                        <h4 className='text-sm font-bold uppercase tracking-widest mb-2'>Speak Directly</h4>
                        <p className={`${magdaLig.className} text-zinc-500`}>+92 321 HALIR (01)</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='flex-grow space-y-6'>
                    <div className="relative">
                        <input name="name" value={data.name} onChange={handleChange} type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-zinc-800 py-4 text-sm tracking-tight placeholder:text-zinc-700 focus:border-white focus:outline-none transition-all" />
                    </div>
                    <div className="relative">
                        <input name="email" value={data.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-zinc-800 py-4 text-sm tracking-tight placeholder:text-zinc-700 focus:border-white focus:outline-none transition-all" />
                    </div>
                    <div className="relative">
                        <textarea name="message" value={data.message} onChange={handleChange} placeholder="Message / Enquiry" rows={4} className="w-full bg-transparent border-b border-zinc-800 py-4 text-sm tracking-tight placeholder:text-zinc-700 focus:border-white focus:outline-none transition-all resize-none" />
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        type="submit" 
                        className="w-full flex items-center justify-between border border-white/20 bg-zinc-950 p-4 text-[10px] font-bold tracking-[0.5em] uppercase enabled:hover:bg-white  enabled:hover:text-black transition-all group cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Enquiry"}
                        <HiOutlineArrowLongRight size={20} className="transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-500" />
                    </motion.button>
                </form>

            </section>
        </main>
    )
}

export default ContactUs