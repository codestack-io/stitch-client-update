import React from "react";
import logo from "../../assets/serve.jpg";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "../ui/Motion";

const services = [
  {
    title: "Classic Designing",
    desc: "Standard apparel manufacturing workflow",
  },
  {
    title: "Well Monitoring",
    desc: "Real-time production monitoring system",
  },
  {
    title: "Secure Finishing",
    desc: "Reliable final quality assurance process",
  },
  {
    title: "Pricing System",
    desc: "Uniform pricing across all items",
  },
  {
    title: "Safe Delivery",
    desc: "Track shipment and delivery status",
  },
  {
    title: "Parcel Return",
    desc: "Easy and fast return process",
  },
];

const Services = () => {
  return (
    <section className="w-full py-16 px-4 md:px-12 bg-[#FFF7FB] dark:bg-gray-900">

      {/* HEADER */}
      <FadeUp>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            Our Services <ArrowRight className="text-[#FF62BB]" />
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            We are always concerned with delivering high-quality products
            with perfect finishing and customer satisfaction.
          </p>
        </div>
      </FadeUp>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((item, index) => (
          <FadeUp key={index}>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300">

              {/* ICON */}
              <div className="w-12 h-12 rounded-xl bg-[#FF97D0] flex items-center justify-center mb-4">
                <img src={logo} className="w-6 h-6" alt="service" />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {item.desc}
              </p>

              {/* CTA INDICATOR */}
              <div className="mt-4 text-sm text-[#FF62BB] font-medium flex items-center gap-1">
                Learn more <ArrowRight size={16} />
              </div>

            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

export default Services;