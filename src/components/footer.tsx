"use client";

import Link from "next/link";
import styles from "../style/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <h3>Quick Links</h3>
          <Link href="#aboutus">About Us</Link>
          <Link href="/investments">Investments</Link>
        </div>
        <div className={styles.newsletter}>
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated with the latest investment opportunities and news.</p>
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
  );
}
