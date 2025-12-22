import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import styles from "./index.module.css";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Carousel = (props) => {
  const { slides } = props;
  const [loadingStates, setLoadingStates] = useState(
    slides.reduce((acc, slide) => ({ ...acc, [slide.id]: true }), {})
  );
  const handleImageLoad = (slideId) => {
    setLoadingStates((prev) => ({ ...prev, [slideId]: false }));
  };
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div style={{ position: "relative" }}>
            {loadingStates[slide.id] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <div className={styles["spinner"]} />
              </div>
            )}
            <Image
              src={slide.image}
              alt="carousel-image"
              className={styles["carousel-image"]}
              width={912}
              height={576}
              quality={100}
              onLoad={() => handleImageLoad(slide.id)}
              style={{
                opacity: loadingStates[slide.id] ? 0.3 : 1,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          </div>
          <div className={styles["image-desc"]}>{slide.desc}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
