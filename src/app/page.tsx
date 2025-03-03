import Image from "next/image";
import Link from "next/link";
import styles from "../style/Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <video autoPlay loop muted className={styles.heroVideo} playsInline>
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
        <div className={styles.scrollIndicator}></div>
      </section>

      <section className={styles.aboutSection}>
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

      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.howItWorksContainer}>
          <div className={styles.howItWorksImage}>
            <Image
              src="/images/how-it-works.png"
              alt="How It Works"
              width={500}
              height={800}
              priority={false}
              loading="lazy"
              className={styles.howItWorksImage}
            />
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

      <section className={styles.whyChooseUs}>
        <h2>Why Choose Us?</h2>
        <div className={styles.reasonsContainer}>
          {[
            {
              icon: "📊",
              title: "Low-Risk, High-Return Investments",
              description:
                "Diversify your portfolio with secure solar projects.",
            },
            {
              icon: "⏱️",
              title: "Real-Time Investment Data",
              description: "Track your investments with live updates.",
            },
            {
              icon: "🌍",
              title: "Sustainable Energy Growth",
              description:
                "Contribute to a greener planet while earning returns.",
            },
          ].map((reason, index) => (
            <div key={index} className={styles.reason}>
              <div className={styles.reasonIcon}>{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2>What Our Investors Say</h2>
        <div className={styles.testimonialsContainer}>
          {[
            {
              avatar: "/images/avator3.png",
              quote:
                "Great platform! I've seen consistent returns on my investments.",
              name: "John Doe",
              role: "Solar Investor",
            },
            {
              avatar: "/images/avator1-removebg-preview.png",
              quote: "Easy to use and transparent. Highly recommend!",
              name: "Jane Smith",
              role: "Renewable Energy Enthusiast",
            },
            {
              avatar: "/images/avator2.png",
              quote: "A fantastic way to invest in renewable energy.",
              name: "Mike Johnson",
              role: "Sustainability Advocate",
            },
          ].map((testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <div className={styles.testimonialAvatar}>
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  priority={false}
                  loading="lazy"
                />
              </div>
              <p>{testimonial.quote}</p>
              <h3>{testimonial.name}</h3>
              <div className={styles.testimonialRole}>{testimonial.role}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <h3>Quick Links</h3>
            <Link href="/about">About Us</Link>
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
              <input type="email" placeholder="Enter your email" required />
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
