import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mt-20"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 text-white">
        <div className="grid md:grid-cols-3 gap-10 text-left">

          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-4 text-sm opacity-90">
              Providing premium stitching and garment management services
              since 1990.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p>📧 support@stitchtrack.com</p>
              <p>📞 +880 1234-567890</p>
              <p>📍 Chattogram, Bangladesh</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-bold text-xl mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link to="/" className="hover:underline">
                Home
              </Link>

              <Link to="/products" className="hover:underline">
                Products
              </Link>

              <Link to="/servicesection" className="hover:underline">
                Services
              </Link>

              <Link to="/login" className="hover:underline">
                Login
              </Link>

              <Link to="/Register" className="hover:underline">
                Register
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3
              className="font-bold text-xl mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              Follow Us
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-10 pt-6 text-center text-sm border-t"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          © {new Date().getFullYear()} Stitch Track. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;