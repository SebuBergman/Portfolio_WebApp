import { useRef } from "react";
import { motion, Variants } from "framer-motion";

// Import styles
import "./styles.scss";

// Optional: If you want strict typing, specify the type for the variants prop
interface ExpertiseProps {
  variants: Variants; // from framer-motion, or use 'any' if you want to be more flexible
}

export default function Packages({ variants }: ExpertiseProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      id="packages-prices"
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="expertiseContainer" variants={variants} ref={ref}>
        <motion.div className="title">
          <h1>Packages and Pricing</h1>
        </motion.div>
        <div className="boxContainer">
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="desktop.svg" alt="desktop icon" />
              <h5>
                <span className="heading-underline-blue">Simple One-Page</span>
                <br />
                Website
              </h5>
            </div>
            <div className="priceContainer">
              <div className="priceWrapper">
                <p>
                  Custom responsive design
                  <br />
                  Contact form
                  <br />
                  Basic SEO | €450
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="react.svg" alt="react icon" />
              <h5>
                <span className="heading-underline-orange">WordPress +</span>
                <br />
                WooCommerce Website
              </h5>
            </div>
            <div className="priceContainer">
              <div className="priceWrapper">
                <p>
                  Full setup & configuration
                  <br />
                  Custom theme
                  <br />
                  Up to 10 products | €1000
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="responsive.svg" alt="computer and mobile screen icon" />
              <h5>
                <span className="heading-underline-rose">Advanced Custom</span>
                <br />
                Web Application
              </h5>
            </div>
            <div className="priceContainer">
              <div className="priceWrapper">
                <p>
                  Full-stack development
                  <br />
                  Custom features & integrations
                  <br />
                  Admin dashboard | from €2000
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
