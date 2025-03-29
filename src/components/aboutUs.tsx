import Image from "next/image";
import Link from "next/link";
import styles from "../style/Home.module.css";

export default function AboutUs() {
  return (
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
  );
}
