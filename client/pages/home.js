import { useCtx } from '../components/Context'
import React from 'react';
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion';
import { BsPlusLg } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import Area from '../components/Area';
import AddArea from '../components/AddArea';

const animateAdd = {
    open: {
        height: "0%"
    },
    anim: {
        height: "auto",
        transition: {
            duration: 1,
        },
    },
    exit: {
        height: "0%",
        transition: {
            duration: 0.3,
        },
    },
}

export default function Home() {
    const [isAdd, setAdd] = React.useState(false);
    const [areaMap, setAreaMap] = React.useState([])
    const { user, isLogged } = useCtx();
    const router = useRouter()

    React.useEffect(() => {
        if (!isLogged)
          router.push("/login");
      }, [isLogged]);
    
    const getAreas = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "x-access-token" : user.accessToken},
        };
        fetch("http://localhost:8080/api/area/myareas",requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data) {
                setAreaMap(data);
            } else console.log(data.message);
        }).catch (error => console.log(error))
    }
    React.useEffect(() => {
        if (!isAdd && isLogged)
            getAreas()
    }, [isAdd])
    return (
        <>
        {isLogged && (
        <div className="w-screen h-screen bg-[#ededed] pl-[22%] pt-[3%] select-none">
            
            <motion.div className={`h-14 w-14 mb-[3%]`}
                initial={{ scale: 0.5 }}
                animate={{
                    scale: 1,
                    rotate: [-100, 0],
                        transition: { duration: 0.3 }
                    }}
                whileTap={{ scale: 0.75 }}>
                <AnimatePresence
                    exitBeforeEnter={true}
                    onExitComplete={() => null}>
                    {isAdd ? (
                        <motion.button className='h-14 w-full bg-white flex flex-row flex-nowrap text-[#F14B1C] shadow-xl rounded-xl overflow-hidden items-center'
                        initial={{ width: "100%" }}
                        animate={{
                            width: "300%",
                            transition: { duration: 0.3 }
                        }}
                        end={{ width: "100%" }}
                        onClick={() => { setAdd(!isAdd) }}>
                            <FaChevronLeft size="30" className="" />
                            <p className="text-xl flex flex-nowrap break-all max-h-8 overflow-hidden">Back to Areas</p>
                        </motion.button>
                    ) : (
                        <motion.button className='h-14 w-full bg-gradient-to-r from-[#F14B1C] to-[#D11D20] rounded-2xl text-white flex items-center justify-center shadow-xl'
                        
                            onClick={() => { setAdd(!isAdd) }}>
                            <BsPlusLg size="22" className="" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
            <AnimatePresence exitBeforeEnter onExitComplete={() => null}>
                {isAdd ? (
                    <AddArea setAdd={setAdd} />
                    ) : (
                    <div className='flex flex-col space-y-5 flex-1'>
                        {areaMap && areaMap.map((area) => {
                            return <Area key={area.id} Saction={area.action.service.name} Sreaction={area.reaction.service.name} action={area.action.event.name} reaction={area.reaction.event.name} enabled={area.isEnabled} description={area.description} id={area.id}/>
                        })}
                    </div>
                )}
            </AnimatePresence>
        </div>
        )}
        </>
    )
}