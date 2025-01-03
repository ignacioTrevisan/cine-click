'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import Image from 'next/image';
import { MovieForHomePage } from '@/app/core/entities/movies';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
    title: string,
    Movies: MovieForHomePage[],
    delay?: number
}

export const ThisWeekCard = ({ title, Movies, delay = 2500 }: Props) => {

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
            <h3 className='text-lg sm:text-[50px]'>{title}</h3>
            <div className="w-full sm:mt-10 mt-2 flex justify-center">
                <div className='w-full'>
                    <Swiper
                        className="mySwiper"
                        autoplay={{
                            delay: delay,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={4}
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
                            <SwiperSlide key={i.name} className="flex">
                                <div
                                    className="relative flex justify-center items-center text-sm transition-all hover:text-[25px] text-white"
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >

                                    <Link className="absolute transition-opacity duration-300 z-10"
                                        href={`movie/${i.slug!}`}
                                        style={{ opacity: blur[index] ? 1 : 0 }}
                                    >
                                        Ver más
                                    </Link>
                                    <Image
                                        src={i.path}
                                        alt={`${i.name} image`}
                                        width={1920}
                                        height={1080}
                                        className={`object-cover filter transition-all sm:h-[180px] h-[80px] ${blur[index] ? 'blur-[12px]' : ''}`}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
