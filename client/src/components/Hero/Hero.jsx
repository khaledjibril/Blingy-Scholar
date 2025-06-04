import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import styles from './Hero.module.css';

const images = [
  '/BlingyScholar-Hero.jpg',
  '/BlingyScholar-Hero2.jpg',
  '/BlingyScholar-Hero3.jpg',
  '/BlingyScholar-Hero01.png',
  '/BlingyScholar-Hero02.png'
];

const Hero = () => {
  return (
    <section className={styles.heroWrapper} aria-label="Hero banner">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className={styles.heroSwiper}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={styles.hero}
              style={{
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className={styles.overlay}></div>
              <div className={styles.content}>
                <h1>Your Scholarship Journey Starts Here – Get Funded Like a Pro!</h1>
                <p className={styles.centeredParagraph}>
                  Free templates, success stories, and step-by-step guides to win scholarships for undergrad and postgraduate studies.
                </p>
                <p className={styles.socialProof}>
                  <span role="img" aria-label="star">🌟</span>
                  &nbsp;Trusted by 12,000+ students worldwide
                </p>
                <div className={styles.buttonGroup}>
                  <a href="/guides" className={styles.btnPrimary}>Explore Free Guides</a>
                  <a href="/scholarships" className={styles.btnSecondary}>Find Scholarships</a>
                </div>
              </div>
              <div className={styles.scrollDown}>
                <span>↓</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;