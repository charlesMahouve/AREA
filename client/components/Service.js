import {BsCheckCircleFill} from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion';

export default function Service({name, label, setter, value, url}) {
    return (
        <div className='h-14 border border-[#c8c8c8] rounded-xl my-3 flex flex-row '>
            <div className='w-12 h-12 rounded-xl p-1 m-1'>
                <img src={`${name}.png`} />
            </div>
            <p className='text-xl self-center ml-5'> {label} </p>
            <AnimatePresence exitBeforeEnter onExitComplete={() => null}>
                {value ? (
                    <motion.div className='ml-auto mr-3 flex flex-row'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}>
                        <p className='self-center'> Connected</p>
                        <BsCheckCircleFill size={35} className='text-[#F14B1C] self-center mx-3' />
                    </motion.div>
                ) : (
                    <motion.button className='ml-auto mr-3 rounded-full shadow-md shadow-gray-300 px-5 h-12 flex items-center justify-center'
                        whileHover={{ scale: 0.9 }}
                        exit={{ scale: 0 }}
                        onClick={() => { setter(name, url) }}>
                        <p className=' text-[#F14B1C] font-bold'>
                            Connect
                        </p>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}