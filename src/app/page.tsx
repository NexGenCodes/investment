"use client";
import Image from "next/image";
import Link from "next/link";
import { TrendingDown, Zap } from "lucide-react";
import styles from "../style/Home.module.css";
import FAQSection from "../components/faq";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules
import { Autoplay } from "swiper/modules";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Existing Hero Section */}
      <section className={styles.hero}>
        <video autoPlay loop muted playsInline className={styles.heroVideo}>
          <source src="/video/hero-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Invest in a Sustainable Future</h1>
          <p>
            Join our community of forward-thinking investors and contribute to
            the growth of renewable energy.
          </p>
          <Link
            href="/register"
            className={styles.heroButton}
            aria-label="Get Started"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Existing About Section */}
      <section className={styles.aboutSection} id="aboutus">
        <div className={styles.aboutus}>
          <h1>About Us</h1>
        </div>
        <div className={styles.aboutImage}>
          <Image
            src="/images/img/about-img.jpg"
            alt="About Us"
            width={500}
            height={500}
            priority={false}
            loading="lazy"
          />
        </div>
        <div className={styles.aboutText}>
          <h2>SunVault Investments</h2>
          <p className={styles.aboutTextHighlight}>
            Invest in the Future with SunVault Investments
          </p>
          <p>
            At SunVault Investments, we offer individuals and institutions the
            opportunity to invest in high-quality solar energy projects.
          </p>
          <Link
            href="/investment"
            className={styles.ctaButton}
            aria-label="Explore Investment Opportunities"
          >
            Explore Investment Opportunities
          </Link>
        </div>
      </section>

      {/* Existing How It Works Section */}
      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.howItWorksContainer}>
          <div className={styles.howItWorksVideo}>
            <div className={styles.iframeContainer}>
              <iframe
                src="https://www.youtube.com/embed/mhzUk7pXFVg"
                title="How It Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.responsiveIframe}
              ></iframe>
            </div>
          </div>
          <div className={styles.stepsContainer}>
            {[
              {
                image: "/images/reg-removebg-preview (1).png",
                title: "Register",
                description: "Create an account in minutes.",
              },
              {
                image: "/images/dep-removebg-preview.png",
                title: "Deposit Funds",
                description: "Add funds securely to your account.",
              },
              {
                image: "/images/invest-removebg-preview.png",
                title: "Invest in Your Future",
                description: "Choose from a variety of solar projects.",
              },
            ].map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepIcon}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={80}
                    height={80}
                    priority={false}
                    loading="lazy"
                    className={styles.iconImage}
                  />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Why Choose Us Section */}
      <section className={styles.whyChooseUs}>
        <div className={styles.whyChooseUsContainer}>
          <div className={styles.whyChooseUsText}>
            <h2>Why Choose Us?</h2>
            <p className={styles.whyChooseUsDescription}>
            At SunVault Investments, we are committed to providing top-quality solar solutions that are efficient, cost-effective,
             and eco-friendly. Here’s why we are the best choice for your solar energy needs:
            </p>
            {/* Two Images with Text in a Row */}
            <div className={styles.iconRow}>
              <div className={styles.iconItem}>
                <div className={styles.iconContainer}>
                  <TrendingDown className={styles.icon_Img} />
                </div>
                <div className={styles.iconText}>
                  <h3> Lower Energy Costs</h3>
                </div>
              </div>

              <div className={styles.iconItem}>
                <div className={styles.iconContainer}>
                  <Zap className={styles.icon_Img} />
                </div>
                <div className={styles.iconText}>
                  <h3> Quick & Easy Installation </h3>
                </div>
              </div>
            </div>
            {/* Bottom Border */}
            <div className={styles.bottomBorder}></div>
            {/* Progress Bars Section */}
            <div className={styles.progressSection}>
              <div className={styles.progressItem}>
                <h3>High Efficiency Panels</h3>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `85%` }}
                  ></div>
                  <span style={{ left: `85%` }}>85%</span>
                </div>
              </div>

              <div className={styles.progressItem}>
                <h3>Sustainable & Eco-Friendly</h3>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `90%` }}
                  ></div>
                  <span style={{ left: `90%` }}>90%</span>
                </div>
              </div>

              <div className={styles.progressItem}>
                <h3>Trusted Experts</h3>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `95%` }}
                  ></div>
                  <span style={{ left: `95%` }}>95%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Layout on the Right */}
          <div className={styles.imageLayout}>
            <div className={styles.imageTop}>
              <Image
                src="/images/img/whychooseus.jpg" // Replace with your top image path
                alt="Top Image"
                width={500}
                height={300}
                priority={false}
                loading="lazy"
              />
            </div>
            <div className={styles.imageBottom}>
              <Image
                src="/images/img/whychooseus2.jpg" // Replace with your bottom image path
                alt="Why Choose Us"
                width={500}
                height={300}
                priority={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Existing Testimonials Section */}
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
          {[
            {
              avatar: "/images/img/TES1.jpeg",
              quote: "A top-notch platform for investors. Highly satisfied!",
              name: "Leila El-Mansouri",
              role: "Solar Energy Advocate",
            },
            // Add other testimonials here
          ].map((testimonial, index) => (
            <SwiperSlide key={index} className={styles.testimonial}>
              <div className={styles.testimonialAvatar}>
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  objectFit="cover"
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

      {/* Existing FAQ Section */}
      <FAQSection />

      {/* Existing Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <h3>Quick Links</h3>
            <Link href="#aboutus">About Us</Link>
            <Link href="/investments">Investments</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className={styles.newsletter}>
            <h3>Subscribe to Our Newsletter</h3>
            <p>
              Stay updated with the latest investment opportunities and news.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                aria-label="Enter your email"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            &copy; 2025 SunVualt Investments. All rights reserved.{" "}
            <Link href="/privacy" aria-label="Privacy Policy">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="/terms" aria-label="Terms & Conditions">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
