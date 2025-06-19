import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

// Import styles
import "./styles.scss";

// Props interface for variants
interface ContactProps {
  variants: Variants;
}

interface InputState {
  name: string;
  email: string;
  msg: string;
}

export default function Contact({ variants }: ContactProps) {
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
      id="contact"
      className="contact"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      ref={ref}
    >
      <motion.div className="contactContainer" variants={variants}>
        <motion.h1 variants={variants}>Contact</motion.h1>
      </motion.div>
      <motion.div
        className="aboutContainer"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        ref={ref}
      >
        <motion.h2 variants={variants}>
          Let’s Build Something Great Together
        </motion.h2>
        <motion.p variants={variants}>
          Ready to start your project, have a question, or just want to chat
          about your ideas? I’m here to help you turn your vision into a
          powerful web solution.
        </motion.p>
        <motion.p variants={variants}>
          Reach out for a free consultation:
        </motion.p>
        <motion.div className="about_Email" variants={variants}>
          <a href="mailto:sebu.bergman97@gmail.com">sebu.bergman97@gmail.com</a>
        </motion.div>
        <motion.p variants={variants}>
          Or fill out the contact form below and I’ll get back to you as soon as
          possible.
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
