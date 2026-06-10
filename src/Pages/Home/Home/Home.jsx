import React from "react";
import Banner from "../Banner/Banner";
import Services from "../../../Components/Services/Services";
import Brands from "../Brands/Brands";
import Reviews from "./Reviews/Reviews";
import Products from "../../../Components/Products/Products";
import { Link } from "react-router-dom";
import Counter from "../../../Components/ui/Counter";
import { FadeUp } from "../../../Components/ui/Motion";
import TimelineItem from "../../../Components/ui/TimelineItem";
import { useState } from "react";
import StatsSection from "../../../Components/Stats/StatsSection";
import HowItWorks from "../../../Components/HowItWorks/HowItWorks";



const reviewsPromise = fetch("/Public.json").then((res) => res.json());

const Home = () => {
    const [selectedBrand, setSelectedBrand] = useState("all");
  return (
    <div className="w-full">

      {/* 1. HERO SECTION */}
      <section className="h-[70vh] flex items-center">
        <Banner />
      </section>

      {/* 2. STATS / COUNTERS */}
      <FadeUp>
        
         <StatsSection></StatsSection>
        
      </FadeUp>

      {/* 3. FEATURES SECTION (NEW) */}
      <FadeUp>
  <section className="py-16 text-center px-4">
    
  </section>
</FadeUp>

      {/* 4. SERVICES */}
      <FadeUp>
        <section className="py-12">
          <Services />
        </section>
      </FadeUp>

      {/* 5. HOW IT WORKS (NEW) */}
   
   <HowItWorks></HowItWorks>
  
   

      {/* 6. PRODUCTS */}
      <FadeUp>
        <section className="py-12">
          <Products onSelectBrand={setSelectedBrand} />
        </section>
      </FadeUp>

    {/* 7. BRANDS */}
<FadeUp>
  <section className="py-16 px-4 relative overflow-hidden">

    {/* BACKGROUND GLOW (ONLY YOUR COLORS) */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FF62BB]/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#B331F1]/20 blur-3xl rounded-full"></div>
    </div>

    {/* MAIN CARD */}
    <div className="relative max-w-6xl mx-auto bg-white/70 dark:bg-[#0F172A]/40 backdrop-blur-xl border border-[#FF97D0]/30 rounded-3xl shadow-xl p-8">

      {/* TITLE */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white">
          Explore Our Brands
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Choose your favorite brand and discover premium products
        </p>
      </div>

      {/* BRANDS */}
      <Brands onSelectBrand={setSelectedBrand} />

    </div>
  </section>
</FadeUp>

      {/* 8. TESTIMONIALS */}
      <FadeUp>
        <section className="py-12">
          <Reviews reviewsPromise={reviewsPromise} />
        </section>
      </FadeUp>

      {/* 9. NEWSLETTER (NEW REQUIRED SECTION) */}
      <FadeUp>
        <section className="py-16 text-center bg-[#FFF7FB] dark:bg-gray-900">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Subscribe for latest updates
          </p>

          <div className="flex justify-center gap-2 flex-wrap">
            <input
              className="px-4 py-2 rounded-xl border dark:bg-gray-800"
              placeholder="Enter email"
            />
            <button className="px-4 py-2 rounded-xl bg-[#FF62BB] text-white">
              Subscribe
            </button>
          </div>
        </section>
      </FadeUp>

      {/* 10. CALL TO ACTION (FINAL SECTION) */}
      <FadeUp>
  <section className="py-20 text-center">
    <h2 className="text-3xl font-bold mb-4">
      Ready to Get Started?
    </h2>

    <p className="mb-6 text-gray-600 dark:text-gray-300">
      Join thousands of users using our platform
    </p>

    <Link to="/Register">
      <button className="px-6 py-3 rounded-xl bg-[#FF62BB] text-white font-medium">
        Get Started Now
      </button>
    </Link>
  </section>
</FadeUp>

    </div>
  );
};

export default Home;