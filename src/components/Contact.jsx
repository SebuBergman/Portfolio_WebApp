import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/Motion";

export default function Contact() {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  /*const handleChange = () => {

    setForm({...form, [name]: value, });
  };*/

  /*const handleSubmit = () => {
    //e.preventDefault();
    setLoading(true);
  }*/

  /*emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };*/

  return (
    <motion.div variants={textVariant()}>
      <div>
        <p>Get in touch</p>
        <h3>Contact</h3>
      </div>
    </motion.div>
  );
}