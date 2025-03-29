import { TrendingDown, Zap } from "lucide-react";
import styles from "../style/Home.module.css";
import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.whyChooseUsContainer}>
        <div className={styles.whyChooseUsText}>
          <h2>Why Choose Us?</h2>
          <p className={styles.whyChooseUsDescription}>
            At SunVault Investments, we are committed to providing top-quality
            solar solutions that are efficient, cost-effective, and
            eco-friendly. Here’s why we are the best choice for your solar
            energy needs:
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
  );
}
