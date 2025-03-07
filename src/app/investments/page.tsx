"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // For arrow icons

// Constants for repeated values
const COLORS = {
  gold: "rgb(255,215,0)",
  gray: "rgb(229,231,235)",
  white: "rgb(255,255,255)",
};

const riskColors: { [key: string]: string } = {
  Low: `bg-[${COLORS.gold}] text-gray-900`,
  Medium: "bg-[rgb(30,58,138)] text-white",
  High: "bg-red-500 text-white",
};

interface Investment {
  id: string;
  name: string;
  expectedReturns: number;
  riskLevel: string;
  imageUrl: string;
  description: string;
  duration: string;
  grossReturn: number;
  netReturn: number;
}

const investments: Investment[] = [
  {
    id: "1",
    name: "First Solar",
    expectedReturns: 12,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar.jpg",
    description:
      "A leader in solar panel manufacturing with sustainable solutions.",
    duration: "4 Weeks",
    grossReturn: 50,
    netReturn: 45,
  },
  {
    id: "2",
    name: "Enphase Energy",
    expectedReturns: 18,
    riskLevel: "Medium",
    imageUrl: "/images/investments/solar1.jpg",
    description: "Specializes in advanced solar inverters and energy storage.",
    duration: "6 Weeks",
    grossReturn: 45,
    netReturn: 40.5,
  },
  {
    id: "3",
    name: "SunPower Corporation",
    expectedReturns: 15,
    riskLevel: "High",
    imageUrl: "/images/investments/solar2.jpg",
    description:
      "Provides high-efficiency solar panels for residential and commercial use.",
    duration: "8 Weeks",
    grossReturn: 45,
    netReturn: 40.5,
  },
  {
    id: "4",
    name: "SolarEdge Technologies",
    expectedReturns: 10,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar3.jpg",
    description:
      "Develops smart energy solutions for efficient power conversion.",
    duration: "12 Weeks",
    grossReturn: 50,
    netReturn: 45,
  },
  {
    id: "5",
    name: "Brookfield Renewable",
    expectedReturns: 20,
    riskLevel: "Medium",
    imageUrl: "/images/investments/solar4.jpg",
    description: "Invests in solar and wind farms for a greener future.",
    duration: "14 Weeks",
    grossReturn: 50,
    netReturn: 45,
  },
  {
    id: "6",
    name: "Tesla Solar",
    expectedReturns: 25,
    riskLevel: "High",
    imageUrl: "/images/investments/solar5.jpg",
    description:
      "Pioneering solar technology with energy-efficient solar roofs and storage.",
    duration: "16 Weeks",
    grossReturn: 50,
    netReturn: 45,
  },
  {
    id: "7",
    name: "NextEra Energy, Inc. (NEE)",
    expectedReturns: 10,
    riskLevel: "Medium",
    imageUrl: "/images/investments/solar6.jpg",
    description:
      "NextEra Energy, Inc. is a global leader in renewable energy, specializing in solar and wind power generation.",
    duration: "10–20 years",
    grossReturn: 8-12,
    netReturn: 6-10,
  },
];

// Reusable InvestmentCard Component
interface InvestmentCardProps {
  investment: Investment;
  isFeatured?: boolean;
}

const InvestmentCard = ({
  investment,
  isFeatured = false,
}: InvestmentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        isFeatured
          ? "relative w-full h-96 md:h-64 rounded-2xl overflow-hidden shadow-lg"
          : "bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden p-5 transition-transform duration-300 hover:scale-105 flex flex-col justify-between h-full"
      }`}
    >
      {/* Image */}
      <div
        className={`${
          isFeatured
            ? "absolute inset-0"
            : "w-full h-48 relative rounded-xl overflow-hidden"
        }`}
      >
        <Image
          src={investment.imageUrl}
          alt={investment.name}
          layout="fill"
          objectFit="cover"
          className="transition duration-500 hover:scale-110"
          priority={isFeatured} // Prioritize loading for featured image
        />
      </div>

      {/* Investment Details */}
      <div
        className={`${
          isFeatured
            ? "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-start p-6"
            : "p-5 text-center flex flex-col flex-grow"
        }`}
      >
        <h2
          className={`${
            isFeatured ? "text-3xl md:text-2xl" : "text-lg md:text-2xl"
          } font-bold text-white mb-2`}
        >
          {investment.name}
        </h2>
        <p className="text-gray-300 text-sm mb-2 italic">
          {investment.description}
        </p>
        <p className="text-gray-300 text-sm">
          Expected Returns: {investment.expectedReturns}%
        </p>
        <p className="text-gray-300 text-sm flex items-center">
          Risk Level:
          <span
            className={`px-3 py-1 rounded-lg text-xs font-semibold ml-2 ${
              riskColors[investment.riskLevel]
            }`}
          >
            {investment.riskLevel}
          </span>
        </p>

        {/* View More Button */}
        <Link href={`/investments/${investment.id}`}>
          <button
            className={`mt-4 px-6 py-2 bg-[rgb(255,215,0)] text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-200 hover:text-gray-900 transition duration-300 shadow-md`}
            aria-label={`View more about ${investment.name}`}
          >
            View More
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

// Define the type for custom arrow props
interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Custom Arrow Components for Slick Carousel
const CustomPrevArrow = ({ className, style, onClick }: CustomArrowProps) => {
  return (
    <div
      className={`${className} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/30 backdrop-blur-lg rounded-full p-3 cursor-pointer hover:bg-white/50 transition duration-300`}
      style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClick}
    >
      <FaChevronLeft className="text-white text-2xl" /> {/* Increase icon size */}
    </div>
  );
};

const CustomNextArrow = ({ className, style, onClick }: CustomArrowProps) => {
  return (
    <div
      className={`${className} absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/30 backdrop-blur-lg rounded-full p-3 cursor-pointer hover:bg-white/50 transition duration-300`}
      style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClick}
    >
      <FaChevronRight className="text-white text-2xl" /> {/* Increase icon size */}
    </div>
  );
};

export default function InvestmentsPage() {
  const featuredInvestments = investments.slice(0, 1);
  const regularInvestments = investments.slice(1); // Remaining investments

  // Slick Carousel settings
  const settings = {
    dots: true, // Show pagination dots
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    arrows: true, // Show navigation arrows
    autoplay: true, // Autoplay the carousel
    autoplaySpeed: 3000, // Autoplay speed in milliseconds
    fade: true, // Use fade animation instead of slide
    prevArrow: <CustomPrevArrow />, // Custom previous arrow
    nextArrow: <CustomNextArrow />, // Custom next arrow
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-[70px] text-center min-h-screen flex flex-col pb-8">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
        Invest in Solar Innovation – Own a Piece of the Future
      </h1>
      <p className="text-sm md:text-base text-gray-300 mb-8 px-4 italic">
        Choose a solar equipment part to invest in and earn up to 50% returns as
        we manufacture and sell it globally. Returns are subject to a 10%
        withholding tax.
      </p>

      {/* Featured Investment Section */}
      <div className="space-y-6 pb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
          Featured Investment
        </h2>
        {featuredInvestments.map((investment) => (
          <InvestmentCard
            key={investment.id}
            investment={investment}
            isFeatured
          />
        ))}
      </div>

      {/* Regular Investment Cards (Slick Carousel on Mobile) */}
      <div className="block md:hidden relative px-8"> {/* Add padding and relative positioning */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
          Our Plan Cards
        </h2>
        <p className="text-sm md:text-base text-gray-300 mb-8 px-4 italic">
          Explore our investment plans tailored for sustainable growth.
        </p>
        <Slider {...settings}>
          {regularInvestments.map((investment) => (
            <div key={investment.id} className="px-2">
              <InvestmentCard investment={investment} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Regular Investment Cards (Grid on Desktop) */}
      <div className="hidden md:block">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
          Our Plan Cards
        </h2>
        <p className="text-sm md:text-base text-gray-300 mb-8 px-4 italic">
          Explore our investment plans tailored for sustainable growth.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
          {regularInvestments.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </div>
      </div>
    </div>
  );
}