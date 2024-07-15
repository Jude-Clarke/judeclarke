import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';
import styles from "./index.module.css";
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";


const Carousel = (props) => {
    const { slides } = props;
  return (
    <Swiper
    //install Swiper modules
    modules={[Navigation, Pagination, A11y]}
    spaceBetween={0}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    onSlideChange={() => console.log("slide change")}
    onSwiper={(swiper) => console.log(swiper)}
    >
        {slides.map(slide => 
            <SwiperSlide key={slide.id}>
                <Image src={slide.image} alt="carousel-image" className={styles["carousel-image"]} width={760}
  height={480} quality={100}/>
                <div className={styles["image-desc"]}>{slide.desc}</div>
            </SwiperSlide>
        )}
    </Swiper>
  );
};

export default Carousel