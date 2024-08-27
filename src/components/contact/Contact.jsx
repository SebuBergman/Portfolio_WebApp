import "./contact.scss";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const Contact = ({ variants }) => {
  const [input, setInput] = useState({ name: "", email: "", msg: "" });
  const ref = useRef();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setloading(true);
    setSending(true);

    if (sending == true) {
      setSending(false);
      emailjs
        .sendForm("service_069tnqb", "template_k9ajxqi", formRef.current, "waQ5U0JaLJVMzdW5t")
        .then(
          (result) => {
            setSuccess(true);
            setInput({
              ...input,
              name: "",
              email: "",
              msg: "",
            });
            toast.success("Message sent successfully!");
          },
          (error) => {
            setError(true);
            toast.notifyError();
          }
        );
    }
    setTimeout(() => {
      setloading(false);
    }, 3000);
  };

  const handleChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

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
          <div className="contact_icons1">
            <img className="contact_icon" src="/mail.png" />
            <span>
              <a href="mailto:sebu.bergman97@gmail.com">sebu.bergman97@gmail.com</a>
            </span>
          </div>
          <div className="contact_icons2">
            <img className="contact_icon" src="/pin.png" />
            <span> Tampere, Finland</span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="socialIcons" variants={variants}>
        <a href="https://www.linkedin.com/in/sebastian-bergman-01061679/" target="_blank">
          <img src="/linkedIn_circle_logo.png" alt="LinkedIn logo" />
        </a>
        <a href="https://github.com/SebuBergman" target="_blank">
          <img src="/github-mark-white.png" alt="github_logo.png" />
        </a>
      </motion.div>
      <motion.div
        className="aboutContainer"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        ref={ref}
      >
        <motion.h6 variants={variants}>
          Sebastian Bergman - Web developer focused on Front-end development
        </motion.h6>
        <motion.p variants={variants}>
          I'm Sebastian Bergman, a programmer with a Bachelor's degree in Business Information
          Technology from Haaga-Helia University of Applied Sciences. Through both academic and
          hands-on experience, I have honed my expertise in various programming languages, including{" "}
          <b>React</b>, <b>JavaScript</b>, <b>TypeScript</b>, <b>Java</b>, <b>Node.js</b>, and{" "}
          <b>Figma</b>. Additionally, I have gained valuable experience in project management
          methodologies such as <b>Scrum</b> and <b>Kanban</b>, as well as <b>responsive website</b>{" "}
          and <b>user-centered design</b>.
        </motion.p>
        <motion.p variants={variants}>
          My passion for IT drives me to continuously improve my problem-solving skills and quickly
          adapt to new technologies. I am fluent in both English and Finnish, and I am eager to
          embrace new opportunities in the tech industry. Let’s connect and bring exciting projects
          to life together!
        </motion.p>
      </motion.div>
      <motion.div className="formContainer" variants={variants}>
        <motion.h3>Let's get in contact.</motion.h3>
        <motion.form ref={formRef} onSubmit={sendEmail}>
          <input
            type="text"
            required
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <textarea
            rows={8}
            placeholder="Message"
            name="msg"
            value={input.msg}
            onChange={handleChange}
          />
          <button>
            {loading ? (
              <ThreeDots color="#ffffff" height={30} width={30} wrapperClass="center_button" />
            ) : (
              <p className="send_buttonText">Send</p>
            )}
          </button>
          {error}
          {success}
        </motion.form>
        <Toaster
          position="bottom-center"
          className="toastFlex"
          toastOptions={{
            duration: 5000,
            style: {
              padding: "20px",
              "font-size": "24px",
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Contact;