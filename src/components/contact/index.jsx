import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

// Import styles
import "./styles.scss";

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
        .sendForm(
          "service_069tnqb",
          "template_k9ajxqi",
          formRef.current,
          "waQ5U0JaLJVMzdW5t"
        )
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
          <div className="contact_icons">
            <img className="contact_icon" src="/mail.png" alt="mail icon" />
            <span>
              <a href="mailto:sebu.bergman97@gmail.com">
                sebu.bergman97@gmail.com
              </a>
            </span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="socialIcons" variants={variants}>
        <a
          href="https://www.linkedin.com/in/sebastian-bergman-01061679/"
          target="_blank"
        >
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
          Hi! I’m Sebastian Bergman, a developer with a Bachelor's degree in
          Business Information Technology from Haaga-Helia University of Applied
          Sciences. I specialize in front-end development with <b>React</b>,{" "}
          <b>JavaScript</b> and <b>TypeScript</b>, but I'm also growing my
          full-stack capabilities with technologies like
          <b>MongoDB</b>, <b>FastAPI</b>, and <b>OpenAI APIs</b>.
        </motion.p>
        <motion.p variants={variants}>
          I’ve worked on diverse projects ranging from sustainability platforms
          and mobile apps to AI agents and small business websites. My toolbox{" "}
          includes <b>React</b>, <b>JavaScript/TypeScript</b>, <b>Java</b>,{" "}
          <b>Python</b>, and <b>Node.js</b>, and I’m comfortable using{" "}
          <b>Figma</b> for <b>UI/UX design</b>. I also have hands-on experience
          with <b>Scrum</b>, <b>Kanban</b>, and deploying assets with{" "}
          <b>Amazon S3</b>.
        </motion.p>
        <motion.p variants={variants}>
          Fluent in both English and Finnish, I’m always eager to learn new
          tools and tackle new challenges. Let’s connect and bring your next
          idea to life!
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
              <ThreeDots
                color="#ffffff"
                height={30}
                width={30}
                wrapperClass="center_button"
              />
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
