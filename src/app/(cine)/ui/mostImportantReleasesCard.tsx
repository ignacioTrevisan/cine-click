'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { MovieForHomePage } from '@/app/core/entities/movies';

interface Props {
    Movies: MovieForHomePage[],
    delay?: number
}


export const MostImportantReleasesCard = ({ Movies, delay }: Props) => {

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
        <div className='p-2 sm:p-10'>
            <h3 className='text-lg sm:text-[50px] mt-5'>Últimos lanzamientos</h3>
            <div className=" w-full sm:mt-10 mt-2 flex justify-center">
                <div className='w-[100%] sm:w-[900px] '>


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

                            swiper.el.addEventListener("mouseenter", () => {
                                swiper.autoplay.stop();
                            });
                            swiper.el.addEventListener("mouseleave", () => {
                                swiper.autoplay.start();
                            });
                        }}
                    >
                        {Movies.map((i, index) => (

                            <SwiperSlide key={i.name}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <div className='justify-center transition-all relative max-h-[500px] duration-300 items-center text-[40px] hover:text-[45px] flex'>
                                    <button className={`absolute z-10  text-white  ${blur[index] ? 'block' : 'hidden'}`}
                                        style={{ opacity: blur[index] ? '1' : '0' }}
                                    >Ver más</button>
                                    <Image
                                        src={i.path}
                                        alt={`${i.name} image`}
                                        width={1920}
                                        height={1080}
                                        objectFit='cover'
                                        className={`transition-all filter ${blur[index] ? 'blur-[8px]' : ''}`}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div >
        </div>
    )
}
