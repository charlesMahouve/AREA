import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCtx } from "./Context";
import { useRouter } from 'next/router'
import { RiLinksFill } from "react-icons/ri";
import { IoApps, IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const navBarVariants = {
    open: {
        x: 0,
        transition: {duration: 0.3}
    },
    closed: {
        x: "-100%",
        transition: {duration: 0.3}
    },
  }

export default function NavBar({ children }) {
    const router = useRouter()
    const { isLogged, exportIsLogged} = useCtx();
    const [selected, setSelected] = React.useState(0);
    
    React.useEffect(() => {
        if (!isLogged)
            router.push("/login");
    }, []);

    return (
        <div>
            <AnimatePresence exitBeforeEnter onExitComplete={() => null}>
            <motion.div className={`absolute h-screen w-[18%]  bg-white shadow-xl flex flex-col items-center select-none ${!isLogged ? "left-[-100%]" : "left-0"}`}
             animate={isLogged ? "open" : "closed"}
             variants={navBarVariants}
            >
                <img className="scale-90" src="/arealogo.png" alt="image" />
                <div className="flex flex-col space-y-3 w-full h-full items-center mt-10">
                    <motion.button
                        className={`w-[90%] rounded flex flex-row items-center ${selected == 0 ? ("text-[#F14B1C] bg-[#F4F4F4]") : ("text-[#AAAAAA] bg-white")}`} onClick={() => { setSelected(0); router.push("/home") }}
                        whileTap={{ scale: 0.9 }}>
                        <RiLinksFill size="30" className="mx-3 my-2" />
                        <p className="text-xl mx-8">Areas</p>
                    </motion.button>
                    <motion.button
                        className={`w-[90%] rounded flex flex-row items-center ${selected == 1 ? ("text-[#F14B1C] bg-[#F4F4F4]") : ("text-[#AAAAAA] bg-white")}`} onClick={() => { setSelected(1); router.push("/services") }}
                        whileTap={{ scale: 0.9 }}>
                        <IoApps size="30" className="mx-3 my-2" />
                        <p className="text-xl mx-8">Services</p>
                    </motion.button>
                </div>
                <div className="flex flex-row self-end w-full text-[#F14B1C]">
                    <motion.button
                        className="m-3"
                        onClick={() => { router.push("/settings") }}
                        whileTap={{ scale: 0.8 }}>
                        <IoSettingsSharp size="30" className="" />
                    </motion.button>
                    <motion.button
                        className="m-3 ml-auto"
                        onClick={() => { exportIsLogged(false); router.push("/"); setSelected(0) }}
                        whileTap={{ scale: 0.9 }}>
                        <FiLogOut size="30" className="" />
                    </motion.button>
                </div>
            </motion.div>
            </AnimatePresence>
            {children}
        </div>
    );
}