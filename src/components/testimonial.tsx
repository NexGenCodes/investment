"use client";

import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Testimonies from "@/constants/testimony";
import styles from "../style/Home.module.css";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className={styles.testimonials}>
      <h2>What Our Investors Say</h2>
      <Swiper
        className={styles.testimonialsContainer}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 20 },
          1024: { slidesPerView: 1, spaceBetween: 30 },
        }}
      >
        {Testimonies.map((testimonial, index) => (
          <SwiperSlide key={index} className={styles.testimonial}>
            <div className={styles.testimonialAvatar}>
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={100}
                height={100}
                priority={false}
                loading="lazy"
              />
            </div>
            <p>{testimonial.quote}</p>
            <h3>{testimonial.name}</h3>
            <div className={styles.testimonialRole}>{testimonial.role}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
