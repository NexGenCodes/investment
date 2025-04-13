// Define the SharePlatform interface
interface SharePlatform {
  name: string;
  href: (params: { message: string; url: string }) => string;
  getMessage: (params: { referralCode: string; baseUrl: string }) => string;
  ariaLabel: string;
}

// Define share platforms array
const sharePlatforms: SharePlatform[] = [
  {
    name: "WhatsApp",
    href: ({ message }) => `https://wa.me/?text=${message}`,
    getMessage: ({ referralCode, baseUrl }) =>
      `Hey! Join this awesome investment platform with my referral code ${referralCode} and start earning big! 🚀 Sign up now: ${baseUrl}?ref=${referralCode}`,
    ariaLabel: "Share on WhatsApp",
  },
  {
    name: "Facebook",
    href: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    getMessage: ({ referralCode, baseUrl }) =>
      `Ready to grow your wealth? Use my referral code ${referralCode} to join this incredible platform! 💰 Sign up today: ${baseUrl}?ref=${referralCode} #InvestSmart`,
    ariaLabel: "Share on Facebook",
  },
  {
    name: "Email",
    href: ({ message }) =>
      `mailto:?subject=${encodeURIComponent(
        "Unlock Wealth with My Exclusive Referral Code!"
      )}&body=${encodeURIComponent(message)}`,
    getMessage: ({ referralCode, baseUrl }) =>
      `Hi there,\n\nI’m excited to share an amazing investment platform! Use my referral code ${referralCode} to join and kickstart your financial journey. Sign up now: ${baseUrl}?ref=${referralCode}\n\nBest,\n[Your Name]`,
    ariaLabel: "Share via Email",
  },
];

export default sharePlatforms;
