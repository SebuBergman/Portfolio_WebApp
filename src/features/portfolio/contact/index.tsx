import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { motion, Variants } from "motion/react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

// Import styles
import "./styles.scss";

// Props interface for variants
interface ContactProps {
  sectionContainer: Variants;
  sectionItem: Variants;
}

interface InputState {
  name: string;
  email: string;
  msg: string;
}

export default function Contact({
  sectionContainer,
  sectionItem,
}: ContactProps) {
  const [input, setInput] = useState<InputState>({
    name: "",
    email: "",
    msg: "",
  });
  const ref = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSending(true);

    if (sending === true) {
      setSending(false);
      emailjs
        .sendForm(
          "service_069tnqb",
          "template_k9ajxqi",
          formRef.current as HTMLFormElement,
          "waQ5U0JaLJVMzdW5t"
        )
        .then(
          () => {
            setSuccess(true);
            setInput({ name: "", email: "", msg: "" });
            toast.success("Message sent successfully!");
          },
          () => {
            setError(true);
            toast.error("Failed to send message.");
          }
        );
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  return (
    <motion.div
      id="Contact"
      className="contact"
      variants={sectionContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="contactContainer" variants={sectionContainer}>
        <motion.h1 variants={sectionItem}>Contact</motion.h1>
        <motion.div className="item" variants={sectionItem}>
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
      <motion.div className="socialIcons" variants={sectionItem}>
        <a
          href="https://www.linkedin.com/in/sebastian-bergman-01061679/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/linkedIn_circle_logo.png" alt="LinkedIn logo" />
        </a>
        <a
          href="https://github.com/SebuBergman"
          target="_blank"
          rel="noopener noreferrer"
        >
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
        <motion.h6 variants={sectionItem}>
          Sebastian Bergman - Software developer focused on Full-stack
          development
        </motion.h6>
        <motion.p variants={sectionItem}>
          Hi! I’m Sebastian Bergman, a developer with a Bachelor's degree in
          Business Information Technology from Haaga-Helia University of Applied
          Sciences. I specialize in front-end development with <b>React</b>,{" "}
          <b>JavaScript</b> and <b>TypeScript</b>, but I'm also growing my
          full-stack capabilities with technologies like <b>MongoDB</b>,{" "}
          <b>FastAPI</b>, and <b>OpenAI APIs</b>.
        </motion.p>
        <motion.p variants={sectionItem}>
          I’ve worked on diverse projects ranging from sustainability platforms
          and mobile apps to AI agents and small business websites. My toolbox{" "}
          includes <b>React</b>, <b>JavaScript/TypeScript</b>, <b>Java</b>,{" "}
          <b>Python</b>, and <b>Node.js</b>, and I’m comfortable using{" "}
          <b>Figma</b> for <b>UI/UX design</b>. I also have hands-on experience
          with <b>Scrum</b>, <b>Kanban</b>, and deploying assets with{" "}
          <b>Amazon S3</b>.
        </motion.p>
        <motion.p variants={sectionItem}>
          Fluent in both English and Finnish, I’m always eager to learn new
          tools and tackle new challenges. Let’s connect and bring your next
          idea to life!
        </motion.p>
      </motion.div>
      <motion.div className="formContainer" variants={sectionItem}>
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
          <button type="submit">
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
          {error && <p className="error_message">Failed to send message.</p>}
          {success && (
            <p className="success_message">Message sent successfully!</p>
          )}
        </motion.form>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 5000,
            style: {
              padding: "20px",
              fontSize: "24px",
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
}
