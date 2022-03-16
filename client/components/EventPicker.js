import { useCtx } from './Context'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from "react-icons/fa";

var events = {
    googleDrive: { name: "Upload file", desc: "Upload a new file to your drive" },
    gmail: { name: "New Mail", desc: "New mail" }
}

const variants = {
    open: { height: "auto", transition: { duration: 0.3 } },
    closed: { height: "3.5rem", transition: { duration: 0.4 } },
}

export default function EventPicker({ setAction, list }) {
    const [isOpen, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState({})


    const manageSelect = (event) => {
        setSelected(event);
        setAction(event);
    }
    React.useEffect(() => {
        setAction(selected)
    });
    return (
        <motion.div className={`h-14 border border-[#c8c8c8] shadow-md rounded-xl overflow-hidden flex flex-col `}
            animate={
                isOpen ? "open" : "closed"}
            variants={variants}
            onClick={() => { setOpen(!isOpen) }}>
            <div className={`h-14 flex flex-row `}>
                <div className='flex flex-col'>
                    <p className='h-7 text-xl mx-2'>{selected.name ? selected.name : " "} </p>
                    <p className='h-7 text-md mx-2 text-[#696969]'>{selected.desc ? selected.desc : " "} </p>
                </div>
                <FaChevronDown size={20} className="text-[#AAAAAA] self-center ml-auto mr-4" />
            </div>
            {list.map(event => {
                return (
                    <div key={event.id}>
                        <div className='h-[1px] w-[60%] bg-[#ededed] self-center' />
                        <div className='h-14 flex flex-col hover:bg-[#eeeeee]'
                            onClick={() => { manageSelect(event) }}>
                            <p  className='text-xl mx-2'>{event.name}</p>
                            <p  className='text-md mx-2 text-[#696969]'>{event.desc}</p>
                        </div>
                    </div>
                )
            })}
        </motion.div>
    )
}