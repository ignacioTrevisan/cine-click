'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";
import "swiper/css";

interface Props {
    images: string[]
}
export const Slider = ({ images }: Props) => {
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

            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}

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

            {
                images.map((i) =>
                    <SwiperSlide key={i} className="flex">

                        <Image src={i}
                            width={200}
                            key={i}
                            height={200}
                            alt={i}

                        // style={{ width: '300px' }}
                        />
                    </SwiperSlide>
                )
            }

        </Swiper>
    )
}
