import "./contact.scss";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from 'react-hot-toast';

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
  <motion.div className="contact">
    <motion.div className="textContainer" variants={variants}>
        <motion.h1 variants={variants}>Want to get in touch?</motion.h1>
        <motion.h2 variants={variants}>I am open to work!</motion.h2>
        <motion.div className="item" variants={variants}>
          <h3>Email</h3>
          <span>sebu.bergman97@gmail.com</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h3>Location</h3>
          <span>Tampere, Finland</span>
        </motion.div>
      </motion.div>
      <motion.div className="formContainer">
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
        >
          <input type="text" required placeholder="Name" name="name"/>
          <input type="email" required placeholder="Email" name="email"/>
          <textarea rows={8} placeholder="Message" name="message" />
          <button>Submit</button>
          {error}
          {success}
          <Toaster position="bottom-center" />
        </motion.form>
      </motion.div>
  </motion.div>
  );
};

export default Contact;