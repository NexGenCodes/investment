import Link from "next/link";
import styles from "../style/Home.module.css";
import FAQSection from "@/components/faq";
import Footer from "@/components/footer";
import WhyChooseUs from "@/components/whyChooseUs";
import Testimonial from "@/components/testimonial";
import AboutUs from "@/components/aboutUs";
import HowItWorks from "@/components/howItWorks";


export default async function Home() {
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
            href="/auth/register"
            className={styles.heroButton}
            aria-label="Get Started"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Existing About Section */}
      <AboutUs />

      {/* Existing How It Works Section */}
      <HowItWorks />

      {/* Updated Why Choose Us Section */}
      <WhyChooseUs />

      {/* Existing Testimonials Section */}
      <Testimonial />

      {/* Existing FAQ Section */}
      <FAQSection />

      {/* Existing Footer Section */}
      <Footer />
    </main>
  );
}
