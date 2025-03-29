import styles from "../style/Home.module.css";
import Image from "next/image";

export default function HowItWorks() {
  return (
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
  );
}
