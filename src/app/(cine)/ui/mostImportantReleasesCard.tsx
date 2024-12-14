'use client'
import Image from 'next/image';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


export const MostImportantReleasesCard = () => {
    const imagesReleases = [
        { name: "avengers", path: "/images/avengers.jpg" },
        { name: "Godzilla", path: "/images/Godzilla.jpg" },
        { name: "Venom", path: "/images/Venom.jpg" },
    ];
    return (
        <div className='p-10'>


            <h3 className='text-[50px]'>Últimos lanzamientos</h3>
            <div className="h-[500px] w-full mt-10 flex  justify-center">
                <div className='w-[70%] sm:w-[900px] '>


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
                    >
                        {imagesReleases.map((i) => (
                            <SwiperSlide key={i.name} className="flex ">
                                <Image
                                    src={i.path}
                                    alt={`${i.name} image`}
                                    width={1920}
                                    height={1080}
                                    objectFit='cover'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div >
        </div>
    )
}
