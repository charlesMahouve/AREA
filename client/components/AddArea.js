import { useCtx } from '../components/Context'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServicePicker from './ServicePicker';
import EventPicker from './EventPicker';
import { FaCheck } from "react-icons/fa";
import { useRouter } from 'next/router'

const variants = {
    open: { height: "auto", width: "80%", transition: { duration: 0.3 } },
    closed: { height: "3.5rem", width: "80%", transition: { duration: 0.4 } },
}
const spring = {
    type: "spring",
    stiffness: 500,
    damping: 20
};

export default function AddArea({setAdd}) {
    const router = useRouter()

    const { user, isLogged } = useCtx();

    const [selected, setSelected] = React.useState(1);
    const [stepOne, setStepOne] = React.useState(false);
    const [stepTwo, setStepTwo] = React.useState(false);
    const [action, setAction] = React.useState({})
    const [reaction, setReaction] = React.useState({})
    const [Saction, setSAction] = React.useState({})
    const [Sreaction, setSReaction] = React.useState({})
    const [areaDesc, setAreaDesc] = React.useState("")
    const [enableCreation, setEnableCreation] = React.useState(true)

    const [actionList, setActionList] = React.useState([])
    const [reactionList, setReactionList] = React.useState([])

    const manageStepOne = (e) => {
        e.stopPropagation();
        setSelected(2);
        setStepOne(true);
    }

    const manageStepTwo = (e) => {
        e.stopPropagation();
        setSelected(3);
        setStepTwo(true);
    }

    const createArea = () => {
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "x-access-token" : user.accessToken},
                body: JSON.stringify({ isEnabled: enableCreation, action: {service: Saction, event: action, lastRequest: {}}, reaction: {service: Sreaction, event: reaction, lastRequest: {}}, description: areaDesc }),
            };
        fetch('http://localhost:8080/api/area/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setAdd(false)
                } else console.log(data.message);
            }).catch (error => console.log(error))
    }

    return (
        <>
        {isLogged && (
            <>
            <motion.div className='relative h-14 w-[80%] bg-white rounded-t-xl shadow-lg select-none overflow-hidden'
                initial={{ height: "0%" }}
                animate={
                    selected == 1 ? "open" : "closed"}
                exit={{ height: "0%" }}
                variants={variants}
                onClick={() => { setSelected(1) }}
                whileHover={{ scale: 1.005 }}>
                <div className={`bg-gradient-to-r from-[#F14B1C] to-[#D11D20] h-14 w-full flex flex-row `}>
                    <p className='text-white text-2xl self-center mx-2'>Step 1: Select an Action</p>
                    {stepOne && (
                        <FaCheck size={25} className="ml-auto self-center mr-4 text-white" />
                    )}
                </div>
                <div className='w-full flex flex-row'>
                    <div className='w-1/2 mx-[5%] mt-5'>
                        <p className='text-xl mb-5'>
                            Choose Service :
                        </p>
                        <ServicePicker setSAction={setSAction} setList={setActionList} area="Action"/>
                    </div>
                    <div className='bg-[#c8c8c8] h-24 w-[1px] mt-10'></div>
                    <div className='w-1/2 mx-[5%] mt-5'>
                        <p className='text-xl mb-5'>
                            And Event :
                        </p>
                        <EventPicker setAction={setAction} list={actionList}/>
                    </div>
                </div>
                <div className='w-full flex flex-row items-end'>
                    <button className='px-2 py-1 my-4 rounded-full ml-auto mr-4 shadow-xl shadow-gray-400 '
                        onClick={(e) => { manageStepOne(e) }}>
                        <p className='text-[#F14B1C]'>
                            Done !
                        </p>
                    </button>

                </div>
            </motion.div>
            <motion.div className='relative h-14 w-[80%] bg-white  shadow-lg select-none overflow-hidden'
                initial={{ height: "0%" }}
                animate={
                    selected == 2 ? "open" : "closed"}
                exit={{ height: "0%" }}
                variants={variants}
                onClick={() => { setSelected(2) }}
                whileHover={{ scale: 1.005 }}>
                <div className="bg-gradient-to-r from-[#F14B1C] to-[#D11D20] h-14 w-full flex">
                    <p className='text-white text-2xl self-center mx-2'>Step 2: Select a REAction</p>
                    {stepTwo && (
                        <FaCheck size={25} className="ml-auto self-center mr-4 text-white" />
                    )}
                </div>
                <div className='w-full flex flex-row'>
                    <div className='w-1/2 mx-[5%] mt-5'>
                        <p className='text-xl mb-5'>
                            Choose Service :
                        </p>
                        <ServicePicker setSAction={setSReaction} setList={setReactionList} area="Reaction"/>
                    </div>
                    <div className='bg-[#c8c8c8] h-24 w-[1px] mt-10'></div>
                    <div className='w-1/2 mx-[5%] mt-5'>
                        <p className='text-xl mb-5'>
                            And Event :
                        </p>
                        <EventPicker setAction={setReaction} list={reactionList} />
                    </div>
                </div>
                <div className='w-full flex flex-row items-end'>
                    <button className='px-2 py-1 my-4 rounded-full ml-auto mr-4 shadow-xl shadow-gray-400 '
                        onClick={(e) => { manageStepTwo(e) }}>
                        <p className='text-[#F14B1C]'>
                            Done !
                        </p>
                    </button>

                </div>

            </motion.div>
            <motion.div className='relative h-14 w-[80%] bg-white rounded-b-xl shadow-lg select-none overflow-hidden'
                initial={{ height: "0%" }}
                animate={
                    selected == 3 ? "open" : "closed"}
                exit={{ height: "0%" }}
                variants={variants}
                onClick={() => { setSelected(3) }}
                whileHover={{ scale: 1.005 }}>
                <div className="bg-gradient-to-r from-[#F14B1C] to-[#D11D20] h-14 w-full flex">
                    <p className='text-white text-2xl self-center mx-2'>Step 3: Finalize your AREA</p>
                </div>
                <div className='mx-[5%] mt-5'>
                    <p className='text-xl'>
                        Add a short description to your AREA :
                    </p>
                    <input className='h-14 rounded-xl border border-[#c8c8c8] w-full text-xl pl-3 my-5' id="email" type="email" placeholder="Short Description ..." value={areaDesc} onChange={(event) => { setAreaDesc(event.target.value) }} />
                    <div className='flex flex-row mb-3'>
                        <p className='text-md self-center mr-2'>
                            Enable upon creation :
                        </p>
                        <button className={`flex mr-5  ${enableCreation ? 'justify-end' : 'justify-start'} cursor-pointer p-1 bg-white rounded-full h-8 w-16 shadow-xl border border-[#ededed]`} onClick={(e) => { e.stopPropagation(); setEnableCreation(!enableCreation) }}>
                            <motion.div className={`w-6 h-6 ${enableCreation ? "bg-gradient-to-r from-[#F14B1C] to-[#D11D20]" : "bg-[#ededed]"} rounded-full`} layout transition={spring} />
                        </button>
                        <motion.button className='ml-auto self-center h-8 bg-gradient-to-r from-[#F14B1C] to-[#D11D20] shadow-xl rounded-full px-2'
                        whileTap={{scale: 0.5}}
                        onClick={() => {createArea()}}>
                            <p className='text-white text-xl'>
                                Create your AREA !
                            </p>
                        </motion.button>
                    </div>
                </div>

            </motion.div>
            </>
        )}
        </>
    );
}