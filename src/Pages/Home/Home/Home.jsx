import React from "react";
import Banner from "../Banner/Banner";
import Services from "../../../Components/Services/Services";
import Brands from "../Brands/Brands";
import Reviews from "./Reviews/Reviews";
import Products from "../../../Components/Products/Products";

import Counter from "../../../Components/ui/Counter";
import { FadeUp } from "../../../Components/ui/Motion";
import TimelineItem from "../../../Components/ui/TimelineItem";
import WhyChooseUs from "../../../Components/WhyChooseUs/WhyChooseUs";

const reviewsPromise = fetch("/Public.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="w-full">

      {/* 1. HERO SECTION */}
      <section className="h-[70vh] flex items-center">
        <Banner />
      </section>

      {/* 2. STATS / COUNTERS */}
      <FadeUp>
        <section className="py-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Counter end={120} label="Products" color="#FF62BB" />
          <Counter end={50} label="Services" color="#B331F1" />
          <Counter end={1000} label="Users" color="#FF97D0" />
          <Counter end={24} label="Support Hours" color="#FF62BB" />
        </section>
      </FadeUp>

      {/* 3. FEATURES SECTION (NEW) */}
      <FadeUp>
  <section className="py-16 text-center px-4">
    <WhyChooseUs />
  </section>
</FadeUp>

      {/* 4. SERVICES */}
      <FadeUp>
        <section className="py-12">
          <Services />
        </section>
      </FadeUp>

      {/* 5. HOW IT WORKS (NEW) */}
     <FadeUp>
  <section className="py-16 text-center">
    <h2 className="text-2xl font-bold mb-10">How It Works</h2>

    <div className="relative border-l-2 border-gray-300 dark:border-gray-600 ml-6">

      <TimelineItem
        title="Choose Product"
        desc="Select your desired product from our catalog"
      />

      <TimelineItem
        title="Place Order"
        desc="Confirm your order with secure checkout"
      />

      <TimelineItem
        title="Get Delivery"
        desc="Receive your product at your doorstep"
      />

    </div>
  </section>
</FadeUp>

      {/* 6. PRODUCTS */}
      <FadeUp>
        <section className="py-12">
          <Products />
        </section>
      </FadeUp>

      {/* 7. BRANDS */}
      <FadeUp>
        <section className="py-12">
          <Brands />
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

          <button className="px-6 py-3 rounded-xl bg-[#FF62BB] text-white font-medium">
            Get Started Now
          </button>
        </section>
      </FadeUp>

    </div>
  );
};

export default Home;