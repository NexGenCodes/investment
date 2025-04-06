interface Testimony {
  avatar: string;
  quote: string;
  name: string;
  role: string;
}

const Testimonies: Testimony[] = [
  {
    avatar: "/images/img/TES1.jpeg",
    quote: "A top-notch platform for investors. Highly satisfied!",
    name: "Leila El-Mansouri",
    role: "Solar Energy Advocate",
  },

  // Add other testimonials here
];

export const whatPeopleSay = [
    {
      name: "Ollie Hunter",
      message:
        "I earned ₦40,000 in just a month by referring friends. It's so easy!",
    },
    {
      name: "Mckenzie Dom",
      message: "The referral program is a game-changer. Highly recommend it!",
    },
  ]

export default Testimonies;
