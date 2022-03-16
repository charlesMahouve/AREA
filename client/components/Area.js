import { useCtx } from '../components/Context'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight } from "react-icons/fa";

const spring = {
    type: "spring",
    stiffness: 500,
    damping: 20
  };

export default function Area({ action, reaction, Saction, Sreaction, enabled, description, id }) {
    const [isEnabled, setEnabled] = React.useState(enabled);
    const [isOpen, setOpen] = React.useState(false);
    const { user, isLogged } = useCtx();

    const initialRender = React.useRef(true);
    
    function toggleSwitchEnabled(e) {
        setEnabled(!isEnabled)
    }

    const changeEnabled = async() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "x-access-token" : user.accessToken},
        };
        fetch(`http://localhost:8080/api/area/enablearea?areaid=${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
            });
    }
    React.useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
          } else {
            if (isLogged)
                changeEnabled()
          }
    }, [isEnabled]);

    const variants = {
        open: { height: "auto", width: "80%", transition: { duration: 0.3}},
        closed: { height: "3.5rem", width: "80%", transition: { duration: 0.4, delay: 0.075 * id } },
    }
    return (
        <motion.div className='relative h-14 bg-white rounded-xl shadow-lg select-none overflow-hidden'
            initial={{ width: "0%" }}
            animate={
                isOpen ? "open": "closed"}
            exit={{ width: "0%" }}
            variants={variants}
            onClick={() => { setOpen(!isOpen) }}
            whileHover={{scale: 1.005}}>
            <div className='flex flex-row items-center ml-2'>
                <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                    <img src={`/${Saction}.png`}/>
                </div>
                <FaChevronRight size="30" className="text-[#F14B1C]" />
                <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                    <img src={`/${Sreaction}.png`}/>
                </div>
                {description ? (
                    <p className='text-xl ml-5'>{description}</p>
                ) : (
                    <p className='text-xl ml-5'>Custom Short Description</p>
                )}
            </div>
            <div className='w-full flex flex-row items-center justify-center mt-5 mb-8'>
                <div className=" w-[50%] flex flex-col pr-[10%]">
                    <div className="self-end">    
                        <p className=' text-lg'>When this happens:</p>
                        <div className='flex flex-row'>    
                            <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                                <img src={`/${Saction}.png`}/>
                            </div>
                            <p className='  text-lg self-center'>{action}</p>

                        </div>
                    </div>
                </div>
                <div className=' rounded-md border border[#ededed] p-1'>
                    <FaChevronRight size="30" className="text-[#F14B1C]" />
                </div>
                <div className='w-[50%] flex flex-col pl-[10%]'>
                    <div className="">
                        <p className='text-lg'>Then do this:</p>
                        <div className='flex flex-row'>
                            <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                                <img src={`/${Sreaction}.png`}/>
                            </div>
                            <p className=' text-lg self-center'>{reaction}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 right-0 flex flex-row'>
                <p className='mr-3 mt-1'>{isEnabled ? "Enabled" : "Disabled"}</p>
                <button className={`flex mr-5 mb-3  ${isEnabled ? 'justify-end' : 'justify-start'} cursor-pointer p-1 bg-white rounded-full h-8 w-16 shadow-xl border border-[#ededed]`} onClick={(e) => {e.stopPropagation();toggleSwitchEnabled()}}>
                    <motion.div className={`w-6 h-6 ${isEnabled ? "bg-gradient-to-r from-[#F14B1C] to-[#D11D20]" : "bg-[#ededed]"} rounded-full`} layout transition={spring} />
                </button>
            </div>
        </motion.div>
    );
}