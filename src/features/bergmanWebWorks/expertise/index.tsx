import { useRef } from "react";
import { motion, Variants } from "framer-motion";

// Import styles
import "./styles.scss";

// Optional: If you want strict typing, specify the type for the variants prop
interface ExpertiseProps {
  variants: Variants; // from framer-motion, or use 'any' if you want to be more flexible
}

export default function Expertise({ variants }: ExpertiseProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      id="expertise"
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="expertiseContainer" variants={variants} ref={ref}>
        <motion.div className="title">
          <h1>My Expertise</h1>
        </motion.div>
        <div className="boxContainer">
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="desktop.svg" alt="desktop icon" />
              <h5>
                <span className="heading-underline-blue">Software</span>
                <br />
                Development
              </h5>
            </div>
            <div className="textContainer">
              <div className="textWrapper">
                <p>
                  From concept to deployment, I provide robust software
                  solutions using both functional and object-oriented
                  programming. I work with Java, JavaScript, TypeScript, and
                  Python to build scalable apps that meet real-world needs
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="react.svg" alt="react icon" />
              <h5>
                <span className="heading-underline-orange">Frontend</span>
                <br />
                Excellence
              </h5>
            </div>
            <div className="textContainer">
              <div className="textWrapper">
                <p>
                  I specialize in React and Vite, delivering fast, interactive
                  user interfaces. My expertise in HTML, CSS, JS, and TS ensures
                  your website is beautiful, accessible, and responsive across
                  all devices
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="responsive.svg" alt="computer and mobile screen icon" />
              <h5>
                <span className="heading-underline-rose">UI/UX</span>
                <br />
                Design
              </h5>
            </div>
            <div className="textContainer">
              <div className="textWrapper">
                <p>
                  With Figma and user-centered design principles, I create
                  interfaces that are both intuitive and visually
                  engaging—ensuring your users love using your product
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="boxWrapper" variants={variants}>
            <div className="headingWrapper">
              <img src="responsive.svg" alt="computer and mobile screen icon" />
              <h5>
                <span className="heading-underline-rose">Backend &</span>
                <br />
                APIs
              </h5>
            </div>
            <div className="textContainer">
              <div className="textWrapper">
                <p>
                  Need powerful integrations or custom business logic? I build
                  APIs with FastAPI and Node.js, connect to modern databases
                  like MongoDB, and can integrate with external services such as
                  OpenAI
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div variants={variants} className="expertiseList">
          <motion.ul variants={variants}>
            <motion.li variants={variants}>
              A website tailored to your brand and business goals
            </motion.li>
            <motion.li variants={variants}>
              Responsive design for mobile, tablet, and desktop
            </motion.li>
            <motion.li variants={variants}>
              Fast load times and SEO best practices
            </motion.li>
            <motion.li variants={variants}>
              Easy content management and future scalability
            </motion.li>
            <motion.li variants={variants}>
              Personal support and clear communication throughout your project
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
