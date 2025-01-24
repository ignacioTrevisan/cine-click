'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { MovieForHomePage } from '@/app/core/entities/movies';
import Link from 'next/link';

interface Props {
    Movies: MovieForHomePage[],
    delay?: number
}


export const MostImportantReleasesCard = ({ Movies }: Props) => {

    const [blur, setBlur] = useState<Record<number, boolean>>({});

    const handleMouseEnter = (index: number) => {
        setBlur((prevBlur) => ({
            ...prevBlur,
            [index]: true,
        }));
    };

    const handleMouseLeave = (index: number) => {
        setBlur((prevBlur) => ({
            ...prevBlur,
            [index]: false,
        }));
    };

    return (
        <div className='p-2 sm:p-10 h-full mt-[50px] '>
            <h3 className='text-lg sm:text-[50px]'>🎥Últimos lanzamientos</h3>
            <div className="w-full sm:mt-10 mt-2 flex justify-center">
                <div className='w-[100%] sm:w-[900px] relative'>
                    <Swiper
                        className="mySwiper"
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={1}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        loop={true}
                        onSwiper={(swiper) => {
                            swiper.el.addEventListener("mouseenter", () => swiper.autoplay.stop());
                            swiper.el.addEventListener("mouseleave", () => swiper.autoplay.start());
                        }}
                    >
                        {Movies.map((i, index) => (
                            <SwiperSlide
                                key={i.name}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <div className="justify-center transition-all relative duration-300 items-center text-[40px] hover:text-[45px] flex h-full w-full">
                                    <Link
                                        className="absolute transition-opacity duration-300 z-10 text-white"
                                        href={`movie/${i.slug!}`}
                                        style={{ opacity: blur[index] ? 1 : 0 }}
                                    >
                                        Ver más
                                    </Link>

                                    <div className=''>
                                        <Image
                                            src={i.path}
                                            alt={`${i.name} image`}
                                            layout="responsive"
                                            width={220}
                                            height={180}
                                            objectFit="cover"
                                            className={`transition-all filter rounded-2xl ${blur[index] ? 'blur-[8px]' : ''}`}
                                        />
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>

    )
}
