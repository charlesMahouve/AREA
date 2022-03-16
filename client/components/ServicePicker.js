import { useCtx } from './Context'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from "react-icons/fa";
import Loader from "../components/Loader";

var services_ = {
    none: { name: "none", label: "Pick a service or Subscribe to be able to use them" },
    meteo: { name: "Meteo", label: "Meteo" },
    gmail: { name: "Gmail", label: "Gmail" },
    crypto: { name: "Crypto", label: "Crypto" },
    googleDocs: { name: "Google_Docs", label: "Google_Docs" },
    googleCalendar: { name: "Google_Calendar", label: "Google Calendar" },
    youtube: { name: "Youtube", label: "Youtube" },
}

const variants = {
    open: { height: "auto", transition: { duration: 0.3 } },
    closed: { height: "3.5rem", transition: { duration: 0.4 } },
}

export default function ServicePicker({ setSAction, setList, area }) {
    const { services, user } = useCtx();
    const [isOpen, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(services_.none)
    const [loading, setLoading] = React.useState(false);

    const getList = async (service) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "x-access-token" : user.accessToken},
        };
        fetch(`http://localhost:8080/api/area/events?area=${area}&service=${service.name}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                let newList = []
                for (const x in data[area])
                    newList.push(data[area][x])
                setList(newList)
                setLoading(false)
            });
    }

    const manageSelect = (service) => {
        getList(service)
        setSelected(service);
        setLoading(true)
        setSAction(service);
    }
    React.useEffect(() => {
        if (selected.name != "none")
            getList(selected)
    }, [selected])

    return (
        <motion.div className='h-14 border border-[#c8c8c8] shadow-md rounded-xl overflow-hidden flex flex-col'
            animate={
                isOpen ? "open" : "closed"}
            variants={variants}
            onClick={() => { setOpen(!isOpen) }}>
            <div className='h-14 flex flex-row'>
                {selected.name != "none" ? (
                    <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                        <img src={`/${selected.name}.png`} />
                    </div>
                ) : (
                    <></>
                )}
                <p className='text-xl self-center mx-2'>{selected.label}</p>
                <FaChevronDown size={20} className="text-[#AAAAAA] self-center ml-auto mr-4" />
            </div>
            {services.Google_Calendar.isConnected && (
                <>
                    <div className='h-[1px] w-[60%] bg-[#ededed] self-center' />
                    <div className='h-14 flex flex-row hover:bg-[#eeeeee]'
                        onClick={() => { manageSelect(services_.googleCalendar); }}>
                        <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                            <img src={`/${services_.googleCalendar.name}.png`} />
                        </div>
                        <p className='text-xl self-center mx-2'>{services_.googleCalendar.label}</p>
                    </div>
                </>
            )}
            {services.Gmail.isConnected && (
                <>
                    <div className='h-[1px] w-[60%] bg-[#ededed] self-center' />
                    <div className='h-14 flex flex-row hover:bg-[#eeeeee]'
                        onClick={() => { manageSelect(services_.gmail) }}>
                        <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                            <img src={`/${services_.gmail.name}.png`} />
                        </div>
                        <p className='text-xl self-center mx-2'>{services_.gmail.label}</p>
                    </div>
                </>
            )}
            {services.Meteo.isConnected && (
                <>
                    <div className='h-[1px] w-[60%] bg-[#ededed] self-center' />
                    <div className='h-14 flex flex-row hover:bg-[#eeeeee]'
                        onClick={() => { manageSelect(services_.meteo) }}>
                        <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                            <img src={`/${services_.meteo.name}.png`} />
                        </div>
                        <p className='text-xl self-center mx-2'>{services_.meteo.label}</p>
                    </div>
                </>
            )}
            {services.Crypto.isConnected && (
                <>
                    <div className='h-[1px] w-[60%] bg-[#ededed] self-center' />
                    <div className='h-14 flex flex-row hover:bg-[#eeeeee]'
                        onClick={() => { manageSelect(services_.crypto) }}>
                        <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                            <img src={`/${services_.crypto.name}.png`} />
                        </div>
                        <p className='text-xl self-center mx-2'>{services_.crypto.label}</p>
                    </div>
                </>
            )}
            {services.Google_Docs.isConnected && (
                <>
                    <div className='h-[1px] w-[60%] bg-[#ededed] self-center' />
                    <div className='h-14 flex flex-row hover:bg-[#eeeeee]'
                        onClick={() => { manageSelect(services_.googleDocs) }}>
                        <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                            <img src={`/${services_.googleDocs.name}.png`} />
                        </div>
                        <p className='text-xl self-center mx-2'>{services_.googleDocs.label}</p>
                    </div>
                </>
            )}
            {services.Youtube.isConnected && (
                <>
                    <div className='h-[1px] w-[60%] bg-[#ededed] self-center' />
                    <div className='h-14 flex flex-row hover:bg-[#eeeeee]'
                        onClick={() => { manageSelect(services_.youtube) }}>
                        <div className='w-12 h-12 border border-[#ededed] rounded-xl p-1 m-1'>
                            <img src={`/${services_.youtube.name}.png`} />
                        </div>
                        <p className='text-xl self-center mx-2'>{services_.youtube.label}</p>
                    </div>
                </>
            )}
            {loading && (
                <Loader />
            )}
        </motion.div>
    )
}