'use client'

import { MovieForHomePage } from "@/app/core/entities/movies"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";
import "swiper/css";
interface Props {
    images: MovieForHomePage[]
}
export const ImagesSlider = ({ images }: Props) => {
    return (

        <Swiper
            className="mySwiper"
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            slidesPerView={3}
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
            style={{ marginTop: '20px' }}
        >
            <div className='w-full flex mt-2'>
                {
                    images.map((i) =>
                        <SwiperSlide key={i.name} className="flex">

                            <Image src={i.path}
                                width={1920}
                                key={i.path}
                                height={1080}
                                alt={i.name}
                                className={`object-cover filter transition-all h-[200px] w-full`}
                            // style={{ width: '300px' }}
                            />
                        </SwiperSlide>
                    )
                }
            </div>
        </Swiper>
    )
}
