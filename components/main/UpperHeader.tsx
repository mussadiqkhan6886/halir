'use client';

import React from 'react'
import {Swiper, SwiperSlide } from "swiper/react";
import {Autoplay} from "swiper/modules"
import { upperheader } from '@/lib/constants';
import "swiper/css"
import "swiper/css/autoplay";
import { magdaLig } from '@/lib/font';

const UpperHeader = () => {
  return (
    <Swiper
    modules={[Autoplay]}
    loop={true}
    autoplay={{delay: 3000}}
    slidesPerView={1}
    className={`${magdaLig.className} tracking-wide bg-zinc-600 text-white text-[12px] sm:text-sm text-center`}
    >
    {upperheader.map((item, i) => (
        <SwiperSlide key={i}>
            <p className='py-1.5 '>{item}</p>
        </SwiperSlide>
    ))}
    </Swiper>
  )
}

export default UpperHeader
