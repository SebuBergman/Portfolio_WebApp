import { motion } from "framer-motion";

const ToggleButton = () => {
    return (
        <button onClick={() => setOpen((prev) => !prev)}>Button</button>
    )
}

export default ToggleButton