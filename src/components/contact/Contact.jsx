import "./contact.scss";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from 'react-hot-toast';

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_069tnqb",
        "template_k9ajxqi",
        formRef.current,
        "waQ5U0JaLJVMzdW5t"
      )
      .then((result) => {
          setSuccess(true)
          toast.success("Message sent successfully!");
        }, (error) => {
          setError(true)
          toast.notifyError();
        }
      );
  };

  return (
  <motion.div
    id="Contact"
    className="contact"
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    ref={ref}  
  >
    <motion.div className="contactContainer" variants={variants}>
      <motion.h1 variants={variants}>Contact</motion.h1>
      <motion.div className="item" variants={variants}>
        <span>Email: <a href="mailto:sebu.bergman97@gmail.com">sebu.bergman97@gmail.com</a></span>
        <span>Location: Tampere, Finland</span>
      </motion.div>
    </motion.div>
    <motion.div className="socialIcons" variants={variants}>
      <a href="https://www.instagram.com/sebu.bersman/" target="_blank"><img src="/instagram_circle_logo.png" alt="Instagram" /></a>
      <a href="https://www.linkedin.com/in/sebastian-bergman-01061679/" target="_blank"><img src="/linkedIn_circle_logo.png" alt="LinkedIn logo" /></a>
      <a href="https://github.com/SebuBergman" target="_blank"><img src="/github-mark-white.png" alt="github_logo.png" /></a>
    </motion.div>
    <motion.div className="aboutContainer" variants={variants}>
      <motion.h6>Sebastian Bergman - Web developer and UX/UI designer</motion.h6>
      <motion.p>
        I'm Sebastian Bergman, a programmer with a Bachelor's degree in Business Information Technology from Haaga-Helia University of Applied Sciences.
        Through both academic and hands-on experience, I have honed my expertise in various programming languages,
        including <b>React</b>, <b>JavaScript</b>, <b>TypeScript</b>, <b>Java</b>, <b>Node.js</b>, and <b>Figma</b>.
        Additionally, I have gained valuable experience in project management methodologies such as <b>Scrum</b> and <b>Kanban</b>, 
        as well as <b>responsive website</b> and <b>user-centered design</b>.
      </motion.p>
      <motion.p>
        My passion for IT drives me to continuously improve my problem-solving skills and quickly adapt to new technologies.
        I am fluent in both English and Finnish, and I am eager to embrace new opportunities in the tech industry.
        Let’s connect and bring exciting projects to life together!
      </motion.p>
    </motion.div>
    <motion.div className="formContainer" variants={variants}>
      <motion.h3>Let's get in contact.</motion.h3>
      <motion.form
        ref={formRef}
        onSubmit={sendEmail}
      >
        <input type="text" required placeholder="Name" name="name"/>
        <input type="email" required placeholder="Email" name="email"/>
        <textarea rows={8} placeholder="Message" name="message" />
        <button>Send</button>
        {error}
        {success}
      </motion.form>
      <Toaster position="bottom-center" className="toastFlex"/>
    </motion.div>
  </motion.div>
  );
};

export default Contact;