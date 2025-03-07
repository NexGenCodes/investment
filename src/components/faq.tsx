import { useState } from "react";
import Link from "next/link";
import styles from "../style/Home.module.css"; // Ensure the path is correct

// Define the type for FAQ items
type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "How do I start investing?",
      answer: "Simply register, deposit funds, and choose a solar project to invest in.",
    },
    {
      question: "What returns can I expect?",
      answer: "Returns vary by project, but we aim for competitive and sustainable growth.",
    },
    {
      question: "Is my investment secure?",
      answer: "Yes, all investments are backed by real solar projects with risk mitigation strategies.",
    },
  ];

  return (
    <section className={styles.faqSection}>
      <h2>Frequently Asked Questions</h2>
      <div className={styles.faqContainer}>
        {faqs.map((faq, index: number) => (
          <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.open : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <h3>
              {faq.question}
              <span className={styles.icon}>{openIndex === index ? "−" : "+"}</span>
            </h3>
            <p className={styles.faqAnswer}>{faq.answer}</p>
          </div>
        ))}
      </div>
      <Link href="/faq" className={styles.faqLink}>
        View More FAQs
      </Link>
    </section>
  );
}
