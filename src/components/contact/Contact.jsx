import "./contact.scss";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
//import emailjs from "@emailjs/browser";

const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  //const [error, setError] = useState(false);
  //const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    /*emailjs
      .sendForm(
        "service_94y20xo",
        "template_v10u2oh",
        formRef.current,
        "pX_2hasGmGcuvjXIW"
      )
      .then(
        (result) => {
          setSuccess(true)
        },
        (error) => {
          setError(true);
        }
      );*/
  };

  return (
  <motion.div className="contact">
    <motion.div className="textContainer" variants={variants}>
        <motion.h1 variants={variants}>Want to get in touch?</motion.h1>
        <motion.div className="item" variants={variants}>
          <h2>Email</h2>
          <span>sebu.bergman97@gmail.com</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Location</h2>
          <span>Tampere, Finland</span>
        </motion.div>
      </motion.div>
      <motion.div className="formContainer">
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
        >
          <input type="text" required placeholder="Name" />
          <input type="email" required placeholder="Email" />
          <textarea rows={8} placeholder="Message"></textarea>
          <button>Submit</button>
        </motion.form>
      </motion.div>
  </motion.div>
  );
};

export default Contact;